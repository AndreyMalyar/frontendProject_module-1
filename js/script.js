const menuTicketBody = document.querySelector("#menuSelectTickets_body");
const menuTicketTitle = document.querySelector("#menuSelectTickets_title");
const headerTitle = document.querySelector(".header__title");
const headerButtons = document.querySelectorAll(".header__button-item");
const headerButtonsParent = document.querySelector(".header__button-list");


menuTicketBody.addEventListener("mouseover", function (evt) {
    const menuTicketHeader = menuTicketTitle.closest(".nav-menu__select-header-current");
    menuTicketHeader.style.color = "#fff";
    menuTicketBody.addEventListener("mouseout", mouseOut)

    function mouseOut() {
        menuTicketHeader.removeAttribute("style");
        menuTicketBody.removeEventListener("mouseout", mouseOut);
    }

    evt.stopPropagation();
})


menuTicketBody.addEventListener("click", function (evt) {
    if (evt.target.tagName === "LI" && evt.target !== evt.currentTarget) {
        let clickItemName = evt.target.dataset.name;
        let clickItemLabel = evt.target.dataset.label;
        menuTicketTitle.textContent = evt.target.innerText;
        menuTicketTitle.dataset.name = clickItemName;

        //header title content replace
        removeHeaderTitle({name: clickItemName, label: clickItemLabel});

        //header buttons replace & add active
        removeActive(headerButtons);
        headerButtons.forEach(btn => {
            if (btn.dataset.name === clickItemName) {
                btn.classList.add("header__button-item_active")
            }
        })

    }

    evt.stopPropagation();
})

headerButtonsParent.addEventListener("click", function (evt) {
    if (evt.target.tagName === "BUTTON" && evt.target !== evt.currentTarget) {
        let clickItemName = evt.target.dataset.name;
        let clickItemLabel = evt.target.dataset.label;
        removeActive(headerButtons);
        removeHeaderTitle({name: clickItemName, label: clickItemLabel});
        evt.target.classList.add('header__button-item_active');
        menuTicketTitle.textContent = evt.target.innerText;
        menuTicketTitle.dataset.name = clickItemName;
    }
    evt.stopPropagation();
})

function removeHeaderTitle({label, name}) {
    headerTitle.innerText =
        (name !== "insurance") ?
            `Лучшие ${label.toLowerCase()} по самым низким ценам` :
            `Лучшее ${label.toLowerCase()} по самым низким ценам`;
}

function removeActive(elementsArray) {
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

    function closeMenu() {
        mobileMenuBody.removeAttribute("style");
        closeMobileMenu.removeEventListener("click", closeMenu);
    }
})


/* --------- Order menu airTickets (пассажиры класс) --------- */
const airTicketsPassenger = document.getElementById("airTicketsPassenger");
const airTicketsMenu = document.getElementById("airTicketsMenu");
const airTicketsLabel = document.getElementById("airTicketsLabel");
const selectPassenger = document.getElementById("outSelectedPassenger");

const classBtnParent = document.querySelector(".airTickets-menu-class__btnBox");
let classBtnLabel = null;

const closeMenuBtn = document.querySelector(".airTickets-menu__closeBtn");

let show = true;

const passengers = {
    adults: 0,
    children: 0,
    babies: 0,
}


airTicketsPassenger.addEventListener("click", (evt) => {
    if (show) {
        // airTicketsMenu.classList.add("airTickets-passengerBox__menu_active");
        airTicketsLabel.classList.add("airTickets-passengerBox__label_active");
        airTicketsMenu.style.height = airTicketsMenu.scrollHeight + "px";
    } else {
        // airTicketsMenu.classList.remove("airTickets-passengerBox__menu_active");
        airTicketsLabel.classList.remove("airTickets-passengerBox__label_active");
        airTicketsMenu.style.height = "";
        showSelectPassenger();
    }
    show = !show;
})

airTicketsMenu.addEventListener("click", (evt) => {
    evt.stopPropagation();
})

