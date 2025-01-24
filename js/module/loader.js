/* ---------- loader --------- */
const loaderWrapper = document.querySelectorAll(".loaderWrapper");
loaderWrapper.forEach((item) => {
    const loaderBox = document.createElement("div");
    loaderBox.classList.add("loaderBox", "loaderBox_active");
    const loader = document.createElement("span");
    loader.classList.add("loaderBox__loader");
    const loaderText = document.createElement("span");
    loaderText.classList.add("loaderBox__text")
    loaderText.textContent = "Loading...";

    loaderBox.append(loader, loaderText);
    item.prepend(loaderBox);
})

/* ---------- END loader --------- */