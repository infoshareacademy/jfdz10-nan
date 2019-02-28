window.onload = rotate;

var thisAd = 0;
var slides = [
    {
        name: "slide1",
        url: "url(../fotos/cat_background.jpg)"
    },
    {
        name: "slide2",
        url: "url(../fotos/cat_background2.jpg)"
    },
    {
        name: "slide3",
        url: "url(../fotos/cat_background3.jpg)"
    },
];

function nextSlide() {
    thisAd++;
    if(thisAd == slides.length) {
      thisAd = 0;
    }
    var image = slides[thisAd];
    document.getElementById("hero").style.backgroundImage = image.url; 
    document.getElementById("hero").style.transition = "1s"; 
}

function prevSlide() {
    thisAd--;
    if(thisAd < 0) {
        thisAd = slides.length;
    }
    var image = slides[thisAd];
    document.getElementById("hero").style.backgroundImage = image.url; 
    document.getElementById("hero").style.transition = "1s";
}

function rotate() {                   
    setTimeout(nextSlide(), 7000);
}

var nextButton = document.querySelector('.slider-button-next')
nextButton.addEventListener("click", nextSlide);

var prevButton = document.querySelector('.slider-button-prev')
prevButton.addEventListener("click", prevSlide);

