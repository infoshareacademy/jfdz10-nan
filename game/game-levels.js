var level = 1;
var newSpeedOffFalling;
var newSpeedOfGeneratingPoints;

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

    backgroundMusic.pause();
    
    
    setTimeout(startNewLevel, 2000)
}

function startNewLevel() {
    removeLevelBoard();

    if (level === 1) {
        return;
    }

    backgroundMusic.play();
    backgroundMusic.playbackRate = (level * 0.6);

    createBoard(8, 10);
    newSpeedOffFalling = speedOfFalling / level;
    newSpeedOfGeneratingPoints = speedOfGeneratingPoints - (level * 100);
    fallingElementsGeneratorIntervalId = setInterval(generatePoints, newSpeedOfGeneratingPoints);
    fallingElementsIntervalId = setInterval(fallingElements, newSpeedOffFalling);
}

