
const monthArr = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];
const daysOfWeerArr = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]

function getBayId(id){
    return document.getElementById(id);
}

const date = new Date();
const yearNow = date.getFullYear();
const monthNow = date.getMonth();
const dayNow = date.getDate();

let currYear = date.getFullYear();
let currMonth = date.getMonth();

const allDays = [];

function showCurrentMonth() {
    const calendarCurrent = getBayId("daysCurrent");
    const calendarNext = getBayId("daysNext");
    const idCurrent = "currentMonth";
    const idNext = "nextMonth";
    showMonth(currYear, currMonth, idCurrent, calendarCurrent);
    showMonth(currYear, currMonth + 1, idNext, calendarNext);
}

function showMonth(year, month, id, calendarDraw){
    if(month === 12 && id === "nextMonth"){
        month = 0;
        year += 1;
    }

    getBayId(id).dataset.year = year;
    getBayId(id).dataset.month = month;
    getBayId(id).textContent = `${monthArr[month]}  ${year}`;

    let firstDayOfMonth = new Date(year, month, 0).getDay();
    let lastDayOfMonth = new Date(year, month+1, 0).getDate();
    let lastDayOfPrevMonth = new Date(year, month, 0).getDate();

    for(let i = 1; i <= lastDayOfMonth; i+=1){
        //добавление предыдущих дней месяца
        if(i === 1){
            let prevMonthDays = lastDayOfPrevMonth - firstDayOfMonth + 1;
            // console.log(prevMonthDays)// находящееся в пн
            for (let j = 0; j < firstDayOfMonth; j+=1) {
                let day = document.createElement("div");
                day.classList.add("calendar__day", "calendar__day_passive");
                day.textContent = prevMonthDays;
                calendarDraw.append(day);
                prevMonthDays += 1;
            }
        }
        // основной календарь
        let day = document.createElement("div");
        day.classList.add("calendar__day");
        day.dataset.name = "dayActive";
        day.textContent = i;
        //метка даты
        day.dataset.date = `${year}-${month + 1}-${i}`;
        // метка для дня сегодня
        if(i === dayNow && month === monthNow && year === yearNow){
            day.dataset.day = "dayNow";
        }
        calendarDraw.append(day);
        allDays.push(day);

        //добавление следующих дней месяца
        if(i === lastDayOfMonth){
            let remainDays = new Date(year, month, i).getDay();//день недели последнего дня месяца
            let counter = 1;
            for (remainDays; remainDays < 7; remainDays+=1) {
                let day = document.createElement("div");
                day.classList.add("calendar__day", "calendar__day_passive");
                day.textContent = counter;
                calendarDraw.append(day);
                counter += 1;
            }
        }
    }
}

function createCalendar() {
    getBayId("prev").addEventListener("click", prevMonth);
    getBayId("next").addEventListener("click", nextMonth);

    const currentDaysOfWeek = getBayId("daysOfWeek-current");
    const nextDaysOfWeek = getBayId("daysOfWeek-next");
    daysOfWeerArr.forEach(item => {
        drawDaysOfWeek(item, currentDaysOfWeek);
        drawDaysOfWeek(item, nextDaysOfWeek);
    })
    showCurrentMonth();
}
createCalendar()

function drawDaysOfWeek(item, element){
    let day = document.createElement("div");
    day.classList.add("calendar__day");
    day.textContent = item.toLowerCase();
    element.append(day);
}

function prevMonth() {
    allDays.splice(0)
    if(currMonth === 0){
        currMonth = 11;
        currYear -= 1;
    } else {
        currMonth -= 1;
    }
    clearBlock();
    showCurrentMonth();
}
function nextMonth() {
    allDays.splice(0)
    if(currMonth === 11){
        currMonth = 0;
        currYear += 1;
    } else {
        currMonth += 1;
    }
    clearBlock();
    showCurrentMonth();
}

function clearBlock(){
    getBayId('daysCurrent').innerHTML = "";
    getBayId('daysNext').innerHTML = "";
}

const dayBoxs = document.querySelectorAll(".daysBox__item");
let counter = 0;
let closeCalendarBtn = getBayId("descriptionBtn");

