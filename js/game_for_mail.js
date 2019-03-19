const email = document.getElementById('email-form');
const strWindowFeatures = '_blank, height=910, width=820, resizable=no, modal=yes, alwaysRaised=yes, scrollbars=no, menubar=no, location=no, status=no';
email.addEventListener('submit', openGameWindow);

const strWindowFeaturesForSmallerResolution = '_blank, height=666, width=602, resizable=no, modal=yes, alwaysRaised=yes, scrollbars=no, menubar=no, location=no, status=no';
email.addEventListener('submit', openGameWindow);

function openGameWindow() {
    
    if (window.matchMedia('(max-width: 1439px)').matches) {
        window.open('game/index.html', '', strWindowFeaturesForSmallerResolution);
    } else {
        window.open('game/index.html', '', strWindowFeatures);
    }
}

