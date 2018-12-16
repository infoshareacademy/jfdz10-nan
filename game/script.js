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
                table += '<td class="cell active">1</td>';
            } else {
                table += '<td class="cell">1</td>';
            }
        }

        table += '</tr>';
    } 
    table += '</table>';
    boardContainer.innerHTML = table;
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


createBoard(4, 10);
document.addEventListener('keyup', onControlChange)


