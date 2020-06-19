$(document).ready(function () {
    var now = moment();
    $("#current-date").text(now.format("dddd, Do MMMM YYYY"));
    // type: 1 - нельзя парковаться по нечетным, 2 - нельзя парковаться по четным
    let singArray = [
        {
            type: 1, isSingle: false, desc: "Парный, нельзя парковаться по нечетным", isAvailable: function (now) {
                return (now.day() % 2 === 0 && now.hour() < 21) || (now.day() % 2 !== 0 && moment().add(1, 'day').day() % 2 === 0 && now.hour() >= 19);
            },
            calculateAvailableTime: function (now) {
                var futureMoment = now.day() % 2 === 0 ? moment().hour(21).minute(0) : moment().add(1, 'day').hour(21).minute(0);
                var duration = moment.duration(futureMoment.diff(now));
                return moment().hours(duration.hours()).minutes(duration.minutes()).format('HH:mm');
            }
        },
        {
            type: 2, isSingle: false, desc: "Парный, нельзя парковаться по четным", isAvailable: function (now) {
                return (now.day() % 2 === 0 && now.hour() >= 19) || (now.day() % 2 !== 0 && now.hour() <= 21);
            }, calculateAvailableTime: function (now) {
                var futureMoment = moment().hour(21).minute(0);
                var duration = moment.duration(futureMoment.diff(now));
                return moment().hours(duration.hours()).minutes(duration.minutes()).format('HH:mm');
            }
        },
        {
            type: 1, isSingle: true, desc: "Одинарный, нельзя парковаться по нечетным", isAvailable: function (now) {
                return now.day() % 2 === 0;
            }, calculateAvailableTime: function (now) {
                var futureMoment = moment().add(1, 'day').hour(0).minute(0);
                var duration = moment.duration(futureMoment.diff(now));
                return moment().hours(duration.hours()).minutes(duration.minutes()).format('HH:mm');
            }
        },
        {
            type: 2, isSingle: true, desc: "Одинарный, нельзя парковаться по четным", isAvailable: function (now) {
                return now.day() % 2 !== 0;
            }, calculateAvailableTime: function (now) {
                var futureMoment = moment().add(1, 'day').hour(0).minute(0);
                var duration = moment.duration(futureMoment.diff(now));
                return moment().hours(duration.hours()).minutes(duration.minutes()).format('HH:mm');
            }
        }
    ];

    singArray.forEach(sign => {
        if (sign.isAvailable(now)) {
            $("#sign-info").append("<tr><td><img src=img/" + sign.type + ".png></td><td>" + sign.desc + "</td><td>" + sign.calculateAvailableTime(now) + "</td></tr>");
        }
    });
});