var scoresContainer = document.querySelector('#scores');
var LS_SCORES_KEY = 'scores';

/*czyści pole gry, ale nie zmienia wyniku na zero i nie rozpoczyna nowej gry*/
function playAgain(target) {
    var target = event.target;
    if(target.classList.contains('restart__button')) {
        scoresContainer.remove();
        startGame();
    }
}

window.addEventListener("click", playAgain);

function createPlayAgainButton() {
    var playAgainButton = document.createElement('button');
    playAgainButton.classList.add('restart__button');
    playAgainButton.textContent = "play again";
    scoresContainer.appendChild(playAgainButton);
}

function generateScoresAsNodeList() {
    var finalScoreTitle = document.createElement('p');
    var finalScoreList = document.createElement('div');

    scoresContainer.classList.add('final__scores');

    scoresContainer.appendChild(finalScoreTitle);
    finalScoreTitle.textContent = "Tablica wyników:";
    finalScoreTitle.classList.add('final__scores--title');
    
    finalScoreList.classList.add('final__scores--list');
    scoresContainer.appendChild(finalScoreList);

    const items = sortScoresASC(getScores())
        .map((score, i) => `<li>${i + 1}. ${score.name} : ${score.points}</li>`)
        .filter((player, i) => i < 6).join('');

    finalScoreList.innerHTML = `<ul>${items}</ul>`;
    finalScoreList.style.listStyle = 'none;';
    createPlayAgainButton();
}

function saveScore(score) {
    var scores = getScores() || [];
    scores.push(score);
    localStorage.setItem(LS_SCORES_KEY, JSON.stringify(scores))
}

function sortScoresASC(scores) {
    return [...scores].sort((prev, next) => next.points - prev.points);
}

function getScores() {
  return JSON.parse(localStorage.getItem(LS_SCORES_KEY));
}
// saveScore przed generateScores(scores)
// generateScoresAsNodeList() zawolac po game over