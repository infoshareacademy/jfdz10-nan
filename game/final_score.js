var finalScoreContainer = document.querySelector('#game_result')

function createSaveResultButton() {
    var saveResultButton = document.createElement('button');
    saveResultButton.classList.add('save__button');
    saveResultButton.textContent = "Zapisz";
    finalScoreContainer.appendChild(saveResultButton);
}

function playerNameForm() {
    var playerName = document.createElement('form');

    finalScoreContainer.appendChild(playerName);
    playerName.setAttribute("action", "");
    playerName.setAttribute("method", "post");
    playerName.classList.add('player__name');

    var inputName = document.createElement('input');
    inputName.setAttribute("type", "text");
    inputName.setAttribute("name", "");
    playerName.appendChild(inputName);
}

function finalScore() {
    var gameResultTitle = document.createElement('p');
    var gameResult = document.createElement('p');
    
    finalScoreContainer.classList.add('game__result');

    finalScoreContainer.appendChild(gameResultTitle);
    gameResultTitle.textContent = "Twój wynik";
    gameResultTitle.classList.add('game__result--title')
    
    finalScoreContainer.appendChild(gameResult);
    gameResult.textContent = score;
    gameResult.classList.add('game__result--score');

    playerNameForm();
    createSaveResultButton();
}

function saveResult(target) {
    var target = event.target;
    if (target.classList.contains('save__button')) {
        saveScore({name: 'Janusz', points: score});
        finalScoreContainer.remove();
        generateScoresAsNodeList();
    }
}

window.addEventListener("click", saveResult)