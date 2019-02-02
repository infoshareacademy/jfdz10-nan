

console.log('podpiety');

const teamContainer = popmotion.styler(document.querySelector('.team__wrapper'));
const teamImages = document.querySelector('.team__photo');

//listen(document.querySelector('#team', 'onclick').start((e) => console.log(e));

/*popmotion.tween({
    from: {
        scale: .7,
        opacity: 0,
        y: -300
    },
    to: {
        scale: 1,
        opacity: 1,
        y: 0
    },
    duration: 3000

}).start(teamContainer.set)*/

const stylers = Array
    .from(teamContainer.children)
    .map(popmotion.styler)

const animations = Array(stylers.length)
    .fill(popmotion.spring({ from: 10000, to: 0 }))