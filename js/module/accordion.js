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