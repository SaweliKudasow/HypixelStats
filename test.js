var button = document.getElementById("searchButton");
var SearchContainer = document.querySelector(".SearchContainer");
var MainInfo = document.querySelector(".MainInfo");
var RestInfo1 = document.querySelector(".RestInfo1");
var RestInfo2 = document.querySelector(".RestInfo2");

if (button && SearchContainer) {
    button.addEventListener("click", function () {
        console.log("button was clicked!");
        SearchContainer.style.top = "8%";
        SearchContainer.style.left = "8%";
        MainInfo.style.display = "grid";
        RestInfo1.style.display = "grid";
        RestInfo2.style.display = "grid";
    });
}