const clickedDays = [];
let betweenDays = [];

// первый клик
let selectDateFrom = null;
// второй клик
let selectDateTo = null;

dayBoxs.forEach(item => {
    item.addEventListener("click", (evt)=>{
        if(evt.target !== evt.currentTarget && evt.target.tagName === "DIV" && evt.target.dataset.name === "dayActive"){
            if(counter > 1){
                counter = 0;
                clickedDays.forEach(selectDay => { selectDay.classList.remove("calendar__day_currentDay") })
                betweenDays.forEach(selectDay => { selectDay.classList.remove("calendar__day_between")})
                clickedDays.splice(0);
                betweenDays = [];
            }

            /* получает i при клике и проверяет i второго клика*/
            let firstClick = allDays.indexOf(clickedDays[0])
            if(clickedDays.length && allDays.indexOf(evt.target) < firstClick){ return }

            clickedDays.push(evt.target);
            // console.log(clickedDays)

            let descriptionTitle = getBayId("descriptionTitle");
            if(counter === 0){ // первый клик
                closeCalendarBtn.textContent = "В одну сторону";
                // warning
                selectDateFrom = evt.target.dataset.date;

                if(!checkDate(selectDateFrom)) {
                    clickedDays.splice(0);
                    return;
                }
                // warning end

                evt.target.classList.add("calendar__day_currentDay");
                descriptionTitle.textContent = "Выберите дату обратно";

                outData(counter)

            } else if (counter === 1){ // второй клик
                closeCalendarBtn.textContent = "Подтвердить";
                let first = allDays.indexOf(clickedDays[0]);
                let last = allDays.indexOf(clickedDays[1]);
                betweenDays = allDays.slice(first+1, last);

                betweenDays.forEach(item => {
                    item.classList.add("calendar__day_between");
                })

                selectDateTo = evt.target.dataset.date;

                evt.target.classList.add("calendar__day_currentDay");
                descriptionTitle.textContent = "Выберите дату туда";

                outData(counter)
            }
            counter++;
        }
    })
})

function checkDate(selectDateFrom) {
    const dateTimestamp = new Date(selectDateFrom).getTime();
    const dateNow = new Date().getTime();

    return dateNow < dateTimestamp;
}

function outData(counter){
    const outDateLabelFrom = document.querySelector(".airTickets-calendarBox__dateFrom-label")
    const outDateLabelTo = document.querySelector(".airTickets-calendarBox__dateTo-label")
    const outDateFrom = document.querySelector(".airTickets-calendarBox__dateFrom-out");
    const outDateTo = document.querySelector(".airTickets-calendarBox__dateTo-out");

    if(counter === 0){
        const selectDateFromArr = selectDateFrom.split("-");
        let selectYearFrom = selectDateFromArr[0];
        let selectMontFrom = selectDateFromArr[1];
        let selectDayFrom = selectDateFromArr[2];
        outDateFrom.textContent = `${selectDayFrom}, ${selectMontFrom}, ${selectYearFrom}`;
        outDateTo.textContent = "";
        outDateLabelFrom.classList.add("airTickets-calendarBox__dateFrom-label_active");
    } else if (counter === 1){
        const selectDateToArr = selectDateTo.split("-")
        let selectYearTo = selectDateToArr[0];
        let selectMontTo = selectDateToArr[1];
        let selectDayTo = selectDateToArr[2];
        outDateTo.textContent = `${selectDayTo}, ${+selectMontTo}, ${selectYearTo}`;
        outDateLabelTo.classList.add("airTickets-calendarBox__dateTo-label_active");
    }
}


let showCalendar = true;
const calendarBody = document.querySelector(".airTickets-calendarBox__body")
document.querySelector(".airTickets-calendarBox__header").addEventListener("click", () => {
    if(showCalendar){
        calendarBody.style.height = calendarBody.scrollHeight + "px";
    } else {
        calendarBody.style.height = "";
    }
    showCalendar = !showCalendar;
})
getBayId("descriptionBtn").addEventListener("click", () => {
    calendarBody.style.height = "";
    showCalendar = true;
})