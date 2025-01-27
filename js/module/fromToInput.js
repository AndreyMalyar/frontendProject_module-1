/* не понимаю как сделать ???????? */

const ticketFrom = document.getElementById('ticketFrom');
const ticketTo = document.getElementById('ticketTo');
const menuForm = document.getElementById('menuFrom');

ticketFrom.addEventListener('focus', (e) => {
    drawTicketFrom();
    menuForm.style.height = menuForm.scrollHeight + "px"
})

ticketTo.addEventListener("focus", () => {
    drawTicketTu();
    menuForm.style.height = menuForm.scrollHeight + "px"
})

ticketFrom.addEventListener("focusout", () => {
    menuForm.innerHTML = "";
    menuForm.style.height = ""

})
ticketTo.addEventListener("focusout", () => {
    menuForm.innerHTML = "";
    menuForm.style.height = ""

})

function drawTicketFrom(){

    const cityLabel = document.createElement('h6');
    cityLabel.classList.add('airTickets-inputOut__label');
    const airLabel = document.createElement('h6');
    airLabel.classList.add('airTickets-inputOut__label');
    const divEl = document.createElement('div');
    divEl.classList.add('airTickets-inputOut__inner');
    const cityEl = document.createElement('p');
    cityEl.classList.add('airTickets-inputOut__city');
    const locationIcon = document.createElement('img');
    locationIcon.classList.add('airTickets-inputOut__icon');
    locationIcon.src = "img/svg/locationDot.svg";
    const spanEl = document.createElement('span');
    const ulEl = document.createElement('ul');
    ulEl.classList.add('airTickets-inputOut__list');
    const liEl = document.createElement('li');
    liEl.classList.add('airTickets-inputOut__item');

    cityLabel.textContent = "Выбранный город";
    cityEl.innerHTML = `Варшава`;
    cityEl.prepend(locationIcon);
    spanEl.textContent = "X";
    divEl.append(cityEl, spanEl);
    airLabel.textContent = "Ближайший аэропорт";
    liEl.textContent = "Кишинев"
    liEl.prepend(locationIcon);
    ulEl.append(liEl);

    menuForm.append(cityLabel, divEl, airLabel, ulEl)
}

function drawTicketTu(){
    const airLabel = document.createElement('h6');
    airLabel.classList.add('airTickets-inputOut__label');
    const ulEl = document.createElement('ul');
    ulEl.classList.add('airTickets-inputOut__list');
    const locationIcon = document.createElement('img');
    locationIcon.classList.add('airTickets-inputOut__icon');
    locationIcon.src = "img/svg/locationDot.svg";
    const liEl = document.createElement('li');
    liEl.classList.add('airTickets-inputOut__item');

    airLabel.textContent = "Ближайшие аэропорты";
    liEl.textContent = "Париж";
    liEl.prepend(locationIcon);
    ulEl.append(liEl);

    menuForm.append(airLabel, ulEl)
}