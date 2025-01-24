
/* --------- topTen (TOP 10 авиакомпаний) --------- */
function getAirlineList() {
    fetch("http://localhost:3000/airline")
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                showAirline(data);
            }, 1500)
        })
}

getAirlineList();


function showAirline(arr) {
    const loaderWrapper = document.querySelectorAll(".loaderWrapper");
    loaderWrapper.forEach(el => {
        if(el.dataset.name === "topTen"){
            el.querySelector(".loaderBox").classList.remove("loaderBox_active")
        }
    })

    const olEl = document.getElementById("topTenList");

    const sorted = arr.sort((a, b) => b.rating - a.rating);
    sorted.forEach((airLine, ind) => {
        setTimeout(()=>{
            if (ind < 10) {
                const liEl = document.createElement("li");
                liEl.classList.add("topTen__item");
                const box = document.createElement("div");
                box.classList.add("topTen__box");
                const imgInner = document.createElement("div");
                imgInner.classList.add("topTen__inner");
                const linkEl = document.createElement("a");
                linkEl.classList.add("topTen__link");
                linkEl.setAttribute("href", airLine.link);
                const nameAirLine = document.createElement("span");
                const ratingAirLine = document.createElement("span");

                const imgEl = document.createElement("img");
                imgEl.src = "./img/svg/star.svg";
                imgEl.classList.add("topTen__icon");

                nameAirLine.textContent = airLine.name;
                ratingAirLine.textContent = airLine.rating;
                linkEl.append(nameAirLine);
                imgInner.append(imgEl, ratingAirLine)
                box.append(linkEl, imgInner);
                liEl.append(box);
                olEl.append(liEl);
            }
        }, ind * 200)

    })
}

/* --------- End topTen (TOP 10 авиакомпаний) --------- */