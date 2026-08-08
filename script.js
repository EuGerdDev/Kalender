let day = 0;
let week = 0;
let month = 1;
let year = 2026;
let years = 10;
let generatedWeekday = 3;
let selectedYear = 0;
let addType = "Aufgabe";
let today = new Date();
let todayDay = today.getDate();
let todayMonth = today.getMonth() + 1;
let todayYear = today.getFullYear();
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
    {name: "Dienstag", nickname: "Di"},
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
    renderYearOptions();
}
function generateMonths() {
    for (let index = 0; index < calendar.years.length; index++) {
        for (let ii = 0; ii < 12; ii++) {
            let generateMonthName = month + ii;
            calendar.years[index].months.push(
                {
                    name: generateMonthName,
                    index: ii,
                    days: []
                }
            )   
        }
    }
    generateDays();
    renderMonthOptions();
    updateValues();
}
function generateDays() {
    for (let index = 0; index < calendar.years.length; index++) {
        for (let ii = 0; ii < calendar.years[index].months.length; ii++) {
            for (let iii = 0; iii < months[calendar.years[index].months[ii].index].days; iii++) {
                generatedWeekday += 1;
                if(generatedWeekday > weekdays.length){
                    generatedWeekday = 1;
                }
                calendar.years[index].months[ii].days.push(
                    {
                        name: month + iii,
                        weekday: {
                            name: weekdays[generatedWeekday - 1].name, 
                            index: generatedWeekday - 1
                        },
                        birthdays: [],
                        tasks: [], 
                        appointments: [],
                        activities: [],
                    }
                )
            }
        }
    }
    console.log(calendar.years)
    goToToday();
    renderDays();
}
function renderDays() {
    let selectedMonthDaysContainer = document.getElementById("selectedMonthDaysContainer");
    selectedMonthDaysContainer.innerHTML = ``;
    for (let index = 0; index < weekdays.length; index++) {
        let marginLeft = index * 92;
        selectedMonthDaysContainer.innerHTML += `<div style="left: ${marginLeft}px" class="weekdayname">${weekdays[index].name}</div>`;
    }
    
    
    

    for (let index = 0; index < calendar.years[selectedYear].months[month - 1].days.length; index++) {
        let entries = "";
        for (let ii = 0; ii < calendar.years[selectedYear].months[month - 1].days[index].birthdays.length; ii++) {
            if (calendar.years[selectedYear].months[month - 1].days[index].birthdays[ii].active == true) {
                entries += `<span class="calendar-entry birthday">${calendar.years[selectedYear].months[month - 1].days[index].birthdays[ii].name}</span> `; 
            }
        }
        for (let ii = 0; ii < calendar.years[selectedYear].months[month - 1].days[index].tasks.length; ii++) {
            if (calendar.years[selectedYear].months[month - 1].days[index].tasks[ii].active == true) {
                entries += `<span class="calendar-entry task">${calendar.years[selectedYear].months[month - 1].days[index].tasks[ii].name}</span> `; 
            }
        }
        for (let ii = 0; ii < calendar.years[selectedYear].months[month - 1].days[index].appointments.length; ii++) {
            if (calendar.years[selectedYear].months[month - 1].days[index].appointments[ii].active == true) {
                entries += `<span class="calendar-entry appointment">${calendar.years[selectedYear].months[month - 1].days[index].appointments[ii].name}</span> `; 
            }
        }
        for (let ii = 0; ii < calendar.years[selectedYear].months[month - 1].days[index].activities.length; ii++) {
            if (calendar.years[selectedYear].months[month - 1].days[index].activities[ii].active == true) {
                entries += `<span class="calendar-entry activity">${calendar.years[selectedYear].months[month - 1].days[index].activities[ii].name}</span> `; 
            } 
        }
        let firstWeekday = calendar.years[selectedYear].months[month - 1].days[0].weekday.index;
        let generateDay = calendar.years[selectedYear].months[month - 1].days[index];
        let week = Math.floor((index + firstWeekday) / 7);
        let weekday = generateDay.weekday.index;
        let marginLeft = weekday * 92;
        let marginTop = week * 92 + 40;
        let dayClass = "day";

        if (generateDay.name == todayDay && month == todayMonth && calendar.years[selectedYear].name == todayYear) {
            dayClass = "day today";
        }
        selectedMonthDaysContainer.innerHTML += `
    <div
        onclick="selectDay(${index})"
        style="left: ${marginLeft}px; top: ${marginTop}px"
        class="${dayClass}"
    >
        <div class="day-number">${generateDay.name}</div>

        <div class="calendar-entries">
            ${entries}
        </div>
    </div>
`;
    }
} 
function selectDay(selDay) {
    day = selDay;
    updateValues();
}
function selectMonth(selMon) {
    month = selMon + 1;
    renderDays();
    updateValues();
}
function selectYear(selYear) {
    selectedYear = selYear;
    renderDays();
    updateValues();
}
function renderMonthOptions(){
    let monthselection = document.getElementById("monthselection");
    monthselection.innerHTML = ``;
    for (let index = 0; index < calendar.years[selectedYear].months.length; index++) {
        monthselection.innerHTML += `<option onclick="selectMonth(${index})" value="">${months[calendar.years[selectedYear].months[index].index].name}</option>`;
    }
}
function renderYearOptions(){
    let yearselection = document.getElementById("yearselection");
    yearselection.innerHTML = ``;
    for (let index = 0; index < calendar.years.length; index++) {
        yearselection.innerHTML += `<option onclick="selectYear(${index})" value="">${calendar.years[index].name}</option>`;
    }
}
function updateValues() {
    let birthdayCount = 0;
    let taskCount = 0;
    let appointmentCount = 0;
    let activityCount = 0;
    document.getElementById("month-year").textContent = months[calendar.years[selectedYear].months[month - 1].index].name + " " + calendar.years[selectedYear].name; 
    document.getElementById("day").textContent = 
    weekdays[calendar.years[selectedYear].months[month - 1].days[day].weekday.index].name + " "
    + calendar.years[selectedYear].months[month - 1].days[day].name + ". "
    + months[calendar.years[selectedYear].months[month - 1].index].name  + " "
    + calendar.years[selectedYear].name; 
    document.getElementById("selectedDayBirthdays").innerHTML = ``;
    document.getElementById("selectedDayTasks").innerHTML = ``;
    document.getElementById("selectedDayAppointments").innerHTML = ``;
    document.getElementById("selectedDayActivities").innerHTML = ``;
    for (let index = 0; index < calendar.years[selectedYear].months[month - 1].days[day].birthdays.length; index++) {
    if (calendar.years[selectedYear].months[month - 1].days[day].birthdays[index].active == true) {
        document.getElementById("selectedDayBirthdays").innerHTML += `
            <div>
                ${calendar.years[selectedYear].months[month - 1].days[day].birthdays[index].name}
                <button class="calendar-delete" onclick="deleteBirthday(${index})">×</button>
            </div>
        `;
        birthdayCount += 1;
    }
}
    for (let index = 0; index < calendar.years[selectedYear].months[month - 1].days[day].tasks.length; index++) {
    if (calendar.years[selectedYear].months[month - 1].days[day].tasks[index].active == true) {
        document.getElementById("selectedDayTasks").innerHTML += `
            <div>
                ${calendar.years[selectedYear].months[month - 1].days[day].tasks[index].name}
                <button class="calendar-delete" onclick="deleteTask(${index})">×</button>
            </div>
        `;
        taskCount += 1;
    }
}
    for (let index = 0; index < calendar.years[selectedYear].months[month - 1].days[day].appointments.length; index++) {
    if (calendar.years[selectedYear].months[month - 1].days[day].appointments[index].active == true) {
        document.getElementById("selectedDayAppointments").innerHTML += `
            <div>
                ${calendar.years[selectedYear].months[month - 1].days[day].appointments[index].name}
                <button class="calendar-delete" onclick="deleteAppointment(${index})">×</button>
            </div>
        `;
        appointmentCount += 1;

    }
}
    for (let index = 0; index < calendar.years[selectedYear].months[month - 1].days[day].activities.length; index++) {
    if (calendar.years[selectedYear].months[month - 1].days[day].activities[index].active == true) {
        document.getElementById("selectedDayActivities").innerHTML += `
            <div>
                ${calendar.years[selectedYear].months[month - 1].days[day].activities[index].name}
                <button class="calendar-delete" onclick="deleteActivity(${index})">×</button>
            </div>
        `;
        activityCount += 1;
    }
}
document.getElementById("birthdayCount").textContent = birthdayCount;
document.getElementById("taskCount").textContent = taskCount;
document.getElementById("appointmentCount").textContent = appointmentCount;
document.getElementById("activityCount").textContent = activityCount;
    renderDays();
}
function selectAddType(type) {
    addType = type;
}
function add(type) {
    console.log("addType:", addType);
    if(addType == "Geburtstag"){
        addBirthday()
    }
    if(addType == "Aufgabe"){
        addTask()
    }
    if(addType == "Termin"){
        addAppointment()
    }
    if(addType == "Aktivität"){
        addActivity()
    }
    localStorage.setItem("calendar", JSON.stringify(calendar));
    updateValues();
}
function addBirthday() {
    let name = document.getElementById("name").value;
    for (let index = 0; index < calendar.years.length; index++) {
        let yearbirth = calendar.years[index];
        let monthbirth = yearbirth.months[month - 1];
        let daybirth = monthbirth.days[day];
        daybirth.birthdays.push(
            {name: name, active: true}
        )
        
    }
    
    document.getElementById("name").value = "";
}
function addTask() {
    let name = document.getElementById("name").value;
    let yearbirth = calendar.years[selectedYear];
    let monthbirth = yearbirth.months[month - 1];
    let daybirth = monthbirth.days[day];
    daybirth.tasks.push(
        {name: name, active: true}
    )
    document.getElementById("name").value = "";
}
function addAppointment() {
    let name = document.getElementById("name").value;
    let yearbirth = calendar.years[selectedYear];
    let monthbirth = yearbirth.months[month - 1];
    let daybirth = monthbirth.days[day];
    daybirth.appointments.push(
        {name: name, active: true}
    )
    document.getElementById("name").value = "";
}
function addActivity() {
    let name = document.getElementById("name").value;
    let yearbirth = calendar.years[selectedYear];
    let monthbirth = yearbirth.months[month - 1];
    let daybirth = monthbirth.days[day];
    daybirth.activities.push(
        {name: name, active: true}
    )
    document.getElementById("name").value = "";
}
function deleteBirthday(index) {
    calendar.years[selectedYear].months[month - 1].days[day].birthdays[index].active = false;

    localStorage.setItem("calendar", JSON.stringify(calendar));

    updateValues();
    renderDays();
}

function deleteTask(index) {
    calendar.years[selectedYear].months[month - 1].days[day].tasks[index].active = false;

    localStorage.setItem("calendar", JSON.stringify(calendar));

    updateValues();
    renderDays();
}

function deleteAppointment(index) {
    calendar.years[selectedYear].months[month - 1].days[day].appointments[index].active = false;

    localStorage.setItem("calendar", JSON.stringify(calendar));

    updateValues();
    renderDays();
}

function deleteActivity(index) {
    calendar.years[selectedYear].months[month - 1].days[day].activities[index].active = false;

    localStorage.setItem("calendar", JSON.stringify(calendar));

    updateValues();
    renderDays();
}
function goToToday() {
    month = todayMonth;

    selectedYear = calendar.years.findIndex(function(calendarYear) {
        return calendarYear.name == todayYear;
    });

    day = todayDay - 1;

    renderMonthOptions();
    renderDays();
    updateValues();
}
let savedCalendar = localStorage.getItem("calendar");

if (savedCalendar) {
    calendar = JSON.parse(savedCalendar);
    renderYearOptions();
    renderMonthOptions();
    renderDays();
    updateValues();
    goToToday();
} else {
    generateYears();
    goToToday();
}
