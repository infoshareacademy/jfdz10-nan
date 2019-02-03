var boardContainer = document.querySelector('#board__container');

var controls = {
    LEFT: 37,
    RIGHT: 39,
};

var scoreBoard = document.querySelector('.score');
var score = 0;
var scoreLife = document.querySelector('.life');
var life = 3;


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

function getElementBelow(tableCell) {

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
            return nextPoint.classList.add('points', 'drop');
        default:
            return nextPoint.classList.add('points', 'drop');
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
    detectCollisions()
}


createBoard(9, 10);
var fallingElementsGeneratorIntervalId = setInterval(generatePoints, 1500);
var fallingElementsIntervalId = setInterval(() => {
    var points = document.querySelectorAll(`.points`);
    points.forEach(point => {
        var y = +point.getAttribute('y');
        var x = +point.getAttribute('x');
        var cellBelowCssSelector = `td[x="${x}"][y="${y + 1}"]`
        var cell = document.querySelector(cellBelowCssSelector);

        var kindOfPoint = ['negative', 'milk', 'mouse', 'drop'].find(function (el) {
            return point.className.includes(el)
        })

        if (cell) {
            isCellActive = cell.classList.contains('active');
            switch (kindOfPoint) {
                case 'mouse':
                    isCellActive ? score += 3 : null;
                    cell.classList.add('points', 'mouse');
                    break;
                case 'milk':
                    isCellActive ? score += 2 : null;
                    cell.classList.add('points', 'milk');
                    break;
                case 'drop':
                    isCellActive ? score += 1 : null;
                    cell.classList.add('points', 'drop');
                    break;
                case 'negative':
                    isCellActive ? life -= 3 : null;
                    cell.classList.add('points', 'negative');
                    break;
            }


        } else {
            life -= 1;
        }
        scoreBoard.innerText = score;
        scoreLife.innerText = life;
        point.classList.remove('points', 'milk', 'mouse', 'drop', 'negative');

        if (life <= 0) {
            gameOver();
        }
    })
    detectCollisions()
}, 500);
document.addEventListener('keyup', onControlChange)

function removeAllPoints() {
    const styles = document.querySelectorAll('.cell');
    styles.forEach(style => style.classList.remove('points'));
}

function gameOver() {
    clearInterval(fallingElementsGeneratorIntervalId);
    clearInterval(fallingElementsIntervalId);
    saveScore({name: 'Janusz', points: score});
    removeActiveClass();
    generateScoresAsNodeList();
    removeAllPoints();
}

/*************************************** */

