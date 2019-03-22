var level = 1;
var newSpeedOFfFalling;

function checkLevel() {

    var previousLevel = level;

    if (level === 1 && score >= 7) {
        level = 2
    } else if (level === 2 && score >= 15) {
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
    gameResultTitle.classList.add('title')

    finalScoreContainer.appendChild(gameResult);
    gameResult.textContent = level;
    gameResult.classList.add('level');
    setTimeout(startNewLevel, 2000)
}

function startNewLevel() {
    removeLevelBoard();

    if (level === 1) {
        return;
    }


    createBoard(8, 10);
    newSpeedOFfFalling = speedOfFalling / level;
    fallingElementsGeneratorIntervalId = setInterval(generatePoints, 1500)
    fallingElementsIntervalId = setInterval(fallingElements, newSpeedOFfFalling);
}

