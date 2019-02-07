var animate = anime({
    targets: '.team__clip-path-container',
    translateY: [
        {value: -2000, duration: 200},
        {value: 0, duration: 200}
    ],
    opacity: [
        {value: 0, duration: 400},
        {value: 1, duration: 200}
    ],
    delay: 1000,
    autoplay: false
});

$(window).on('scroll', function() {
    if( $(this).width() > 769 && $(this).scrollTop() >= $('#contact').position().top ) {
        animate.play();
    }
});

