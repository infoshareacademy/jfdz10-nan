var boardContainer = document.querySelector('#board__container');
var startWindow = document.querySelector('#start__window');
var playBoard = document.querySelector('.play__board');
var playButton = document.querySelector('.play__button');
var laptopCat = document.querySelector('.laptop__cat');

var controls = {
    LEFT: 37,
    RIGHT: 39,
};

var scoreBoard = document.querySelector('.score');
var score = 0;
var life = 3;
var lifeContainer = document.querySelector('.life__heads');
var life1 = document.querySelector('.life__head1');
var life2 = document.querySelector('.life__head2');
var life3 = document.querySelector('.life__head3');

var speedOfFalling = 500;
var speedOfGeneratingPoints = 1500;
var fallingElementsGeneratorIntervalId;
var fallingElementsIntervalId;

var backgroundMusic = new Audio('music/background-music.mp3');

function startGame() {
    var target = event.target;
    var instructionText = document.createElement('p');
    var back = document.createElement('p');
    var instructionBoard = document.createElement('div');
    var text = "Złap jak najwięcej spadających elementów poruszając się kotkiem w lewo lub prawo. Do przemieszczania kotka użyj strzałek na klawiaturze. Każdy element jest inaczej punktowany: rybka 1 pkt, mleko 2 pkt, myszka 3 pkt. Każdy niezłapany element oznacza utratę życia. Koniec gry następuje po utracie 3 żyć lub po zetknięciu z bombą. Powodzenia!";

    if (target.classList.contains('play__button')) {
        startWindow.remove();
        laptopCat.remove();
        createBoard(8, 10);
        
        setTimeout(() => (fallingElementsGeneratorIntervalId = setInterval(generatePoints, speedOfGeneratingPoints)), 2000);
        setTimeout(() => (fallingElementsIntervalId = setInterval(fallingElements, speedOfFalling)), 2000);
        
        showLevelBoard();
        backgroundMusic.play();
        backgroundMusic.loop = true;
    }

    if (target.classList.contains('instruction')) {
        playBoard.remove();
        startWindow.appendChild(instructionBoard);
        instructionBoard.classList.add('instruction__board');
        instructionBoard.appendChild(instructionText);
        instructionText.classList.add('instruction__text');
        instructionText.textContent = text;
        instructionBoard.appendChild(back);
        back.classList.add("back");
        back.textContent = "Powrót";
    }

    if (target.classList.contains('back')) {
        instructionBoard.remove();
        startWindow.appendChild(playBoard);
    }
};


window.addEventListener("click", startGame);


function getActiveElement() {
    return document.querySelector('.active');
}

function removeActiveClass() {
    getActiveElement().classList.remove('active');
}

function createBoard(rows, cells) {
    var table = '<table>';
    for (var i = 0; i < rows; i++) {
        table += '<tr>';

        for (var j = 0; j < cells; j++) {
            var isFirstCell = (j === 0 && i === rows - 1);

            if (isFirstCell) {
                table += `<td x=${j} y=${i} class="cell active"></td>`;
            } else {
                table += `<td x=${j} y=${i}  class="cell"></td>`;
            }
        }

        table += '</tr>';
    }
    table += '</table>';
    boardContainer.innerHTML = table;
}

function generatePoints() {
    var cells = document.querySelectorAll('tr:first-child td:not(.points)');
    var randomIndex = Math.floor(Math.random() * cells.length);

    var rangeTable = [0.1, 0.3, 0.5, 1];
    var randomNumber = Math.random();
    var nextPoint = cells[randomIndex];
    var range = rangeTable.find(function (el, index) {
        return randomNumber < el;
    });

    switch (range) {
        case 0.1:
            return nextPoint.classList.add('points', 'mouse');
        case 0.3:
            return nextPoint.classList.add('points', 'milk');
        case 0.5:
            return nextPoint.classList.add('points', 'negative');
        case 1:
            return nextPoint.classList.add('points', 'fish');
        default:
            return nextPoint.classList.add('points', 'fish');
    }
}

function detectCollisions() {
    var node = document.querySelector('td.active.points')
    if (node) {
        node.classList.remove('points')
    }
}

function moveRight() {
    var next = getActiveElement().nextSibling;
    if (next === null) {
        return;
    }

    removeActiveClass();
    next.classList.add('active');
}

function moveLeft() {
    var prev = getActiveElement().previousSibling;
    if (prev === null) {
        return;
    }

    removeActiveClass();
    prev.classList.add('active');
}

function onControlChange(event) {
    switch (event.keyCode) {
        case controls.LEFT:
            moveLeft();
            break;
        case controls.RIGHT:
            moveRight();
            break;
    }
}


function fallingElements() {
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
            checkLevel();
        } else if (point.classList.contains('negative') && !isCellActive) {
            life *= 1;
        } else {
            life -= 1;
        }

        scoreBoard.innerText = score;
        point.classList.remove('points', 'milk', 'mouse', 'fish', 'negative');

        updateLifes()
    })
    detectCollisions()
}

document.addEventListener('keyup', onControlChange)

function updateLifes() {
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
}

function removeAllPoints() {
    const styles = document.querySelectorAll('.cell');
    styles.forEach(style => style.classList.remove('points'));
}

function gameOver() {
    var gameOverSound = new Audio('music/game-over.mp3');
    clearInterval(fallingElementsGeneratorIntervalId);
    clearInterval(fallingElementsIntervalId);
    removeActiveClass();
    removeAllPoints();
    lifeContainer.innerText = '';
    finalScore();
    backgroundMusic.pause();
    gameOverSound.play();
}

