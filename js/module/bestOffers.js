const bestOffersForm = document.getElementById("bestOffersForm");
const bestOffersInput = bestOffersForm.querySelector(".bestOffers__input");
const bestOffersLabel = bestOffersForm.querySelector(".bestOffers__input-label");

bestOffersForm.addEventListener("submit", (evt) => {
    if(bestOffersInput.value === ""){
        evt.preventDefault();
        bestOffersInput.classList.add("bestOffers__input_error");
        bestOffersLabel.classList.add("bestOffers__input-label_error");
        bestOffersLabel.classList.remove("bestOffers__input-label_active");
    }
})
/* удаляем класс error у input в который вводится текст */
bestOffersForm.addEventListener("input", () => {
    bestOffersInput.classList.remove("bestOffers__input_error");
    bestOffersLabel.classList.remove("bestOffers__input-label_error");
    bestOffersLabel.classList.add("bestOffers__input-label_active");
})

bestOffersForm.addEventListener("focusout", (evt) => {
    if(bestOffersInput.value === ""){
        bestOffersLabel.classList.remove("bestOffers__input-label_active");
    }
})