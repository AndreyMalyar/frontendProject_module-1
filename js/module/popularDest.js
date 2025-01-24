
getPopularDestinations();

function getPopularDestinations() {
    try {
        fetch("http://localhost:3000/popularDestinations")
            .then(res => res.json())
            .then(data => {
                setTimeout(() => {
                    showPopularDestinations(data);
                }, 1000)
            })
    } catch (err) {
        console.log(err);
    }

}

function showPopularDestinations(arr) {

    const loaderWrapper = document.querySelectorAll(".loaderWrapper");
    loaderWrapper.forEach(el => {
        if(el.dataset.name === "popularDest"){
            el.querySelector(".loaderBox").classList.remove("loaderBox_active")
        }
    })

    const sortArr = arr.sort((a, b) => a.price - b.price);
    let subLeft = sortArr.slice(0, sortArr.length / 2);
    let subRight = sortArr.slice(sortArr.length / 2);
    let mobileArr = sortArr;

    const ulLeft = document.getElementById("popularDestLeft");
    const ulRight = document.getElementById("popularDestRight");
    const ulMob = document.getElementById("popularDestMobile");


    const liDistRight = document.createElement("li");
    liDistRight.classList.add("popularDest__right-item")
    const liDistMob = document.createElement("li");
    liDistMob.classList.add("popularDest__mob-item");

    drawPopularDestinations(subLeft, ulLeft);
    drawPopularDestinations(subRight, ulRight);
}

function drawPopularDestinations(arrData, elWrap) {
    arrData.forEach((item) => {
        const liDistLeft = document.createElement("li");
        liDistLeft.classList.add("popularDest__list-item");

        const box = document.createElement("div");
        box.classList.add("popularDest__list-content");
        const fromDist = document.createElement("span");
        const toDist = document.createElement("span");
        const arrowRight = document.createElement("span");
        arrowRight.textContent = `→`;
        arrowRight.classList.add("popularDest__list-arrow");
        const priceDist = document.createElement("span");
        priceDist.classList.add("popularDest__list-price");

        const textFrom = `${item.from.charAt(0).toUpperCase() + item.from.slice(1)}`;
        const textTo = `${item.to.charAt(0).toUpperCase() + item.to.slice(1)}`;

        fromDist.textContent = textFrom;
        toDist.textContent = textTo;
        priceDist.textContent = `от ${item.price} ₴`;
        box.append(fromDist, arrowRight, toDist);
        liDistLeft.append(box, priceDist);
        elWrap.append(liDistLeft);
    })
}