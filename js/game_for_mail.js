const email = document.getElementById('email-form');
const strWindowFeatures = '_blank, height=910, width=820, resizable=no, modal=yes, alwaysRaised=yes, scrollbars=no, menubar=no, location=no, status=no';
email.addEventListener('submit', openGameWindow);

function openGameWindow() {
    window.open('game/index.html', '', strWindowFeatures);
}