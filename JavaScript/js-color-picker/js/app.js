const color_picker = document.querySelector(".color-picker");
const col = document.querySelectorAll(".col");
const hexC = document.querySelector(".hex");
const noti = document.querySelector(".noti");
const rgb = document.querySelector(".rgb");
const apply = document.querySelector(".apply");

function hexToRgb() {
  const bigint = parseInt(color_picker.value.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  rgb.textContent = "rgb(" + r + "," + g + "," + b + ")";
}

const changeTxt = () => {
  hexC.textContent = color_picker.value;
  hexToRgb();
};

changeTxt();

color_picker.addEventListener("change", function (e) {
  changeTxt();
  let value = e.target.value;
});
apply.addEventListener("click", function () {
  document.body.style = "";
  document.body.style.backgroundColor = color_picker.value;
  changeTxt();
});

hexC.addEventListener("click", function () {
  navigator.clipboard.writeText(hexC.textContent);
  noti.textContent = "copied: " + hexC.textContent;
  noti.style.top = "30px";
  setTimeout(() => {
    noti.style.top = "-100px";
  }, 2000);
});
rgb.addEventListener("click", function () {
  navigator.clipboard.writeText(rgb.textContent);
  noti.textContent = "copied: " + rgb.textContent;
  noti.style.top = "30px";
  setTimeout(() => {
    noti.style.top = "-100px";
  }, 2000);
});
