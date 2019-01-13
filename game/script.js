var boardContainer = document.querySelector('#board__container');

var controls = {
    LEFT: 37,
    RIGHT: 39,
};

function getActiveElement() {
    return document.querySelector('.active');
}

function removeActiveClass() {
    getActiveElement().classList.remove('active');
}

function createBoard(rows, cells){
    var table = '<table>';
    for (var i = 0; i < rows; i++){
        table += '<tr>';

        for (var j = 0; j < cells; j++) {
            var isFirstCell = (j === 0 && i === rows - 1);

            if (isFirstCell) {
                table += `<td x=${j} y=${i} class="cell active">1</td>`;
            } else {
                table += `<td x=${j} y=${i}  class="cell">1</td>`;
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
    cells[randomIndex].classList.add('points');

    movePoints(randomIndex);
}

function movePoints(randomIndex) {
    setInterval(() => {
        var point = document.querySelector(`.points[x="${randomIndex}"]`);
        var y = +point.getAttribute('y');
        var x = +point.getAttribute('x');
        var cellBelowCssSelector = `td[x="${x}"][y="${y + 1}"]`
        var cell = document.querySelector(cellBelowCssSelector);

        cell.classList.add('points');

        var currentCellCssSelector = `td[x="${x}"][y="${y}"]`
        var previous = document.querySelector(currentCellCssSelector);
        previous.classList.remove('points');
       
    }, 500);
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
    switch(event.keyCode) {
        case controls.LEFT:
            moveLeft();
            break;
        case controls.RIGHT:
            moveRight();
        break;
        
    }
}


createBoard(10, 10);
setInterval(generatePoints, 1000);
movePoints();
document.addEventListener('keyup', onControlChange)

/*************************************** */

