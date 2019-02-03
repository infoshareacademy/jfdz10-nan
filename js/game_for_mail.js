const email = document.getElementById('email-form');
const strWindowFeatures = '_blank, height=612, width=820, resizable=no, modal=yes, alwaysRaised=yes, scrollbars=no, menubar=no, location=no, status=no';
email.addEventListener('submit', openGameWindow);

function openGameWindow() {
    window.open('http://127.0.0.1:5500/Projekt/jfdz10-nan/game/index.html', '', strWindowFeatures);
}