


document.getElementById("toggleImage").addEventListener("click", function() {
    this.classList.toggle("shrink");
    let menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
});