classBtnParent.addEventListener("click", onClickClassBtn);

function onClickClassBtn(evt) {
    if (evt.target.tagName === "BUTTON" && evt.target !== evt.currentTarget) {
        evt.stopPropagation();
        const allClassBtn = classBtnParent.querySelectorAll(".airTickets-menu-class__btn");
        allClassBtn.forEach(btn => {
            btn.classList.remove("airTickets-menu-class__btn_active");
        })
        evt.target.classList.add("airTickets-menu-class__btn_active");
        classBtnLabel = evt.target.dataset.name.toLowerCase();
    }

    document.removeEventListener("click", onClickClassBtn);
}

closeMenuBtn.addEventListener("click", (evt) => {
    airTicketsMenu.style.height = "";
    showSelectPassenger();
    show = true;
    // evt.stopPropagation();
});

function showSelectPassenger() {
    let titlePassenger = null;
    const allPassenger = Object.values(passengers).reduce((acc, item) => acc + item);
    if (!allPassenger) {
        selectPassenger.textContent = "";
        airTicketsLabel.classList.remove("airTickets-passengerBox__label_active");
        return;
    }
    airTicketsLabel.classList.add("airTickets-passengerBox__label_active");

    if (allPassenger === 1) {
        titlePassenger = "пассажир";
    } else if (allPassenger >= 2 && allPassenger <= 4) {
        titlePassenger = "пассажира";
    } else {
        titlePassenger = "пассажиров";
    }


    selectPassenger.textContent = `${allPassenger} ${titlePassenger}, ${classBtnLabel ? classBtnLabel : "любой"}`;

}


const decrementsBtn = document.querySelectorAll(".decrement");
const incrementsBtn = document.querySelectorAll(".increment");
const counters = document.querySelectorAll(".counter");


decrementsBtn.forEach(btn => {
    changeCounter(btn, "dec");

})

incrementsBtn.forEach(btn => {
    changeCounter(btn, "inc");
})


function changeCounter(btn, sign) {
    let inc = true;
    if (sign === "dec") {
        inc = false;
    }

    btn.addEventListener("click", (evt) => {
        let id = evt.target.dataset.id;

        switch (id) {
            case "adults":
                if (!checkPassengers("adults", inc, evt)) return;
                inc ? passengers.adults++ : passengers.adults--;
                counters[0].textContent = passengers.adults;
                break;
            case "children":
                if (!checkPassengers("children", inc, evt)) return;
                inc ? passengers.children++ : passengers.children--;
                counters[1].textContent = passengers.children;
                break;
            case "babies":
                if (!checkPassengers("babies", inc, evt)) return;
                inc ? passengers.babies++ : passengers.babies--;
                counters[2].textContent = passengers.babies;
                break;
        }
    })
}

function checkPassengers(key, inc, evt) {
    const allPassengers = Object.values(passengers).reduce((acc, item) => acc + item);

    if (passengers[key] === 0 && !inc) {
        evt.target.closest(".airTickets-menu__item").querySelector(".decrement").setAttribute("disabled", "");
        return false;
    } else if (allPassengers >= 9 && inc) {
        evt.target.closest(".airTickets-menu__item").querySelector(".increment").setAttribute("disabled", "");
        incrementsBtn.forEach((item, i) => {
            item.setAttribute("disabled", "");
        })
        return false;
    }


    if (allPassengers >= 0) {
        evt.target.closest(".airTickets-menu__item").querySelector(".decrement").removeAttribute("disabled");
    } else if (allPassengers <= 9) {
        evt.target.closest(".airTickets-menu__item").querySelector(".increment").removeAttribute("disabled");
    }

    if (allPassengers <= 9) {
        incrementsBtn.forEach((item, i) => {
            item.removeAttribute("disabled");
        })
    }

    return true;
}

/* --------- end Order menu airTickets (пассажиры класс) --------- */

/* --------- json server (мок сервер) --------- */




