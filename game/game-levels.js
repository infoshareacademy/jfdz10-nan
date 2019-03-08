function nextLevel() {
    if (score >= 20) {
        clearInterval(fallingElementsGeneratorIntervalId);
        clearInterval(fallingElementsIntervalId);
        removeActiveClass();
        removeAllPoints();
        showLevelBoard();
    }
    
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
}