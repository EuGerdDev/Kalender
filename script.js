let day = 1;
let week = 1;
let month = 1;
let year = 2026;
let months = [
    {name: "Januar", nickname: "Jan", days: 31},
    {name: "Februar", nickname: "Feb", days: 28},
    {name: "März", nickname: "Mär", days: 31},
    {name: "April", nickname: "Apr", days: 30},
    {name: "Mai", nickname: "Mai", days: 31},
    {name: "Juni", nickname: "Jun", days: 30},
    {name: "Juli", nickname: "Jul", days: 31},
    {name: "August", nickname: "Aug", days: 31},
    {name: "September", nickname: "Sep", days: 30},
    {name: "Oktober", nickname: "Okt", days: 31},
    {name: "November", nickname: "Nov", days: 30},
    {name: "Dezember", nickname: "Dez", days: 31},
]
let weekdays = [
    {name: "Montag", nickname: "Mo"},
    {name: "Diensttag", nickname: "Di"},
    {name: "Mittwoch", nickname: "Mi"},
    {name: "Donnerstag", nickname: "Do"},
    {name: "Freitag", nickname: "Fr"},
    {name: "Samstag", nickname: "Sa"},
    {name: "Sonntag", nickname: "So"}
]
let seasons = [
    {name: "Frühling", date: {day: 20, month: 3}},
    {name: "Sommer", date: {day: 20, month: 6}},
    {name: "Herbst", date: {day: 22, month: 9}},
    {name: "Winter", date: {day: 21, month: 12}},
]
let days = [
    {
        name: "Montag",
        date: {day: 1, month: 1, year: 2026},
        birthdays: [{people: "Eugen", active: false}],
        tasks: [{name: "Aufräumen", from: {hour: 15, min: 30}, to: {hour: 16, min: 0}}],
        appointments: [{name: "Schule", from: {hour: 15, min: 30}, to: {hour: 16, min: 0}}],
        activities: [{name: "Zocken", from: {hour: 15, min: 30}, to: {hour: 16, min: 0}}],
    }
]
let calendar = {
    years: [
        
    ]
}
function generateYears() {
    for (let index = 0; index < 10; index++) {
        calendar.years.push(
            {
                name: year + index,
                months: []
            }
    )
    }
    generateMonths();
}
function generateMonths() {
    for (let index = 0; index < calendar.years.length; index++) {
        for (let ii = 0; ii < 12; ii++) {
             calendar.years[index].months.push(
            {
                name: month + index,
                index: ii,
                days: []
            }
        )   
        }
        
    }
    generateDays();
}
function generateDays() {
    for (let index = 0; index < calendar.years.length; index++) {
        for (let ii = 0; ii < calendar.years[index].months.length; ii++) {
            for (let iii = 0; iii < months[calendar.years[index].months[ii].index].days; iii++) {
                calendar.years[index].months[ii].days.push(
            {
                name: month + index
            }
        )
            }
        
    }
    }
}
generateYears();
