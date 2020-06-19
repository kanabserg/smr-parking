$(document).ready(function () {
    var now = moment();
    $('#nav-bar').text(now.format('dddd, Do MMMM YYYY'));
    // type: 1 - нельзя парковаться по нечетным, 2 - нельзя парковаться по четным
    let singArray = [
        {
            type: 1, isSingle: false, desc: 'Парный, нельзя парковаться по нечетным', isAvailable: function (now) {
                return (now.day() % 2 === 0 && now.hour() < 21) || (now.day() % 2 !== 0 && moment().add(1, 'day').day() % 2 === 0 && now.hour() >= 19);
            },
            calculateAvailableTime: function (now) {
                var futureMoment = now.day() % 2 === 0 ? moment().hour(21).minute(0).seconds(0) : moment().add(1, 'day').hour(21).minute(0).seconds(0);
                return moment.duration(futureMoment.diff(now)).format("h:mm");
            }
        },
        {
            type: 2, isSingle: false, desc: 'Парный, нельзя парковаться по четным', isAvailable: function (now) {
                return (now.day() % 2 === 0 && now.hour() >= 19) || (now.day() % 2 !== 0 && now.hour() <= 21);
            }, calculateAvailableTime: function (now) {
                var futureMoment = moment().hour(21).minute(0).seconds(0);
                return moment.duration(futureMoment.diff(now)).format("h:mm");
            }
        },
        {
            type: 1, isSingle: true, desc: 'Одинарный, нельзя парковаться по нечетным', isAvailable: function (now) {
                return now.day() % 2 === 0;
            }, calculateAvailableTime: function (now) {
                var futureMoment = moment().add(1, 'day').hour(0).minute(0).seconds(0);
                return moment.duration(futureMoment.diff(now)).format("h:mm");
            }
        },
        {
            type: 2, isSingle: true, desc: 'Одинарный, нельзя парковаться по четным', isAvailable: function (now) {
                return now.day() % 2 !== 0;
            }, calculateAvailableTime: function (now) {
                var futureMoment = moment().add(1, 'day').hour(0).minute(0).seconds(0);
                return moment.duration(futureMoment.diff(now)).format("h:mm");
            }
        }
    ];

    singArray.forEach(sign => {
        if (sign.isAvailable(now)) {
            $('#sign-info').append('<tr><td><img src=img/' + sign.type + '.png></td><td class="quant">' + (sign.isSingle ? "Одинарный" : "Парный") + '</td><td class="time">' + sign.calculateAvailableTime(now) + '</td></tr>');
        }
    });
});
    
window.addEventListener('load', function() {
    registerSW();
});

async function registerSW(){
    if ('serviceWorker' in navigator){
        try{
            await navigator.serviceWorker.register('./service-worker.js')
        } catch (e){
            console.log('Service worker registration failed.');
        }
    }
}