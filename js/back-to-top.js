window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 320 || document.documentElement.scrollTop > 320) {
    document.getElementById("button__top").style.display = "block";
  } else {
    document.getElementById("button__top").style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}