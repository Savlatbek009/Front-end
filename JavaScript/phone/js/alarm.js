const alarm_input = document.querySelector(".alarm-input");
const set_alarm = document.querySelector(".set-alarm");
const audio = document.querySelector(".audio");
const controllers = document.querySelector(".controllers");
const snooze_alarm = document.querySelector(".snooze-alarm");
const cencel_alarm = document.querySelector(".cencel-alarm");
const alarm_notif = document.querySelector(".alarm-notif h3");

var canPlay = true;

set_alarm.addEventListener("click", function () {
  let dateForTest = new Date();
  let timeForTest = dateForTest.toLocaleTimeString("it-IT");

  if (alarm_input.value == "") {
    alert("fill the field");
  } else if (alarm_input.value < timeForTest) {
    alert("vaqt noto'g'ri tanlangan");
  } else {
    alarm_notif.textContent = "alarm seted successfully!";
    setInterval(() => {
      let date = new Date();
      let time = date.toLocaleTimeString("it-IT");
      let sec = date.getSeconds().toString();

      if (sec.length === 1) {
        sec = 0 + sec;
      }
      const newValueForAlarm = alarm_input.value + ":" + sec;

      if (time === newValueForAlarm && canPlay) {
        audio.play();
        alarm_notif.textContent = `alarm is active just now!`;
        controllers.classList.remove("hide");
      }
    }, 1000);
  }
});
cencel_alarm.addEventListener("click", function () {
  canPlay = false;
  audio.remove();
  audio.style.display = "none";
  controllers.classList.add("hide");
  alarm_input.value = "";
  alarm_notif.textContent = `alarm was turned off!`;
  setTimeout(() => {
    window.location.reload();
  }, 500);
});
snooze_alarm.addEventListener("click", function () {
  canPlay = false;
  alarm_notif.textContent = `alarm was paused!`;

  audio.pause();
  setTimeout(() => {
    audio.play();
  }, 10000);
});
