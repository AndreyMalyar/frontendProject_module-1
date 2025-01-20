
const menuTicketBody = document.querySelector("#menuSelectTickets_body");
const menuTicketTitle = document.querySelector("#menuSelectTickets_title");
const headerTitle = document.querySelector(".header__title");
const headerButtons = document.querySelectorAll(".header__button-item");
const headerButtonsParent = document.querySelector(".header__button-list");


menuTicketBody.addEventListener("mouseover", function(evt){
    const menuTicketHeader = menuTicketTitle.closest(".nav-menu__select-header-current");
    menuTicketHeader.style.color = "#fff";
    menuTicketBody.addEventListener("mouseout", mouseOut)
    function mouseOut() {
        menuTicketHeader.removeAttribute("style");
        menuTicketBody.removeEventListener("mouseout", mouseOut);
    }
    evt.stopPropagation();
})


menuTicketBody.addEventListener("click", function (evt){
    if(evt.target.tagName === "LI" && evt.target !== evt.currentTarget){
        let clickItemName = evt.target.dataset.name;
        let clickItemLabel = evt.target.dataset.label;
        menuTicketTitle.textContent = evt.target.innerText;
        menuTicketTitle.dataset.name = clickItemName;

        //header title content replace
        removeHeaderTitle({name: clickItemName, label: clickItemLabel} );

        //header buttons replace & add active
        removeActive(headerButtons);
        headerButtons.forEach(btn => {
            if(btn.dataset.name === clickItemName){ btn.classList.add("header__button-item_active") }
        })

    }

    evt.stopPropagation();
})

headerButtonsParent.addEventListener("click", function (evt){
    if(evt.target.tagName === "BUTTON" && evt.target !== evt.currentTarget){
        let clickItemName = evt.target.dataset.name;
        let clickItemLabel = evt.target.dataset.label;
        removeActive(headerButtons);
        removeHeaderTitle({name: clickItemName, label: clickItemLabel} );
        evt.target.classList.add('header__button-item_active');
        menuTicketTitle.textContent = evt.target.innerText;
        menuTicketTitle.dataset.name = clickItemName;
    }
    evt.stopPropagation();
})

function removeHeaderTitle( {label, name} ){
    headerTitle.innerText =
        ( name !== "insurance" ) ?
            `Лучшие ${label.toLowerCase()} по самым низким ценам`:
            `Лучшее ${label.toLowerCase()} по самым низким ценам`;
}

function removeActive(elementsArray){
    elementsArray.forEach(item => {
        item.classList.remove("header__button-item_active");
    })
}

const openMobileMenu = document.getElementById("openMobileMenu");
openMobileMenu.addEventListener("click", () => {
    const mobileMenuBody = document.querySelector(".nav-menuMobile__body");
    const closeMobileMenu = mobileMenuBody.querySelector(".nav-menuMobile__body-close")
    mobileMenuBody.style.top = '0';
    closeMobileMenu.addEventListener("click", closeMenu)

    function closeMenu(){
        mobileMenuBody.removeAttribute("style");
        closeMobileMenu.removeEventListener("click", closeMenu);
    }
})

const popularDistanceArr = [
    { id: 1, from: "варшава", to: "милан", "price": 771, },
    { id: 2, from: "варшава", to: "лондон", "price": 1001, },
    { id: 3, from: "варшава", to: "мадрид", "price": 1646, },
    { id: 4, from: "варшава", to: "барселона", "price": 1663, },
    { id: 5, from: "варшава", to: "аликанте", "price": 1424, },
    { id: 6, from: "варшава", to: "лиссабон", "price": 3364, },
    { id: 7, from: "варшава", to: "Париж", "price": 4077, },
    { id: 8, from: "варшава", to: "Нью-Йорк", "price": 21277, },
    { id: 9, from: "варшава", to: "денпасар-Бали", "price": 25573, },
    { id: 10, from: "варшава", to: "Амстердам", "price": 3256, },
]
popularDistanceArr.sort((a, b) => a.price - b.price)


let sub = popularDistanceArr.slice( 0, popularDistanceArr.length / 2 );
let sub2 = popularDistanceArr.slice( popularDistanceArr.length / 2 );

const newArr = [...sub, ...sub2];

console.log(newArr);

/* --------- accordion footer --------- */
const panelBtn = document.querySelectorAll(".accordion__item-btn");

panelBtn.forEach(item => {
    item.addEventListener("click", () => {
        panelBtn.forEach(child => {
            child.nextElementSibling.style.height = '';
            child.nextElementSibling.classList.remove("accordion__body_active");
            child.querySelector(".accordion__item-icon").classList.remove("accordion__item-icon_active");
            child.closest(".accordion__item").querySelector(".accordion__body-link").classList.remove("accordion__body-link_active");
        })

        item.nextElementSibling.classList.add("accordion__body_active");
        item.nextElementSibling.style.height = item.nextElementSibling.scrollHeight + "px";
        item.querySelector(".accordion__item-icon").classList.add("accordion__item-icon_active");
        item.closest(".accordion__item").querySelector(".accordion__body-link").classList.add("accordion__body-link_active");
    })
})
/* --------- END accordion footer --------- */

/* --------- Order menu airTickets (пассажиры класс) --------- */
const airTicketsSeater = document.getElementById("airTicketsSeater");
const airTicketsMenu = document.getElementById("airTicketsMenu");
const airTicketsLabel = document.getElementById("airTicketsLabel");
let show = true;

airTicketsSeater.addEventListener("click", (evt) => {
    evt.stopPropagation()

    if (show) {
        airTicketsMenu.classList.add("airTickets-seaterBox__menu_active");
        airTicketsLabel.classList.add("airTickets-seaterBox__label_active");
    } else {
        airTicketsMenu.classList.remove("airTickets-seaterBox__menu_active");
        airTicketsLabel.classList.remove("airTickets-seaterBox__label_active");
    }
    show = !show;
})

const decrementsBtn = document.querySelectorAll(".decrement");
const incrementsBtn = document.querySelectorAll(".increment");
const counters = document.querySelectorAll(".counter");

const passengers = {
    adults: 0,
    children: 0,
    babies: 0,
}
// video 34мин
incrementsBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {})
})
