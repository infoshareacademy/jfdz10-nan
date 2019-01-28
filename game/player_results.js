var scoresContainer = document.querySelector('#scores');
var LS_SCORES_KEY = 'scores';

function generateScoresAsNodeList() {
    const items = sortScoresASC(getScores())
        .map((score, i) => `<li>${i + 1}. ${score.name} : ${score.points}</li>`).join('');

    scoresContainer.innerHTML = `<ul>${items}</ul>`
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