const email = document.getElementById("email-form");
email.addEventListener("submit", openGameWindow);

function openGameWindow() {
    window.open("http://127.0.0.1:5500/game/index.html", "_blank","height=500px width=300px " + //rozmiar okna do ustalenia
    "resizable=no scrollbars=no menubar=no location=no status=no");
}