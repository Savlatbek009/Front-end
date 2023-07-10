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

const clock = document.querySelector(".clock");
const wifi = document.querySelector(".wifi-status");
const battery_percent = document.querySelector(".battery");
const full_clock = document.querySelector(".full-clock");

// clock in header

// check online

setInterval(() => {
  if (navigator.onLine) {
    wifi.style.display = "block";
  } else {
    wifi.style.display = "none";
  }
}, 1000);

// get battery

navigator.getBattery().then((battery) => {
  function updateLevelInfo() {
    battery_percent.textContent = (battery.level * 100).toFixed(0) + "%";
  }
  battery.addEventListener("levelchange", () => {
    updateLevelInfo();
  });
  updateLevelInfo();
});

// Apps
const home_app = document.querySelector(".phone-main");
const footer_fixed = document.querySelector(".footer-fixed");
const timer_app = document.querySelector(".timer-app");
const timer_opener = document.querySelector(".timer-open");
const clock_app = document.querySelector(".clock-app");
const clock_opener = document.querySelector(".clock-open");
const alarm_app = document.querySelector(".alarm-app");
const alarm_opener = document.querySelector(".alarm-open");
const latin_app = document.querySelector(".latin-app");
const latin_opener = document.querySelector(".latin-open");
const calculator_app = document.querySelector(".calculator-app");
const calculator_opener = document.querySelector(".calculator-open");
const camera_app = document.querySelector(".camera-app");
const camera_opener = document.querySelector(".camera-open");
const back = document.querySelectorAll(".back");
const photoElement = document.getElementById("photoElement");

clock_opener.addEventListener("click", function () {
  home_app.classList.add("hide");
  footer_fixed.classList.add("hide");
  footer_fixed.classList.remove("open");

  clock_app.classList.remove("hide");
  clock_app.style.display = "flex";
});
latin_opener.addEventListener("click", function () {
  home_app.classList.add("hide");
  footer_fixed.classList.add("hide");
  footer_fixed.classList.remove("open");

  latin_app.classList.remove("hide");
  latin_app.style.display = "flex";
});
timer_opener.addEventListener("click", function () {
  home_app.classList.add("hide");
  footer_fixed.classList.add("hide");
  footer_fixed.classList.remove("open");

  timer_app.classList.remove("hide");
  timer_app.style.display = "flex";
});
alarm_opener.addEventListener("click", function (e) {
  e.preventDefault();
  home_app.classList.add("hide");
  footer_fixed.classList.add("hide");
  footer_fixed.classList.remove("open");

  alarm_app.classList.remove("hide");
  alarm_app.style.display = "flex";
});
calculator_opener.addEventListener("click", function () {
  home_app.classList.add("hide");
  footer_fixed.classList.add("hide");
  footer_fixed.classList.remove("open");

  calculator_app.classList.remove("hide");
  calculator_app.style.display = "flex";
});
camera_opener.addEventListener("click", function () {
  home_app.classList.add("hide");
  footer_fixed.classList.add("hide");
  footer_fixed.classList.remove("open");

  camera_app.classList.remove("hide");
  camera_app.style.display = "flex";

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      var video = document.getElementById("video");
      video.srcObject = stream;
      video.play();
    })
    .catch(function (error) {
      console.log("Error accessing the camera:", error);
    });

  camera_app.addEventListener("dblclick", function () {
    var video = document.getElementById("video");
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    var imageDataUrl = canvas.toDataURL("image/png");

    var link = document.createElement("a");
    link.href = imageDataUrl;
    link.download = "photo.png";
    link.click();
  });
});
function update() {
  var date = new Date();

  let hour = date.getHours().toString();
  let min = date.getMinutes().toString();
  let sec = date.getSeconds().toString();

  if (hour.length === 1) {
    hour = 0 + hour;
  }
  if (min.length === 1) {
    min = 0 + min;
  }
  if (sec.length === 1) {
    sec = 0 + sec;
  }

  clock.textContent = hour + ":" + min;
  full_clock.textContent = hour + " : " + min + " : " + sec;
}

setInterval(() => {
  update();
}, 1000);

back.forEach((btn) => {
  btn.addEventListener("click", function () {
    window.location.reload();
  });
});

// timer

var seconds = Number("00");
var tens = Number("00");
var appendTens = document.querySelector(".tens");
var appendSeconds = document.querySelector(".seconds");
var buttonStart = document.querySelector(".start-timer");
var buttonStop = document.querySelector(".stop-timer");
var buttonReset = document.querySelector(".reset-timer");
var interval;

function startTimer() {
  tens++;

  if (tens < 9) {
    appendTens.innerHTML = "0" + tens;
  }
  if (tens > 9) {
    appendTens.innerHTML = tens;
  }
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }
  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
}

buttonStart.onclick = function () {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(startTimer);
};

buttonStop.onclick = function () {
  clearInterval(interval);
};

buttonReset.onclick = function () {
  clearInterval(interval);
  tens = "00";
  seconds = "00";
  appendSeconds.innerHTML = seconds;
  appendTens.innerHTML = tens;
};

const turn_off_device = document.querySelector(".turn-off-device");

turn_off_device.addEventListener("click", function () {
  window.location.href = "/index.html";
});
