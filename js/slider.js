window.onload = () => {
  nextSlide();
  slideRotation();
};

var nextButton = document.querySelector(".slider-button-next");
nextButton.addEventListener("click", nextSlide);

var prevButton = document.querySelector(".slider-button-prev");
prevButton.addEventListener("click", prevSlide);

var arrowButtons = document.querySelectorAll(".slider-button");
arrowButtons.forEach(button => {
  button.addEventListener("click", cancelSlideRotation);
});

var dots = document.querySelectorAll(".slider-dots-element");

var activeSlideIndex = 0;
var slides = [
  {
    name: "slide1",
    url: "url(./fotos/cat_background.jpg)"
  },
  {
    name: "slide2",
    url: "url(./fotos/cat_background2.jpg)"
  },
  {
    name: "slide3",
    url: "url(./fotos/cat_background3.jpg)"
  }
];

var rotate;
function slideRotation() {
  rotate = setInterval(nextSlide, 7000);
}

function cancelSlideRotation() {
  clearInterval(rotate);
}

function displayActiveDot() {
  dots[activeSlideIndex].classList.add("slider-dots-element-active");
}

function removeLeftDot() {
  var leftDot = dots[activeSlideIndex].previousElementSibling;
  if (leftDot === null) {
    return dots[slides.length - 1].classList.remove(
      "slider-dots-element-active"
    );
  }
  leftDot.classList.remove("slider-dots-element-active");
}

function removeRightDot() {
  var rightDot = dots[activeSlideIndex].nextElementSibling;
  if (rightDot === null) {
    return dots[0].classList.remove("slider-dots-element-active");
  }
  rightDot.classList.remove("slider-dots-element-active");
}

function displayactiveSlideIndex() {
  var image = slides[activeSlideIndex];
  document.getElementById("hero").style.backgroundImage = image.url;
  document.getElementById("hero").style.transition = "0.5s";
  displayActiveDot();
}

function nextSlide() {
  activeSlideIndex++;
  if (activeSlideIndex === slides.length) {
    activeSlideIndex = 0;
  }
  displayactiveSlideIndex();
  removeLeftDot();
}

function prevSlide() {
  activeSlideIndex--;
  if (activeSlideIndex < 0) {
    activeSlideIndex = slides.length - 1;
  }
  displayactiveSlideIndex();
  removeRightDot();
}
