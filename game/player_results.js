var scoresContainer = document.querySelector('#scores');
var LS_SCORES_KEY = 'scores';

function generateScoresAsNodeList() {
    scoresContainer.classList.add('final__scores');
    var finalScoreTitle = document.createElement('p');
    scoresContainer.appendChild(finalScoreTitle);
    finalScoreTitle.textContent = "Tablica wyników:";
    finalScoreTitle.classList.add('final__scores--title');
    var finalScoreList = document.createElement('div');
    finalScoreList.classList.add('final__scores--list');
    scoresContainer.appendChild(finalScoreList);
    const items = sortScoresASC(getScores())
        .map((score, i) => `<li>${i + 1}. ${score.name} : ${score.points}</li>`)
        .filter((person, i) => i < 10).join('');

    finalScoreList.innerHTML = `<ul>${items}</ul>`;
    finalScoreList.style.listStyle = 'none';
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