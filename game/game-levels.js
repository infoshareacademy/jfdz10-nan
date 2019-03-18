var level = 1;
var newSpeedOFfFalling;

function checkLevel() {
    if (level === 3) {
        return; //nic nie robimy
    }

    var previousLevel = level;

    if (level === 1 && score >= 5) {
        level = 2
    } else if (level === 2 && score >= 10) {
        level = 3
    }

    if(previousLevel !== level) {
        nextLevel();
    }
}

function nextLevel() {
    clearInterval(fallingElementsGeneratorIntervalId);
    clearInterval(fallingElementsIntervalId);
    showLevelBoard();
    removeAllPoints();
}

function removeLevelBoard() {
    finalScoreContainer.classList.remove('game__result');
    while (finalScoreContainer.firstChild) {
        finalScoreContainer.removeChild(finalScoreContainer.firstChild);
    };
}

function showLevelBoard() {
    var gameResultTitle = document.createElement('p');
    var gameResult = document.createElement('p');

    finalScoreContainer.classList.add('game__result');

    finalScoreContainer.appendChild(gameResultTitle);
    gameResultTitle.textContent = "Poziom";
    gameResultTitle.classList.add('game__result--title')

    finalScoreContainer.appendChild(gameResult);
    gameResult.textContent = level;
    gameResult.classList.add('game__result--score');
    setTimeout(startNewLevel, 2000)
}

function startNewLevel() {
    removeLevelBoard();

    if (level === 1) {
        return;
    }


    createBoard(9, 10);
    newSpeedOFfFalling = speedOfFalling / level;
    fallingElementsGeneratorIntervalId = setInterval(generatePoints, 1500)
    fallingElementsIntervalId = setInterval(fallingElements, newSpeedOFfFalling);
}

