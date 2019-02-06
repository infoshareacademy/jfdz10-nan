anime({
    targets: '.clip-path-container',
    translateY: [
        {value: -5000, duration: 100},
        {value: 0, duration: 200}
    ],
    opacity: [
        {value: 0, duration: 500},
        {value: 1, duration: 1000}
    ],
    //delay: function (el, i, l) { return i * 1000}
});
