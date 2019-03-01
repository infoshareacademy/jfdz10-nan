window.onload = nextSlide;

var nextButton = document.querySelector(".slider-button-next");
nextButton.addEventListener("click", nextSlide);

var prevButton = document.querySelector(".slider-button-prev");
prevButton.addEventListener("click", prevSlide);

var dots = document.querySelectorAll(".slider-dots-element");
//dots.addEventListener("click", selectActiveSlide);

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
  }
];

const activeSlide = document.querySelector(".slider-dots-element-active");

var rotate = setInterval(nextSlide, 7000);

function setActiveSlide() {
  dots.item().classList.add("slider-dots-element-active");
}

function displayActiveDot() {
  dots[thisAd].classList.add("slider-dots-element-active");
}

function removeLeftDot() {
  var leftDot = dots[thisAd].previousElementSibling;
  if (leftDot === null) {
    return dots[slides.length - 1].classList.remove(
      "slider-dots-element-active"
    );
  }
  leftDot.classList.remove("slider-dots-element-active");
}

function removeRightDot() {
  var rightDot = dots[thisAd].nextElementSibling;
  if (rightDot === null) {
    return dots[0].classList.remove("slider-dots-element-active");
  }
  rightDot.classList.remove("slider-dots-element-active");
}

function nextSlide() {
  thisAd++;
  if (thisAd === slides.length) {
    thisAd = 0;
  }
  var image = slides[thisAd];
  document.getElementById("hero").style.backgroundImage = image.url;
  document.getElementById("hero").style.transition = "1s";
  displayActiveDot();
  removeLeftDot();
}

function prevSlide() {
  thisAd--;
  if (thisAd < 0) {
    thisAd = slides.length - 1;
  }
  var image = slides[thisAd];
  document.getElementById("hero").style.backgroundImage = image.url;
  document.getElementById("hero").style.transition = "1s";
  displayActiveDot();
  removeRightDot();
}
