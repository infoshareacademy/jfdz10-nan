function nextLevel() {
    if (score >= 10) {
        clearInterval(fallingElementsGeneratorIntervalId);
        clearInterval(fallingElementsIntervalId);
        removeAllPoints();
        showLevelBoard();
    }
    
}

function removeLevelBoard() {
    finalScoreContainer.remove()
}

function showLevelBoard() {
        var gameResultTitle = document.createElement('p');
        var gameResult = document.createElement('p');
        
        finalScoreContainer.classList.add('game__result');
    
        finalScoreContainer.appendChild(gameResultTitle);
        gameResultTitle.textContent = "Poziom";
        gameResultTitle.classList.add('game__result--title')
        
        finalScoreContainer.appendChild(gameResult);
        gameResult.textContent = 2;
        gameResult.classList.add('game__result--score');
        setTimeout(startNewLevel, 2000)
}



function startNewLevel() {
    removeLevelBoard();
    fallingElementsGeneratorIntervalId = setInterval(generatePoints, 1500);
    setInterval(fallingElementsIntervalId, (speedOfFalling *2));
}

