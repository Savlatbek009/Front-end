// loader

const loader = document.querySelector(".loader");

function showLoader() {
  loader.style.opacity = 1;
  loader.style.display = "flex";
}
function hideLoader() {
  const fadeEffect = setInterval(() => {
    if (!loader.style.opacity) {
      loader.style.opacity = 1;
    }
    if (loader.style.opacity > 0) {
      loader.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
      loader.style.display = "none";
    }
  }, 200);
}
setTimeout(() => {
  hideLoader();
}, 2000);

// clock

const full_date = document.querySelector(".full-date");

setInterval(() => {
  let date = new Date();
  let time = date.toLocaleTimeString("it-IT").toString();
  console.log(time);
  full_date.innerHTML = `<h1>${time.slice(0, 5)}</h1>`;
  full_date.innerHTML += `<p>${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</p>`;
}, 1000);

// pass

const pass = document.querySelector(".lock-pass");

pass.addEventListener("keyup", function () {
  var date = new Date();
  if (this.value.length >= 2 && this.value !== date.getMinutes()) {
    pass.style.borderColor = "red";
    let inPass = 0;
    inPass++;
    pass.classList.add("incorrect-password");
    setTimeout(() => {
      this.value = "";
      pass.classList.remove("incorrect-password");
      pass.style.borderColor = "#04ff00";
    }, 300);
  }
  if (this.value == date.getMinutes()) {
    this.value = "";
    pass.classList.remove("incorrect-password");
    pass.style.borderColor = "#04ff00";
    location.href = "/phone.html";
  }
});

// swipe

const swipe_up = document.querySelector(".swipe-up");
const page_one = document.querySelector(".page-one");
const page_two = document.querySelector(".page-two");
const swipe_down = document.querySelector(".swipe-down");

swipe_up.addEventListener("click", function () {
  page_one.classList.add("hide");
  page_two.classList.remove("hide");
});
swipe_down.addEventListener("click", function () {
  page_one.classList.remove("hide");
  page_two.classList.add("hide");
});
