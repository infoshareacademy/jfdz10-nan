var level = 1
function checkLevel() {
    if(score >= 2 && score < 5) {
        level+=1
    }
    if(score >= 5 && score < 7) {
        level+=2
    }
    console.log(level)
    nextLevel()
}
console.log(level)

function nextLevel() {
    if (level === 2) {
        clearInterval(fallingElementsGeneratorIntervalId);
        clearInterval(fallingElementsIntervalId);
        showLevelBoard();
        removeAllPoints();
    }
    if (level === 3) {
        clearInterval(fallingElementsGeneratorIntervalId);
        clearInterval(fallingElementsIntervalId);
        showLevelBoard();
        removeAllPoints();
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
        gameResult.textContent = level;
        gameResult.classList.add('game__result--score');
        setTimeout(startNewLevel, 2000)
}



function startNewLevel() {
    removeLevelBoard();
    createBoard(9, 10);
    speedOfFalling = speedOfFalling / level
    fallingElementsGeneratorIntervalId = setInterval(generatePoints, 1500)
    fallingElementsIntervalId = setInterval(() => {
        var points = document.querySelectorAll(`.points`);
        points.forEach(point => {
            var y = +point.getAttribute('y');
            var x = +point.getAttribute('x');
            var cellBelowCssSelector = `td[x="${x}"][y="${y + 1}"]`
            var cell = document.querySelector(cellBelowCssSelector);
    
            var kindOfPoint = ['negative', 'milk', 'mouse', 'fish'].find(function (el) {
                return point.className.includes(el)
            })
    
            if (cell) {
                var isCellActive = cell.classList.contains('active');
                switch (kindOfPoint) {
                    case 'mouse':
                        isCellActive ? score += 3 : null;
                        cell.classList.add('points', 'mouse');
                        break;
                    case 'milk':
                        isCellActive ? score += 2 : null;
                        cell.classList.add('points', 'milk');
                        break;
                    case 'fish':
                        isCellActive ? score += 1 : null;
                        cell.classList.add('points', 'fish');
                        break;
                    case 'negative':
                        isCellActive ? life -= 3 : null;
                        cell.classList.add('points', 'negative');
                        break;
                }
            } else if (point.classList.contains('negative') && !isCellActive) {
                life *= 1;
            } else {
                life -= 1;
            }
            scoreBoard.innerText = score;
            point.classList.remove('points', 'milk', 'mouse', 'fish', 'negative');
    
            switch (life) {
                case 2:
                    life1.remove();
                    break;
                case 1:
                    life2.remove();
                    break;
            }
    
            if (life <= 0) {
                life1.remove();
                life2.remove();
                life3.remove();
                gameOver();
            }
            
        })
        detectCollisions()
        
    }, speedOfFalling);
    
}

