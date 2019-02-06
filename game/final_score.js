var finalScoreContainer = document.querySelector('#game_result')

function createSaveResultButton() {
    var saveResultButton = document.createElement('button');
    saveResultButton.classList.add('save__button');
    saveResultButton.textContent = "Zapisz";
    finalScoreContainer.appendChild(saveResultButton);
}

function playerNameForm() {
    var playerNameField = document.createElement('form');
    finalScoreContainer.appendChild(playerNameField);
    var playerNameInput = document.createElement('input');
    playerNameField.appendChild(playerNameInput);
    playerNameInput.setAttribute("id", "input");
    playerNameInput.classList.add('player__name');
    playerNameInput.setAttribute("type", "text");
    playerNameInput.setAttribute("placeholder", "Wpisz swój nick");
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
    var input = document.getElementById('input');
    if (target.classList.contains('save__button')) {
        saveScore({name: input.value, points: score});
        finalScoreContainer.remove();
        generateScoresAsNodeList();
        console.log(playerName);
    }
}

window.addEventListener("click", saveResult)