Array.from(document.querySelectorAll(".navList__element > a")).forEach(e => e.addEventListener("click",
() => {
  document.querySelector("#menu__switch").checked =
  !document.querySelector("#menu__switch").checked;
  getValue();
}))

function getValue() {
  console.log(document.querySelector("#menu__switch").checked);
}