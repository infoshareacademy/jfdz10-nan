var animate = anime({
    targets: '.team__clip-path-container',
    opacity: [
        {value: 0, duration: 200},
        {value: 1, duration: 300},
        {value: 0, duration: 200},
        {value: 1, duration: 300}
    ],
    delay: 500,
    autoplay: false
});

$(window).on('scroll', function() {
    if( $(this).width() > 769 && $(this).scrollTop() >= $('#contact').position().top ) {
        animate.play();
    }
});

