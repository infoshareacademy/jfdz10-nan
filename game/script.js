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
var scoreLife = document.querySelector('.life');
var life = 3;
var life1 = document.querySelector('.life__head1');
var life2 = document.querySelector('.life__head2');
var life3 = document.querySelector('.life__head3');


function startGame() {
    var target = event.target;
    var instructionText = document.createElement('p');
    var back = document.createElement('p');
    var instructionBoard = document.createElement('div');
    var text = "Złap jak najwięcej spadających elementów poruszając się kotkiem w lewo lub prawo. Do przemieszczania kotka użyj strzałek na klawiaturze. Każdy element jest inaczej punktowany: mleko 2 pkt, myszka 3 pkt. Unikaj jednak spadających bomb i kropel wody! Po złapaniu kropli kotek traci życie. Koniec gry następuje po utracie 3 żyć lub po zetknięciu z bombą. Powodzenia!";

    if (target.classList.contains('play__button')) {
        startWindow.remove();
        laptopCat.remove();
        createBoard(9, 10);
        fallingElementsGeneratorIntervalId = setInterval(generatePoints, 1500);
    

    } if (target.classList.contains('instruction')) {
        playBoard.remove();
        startWindow.appendChild(instructionBoard);
        instructionBoard.classList.add('instruction__board');
        instructionBoard.appendChild(instructionText);
        instructionText.classList.add('instruction__text');
        instructionText.textContent = text;
        instructionBoard.appendChild(back);
        back.classList.add("back");
        back.textContent = "Powrót";
    } if (target.classList.contains('back')) {
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

        switch (life) {
            case 2:
                life1.remove();
                break;
            case 1:
                life2.remove();
                break;
        }

        if (life <= 0) {
            life3.remove();
            gameOver();
        }
        console.log(life)
        
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
    removeActiveClass();
    removeAllPoints();
    finalScore();
}

