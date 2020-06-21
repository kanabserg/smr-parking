// type: 1 - нельзя парковаться по нечетным, 2 - нельзя парковаться по четным
let singArray = [
    {
        type: 1, isSingle: false, desc: 'Парный, нельзя парковаться по нечетным',
        isAvailable: (now) => (now.date() % 2 === 0 && now.hour() < 21) || (now.date() % 2 !== 0 && moment().add(1, 'day').date() % 2 === 0 && now.hour() >= 19),
        calculateAvailableTime: (now) => {
            var futureMoment = (now.date() % 2 === 0 ? moment() : moment().add(1, 'day')).set({ 'hour': 21, 'minute': 0 });
            return timeDiff(futureMoment, now);
        }
    },
    {
        type: 2, isSingle: false, desc: 'Парный, нельзя парковаться по четным',
        isAvailable: (now) => (now.date() % 2 === 0 && now.hour() >= 19) || (now.date() % 2 !== 0 && now.hour() < 21),
        calculateAvailableTime: (now) => {
            var futureMoment = (now.date() % 2 !== 0 ? moment() : moment().add(1, 'day')).set({ 'hour': 21, 'minute': 0 });
            return timeDiff(futureMoment, now);
        }
    },
    {
        type: 1, isSingle: true, desc: 'Одинарный, нельзя парковаться по нечетным',
        isAvailable: (now) => now.date() % 2 === 0,
        calculateAvailableTime: (now) => timeDiff(moment().add(1, 'day').set({ 'hour': 0, 'minute': 0 }), now)
    },
    {
        type: 2, isSingle: true, desc: 'Одинарный, нельзя парковаться по четным',
        isAvailable: (now) => now.date() % 2 !== 0,
        calculateAvailableTime: (now) => timeDiff(moment().add(1, 'day').set({ 'hour': 0, 'minute': 0 }), now)
    }
];

$(document).ready(function () {
    setTimeout(() => { displaySigns(); setInterval(displaySigns, 60000) }, (60 - moment().seconds()) * 1000);
    displaySigns();
});

window.addEventListener('load', function () {
    (async () => {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('./service-worker.js')
            } catch (e) {
                console.log('Service worker registration failed.');
            }
        }
    })();
});

function displaySigns() {
    let now = moment();
    $('#nav-bar').text(now.format('hh:mm:ss dddd, Do MMMM YYYY'));
    $('#sign-info tr').remove();
    singArray
        .filter(sign => sign.isAvailable(now))
        .forEach(sign =>
            $('#sign-info').append('<tr><td><img src=img/' + sign.type + '.png></td><td class="quant">' + (sign.isSingle ? "Одинарный" : "Парный") + '</td><td class="time">' + sign.calculateAvailableTime(now) + '</td></tr>')
        );
}

function timeDiff(futureMoment, now) {
    return moment.duration(futureMoment.diff(now)).format(function () { return this.duration.asSeconds() >= 3600 ? "h:mm" : "m _" }, { trim: false });
}
