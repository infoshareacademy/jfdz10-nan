
var lifeHeads = document.querySelector('.life__heads');
var lifeHeadsContent = lifeHeads.innerHTML;

var finalScoreContainer = document.querySelector('#game_result');

function level() {
    
    var levelTitle = document.createElement('p');
    var levelText = document.createElement('p');
    var levelButton = document.createElement('p');

    finalScoreContainer.classList.add('level__board');

    finalScoreContainer.appendChild(levelTitle);
    levelTitle.textContent = "Level 2";
    levelTitle.classList.add('level__title')
    levelTitle.appendChild(levelText);
    levelText.classList.add('level__text');
    levelText.textContent = "Gratulacje! Przechodzisz do drugiego poziomu. Teraz będzie dużo trudniej";
    levelText.appendChild(levelButton);
    levelButton.classList.add('level__button');
    levelButton.textContent = 'Play';
    }
    
    function playLevel() {
        var target = event.target;
        var lifeHeads = document.querySelector('.life__heads');

        if(target.classList.contains('level__button')) {
            finalScoreContainer.remove(); 
            lifeHeads.innerHTML = lifeHeadsContent;
            createBoard(9, 10);

            
            var fallingElementsGeneratorIntervalId = setInterval(generatePoints, 1500);
            var fallingElementsIntervalId = fallingElementsGeneratorIntervalId;
            document.addEventListener('keyup', onControlChange)
        }
    }
    
window.addEventListener("click", playLevel);
/*setTimeout(location.reload(), 5000)*/



