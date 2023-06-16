const btn_start = document.querySelector(".btn_start");
const btn_stop = document.querySelector(".btn_stop");
const btn_copy = document.querySelector(".btn_copy");
const form_input = document.querySelector(".input");
const notif = document.querySelector(".notif");
const notif_perent = document.querySelector(".notif-perent");

window.SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = true;

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript);

  form_input.innerHTML = transcript;
});

function startConversion() {
  form_input.classList.add("active");
  recognition.start();
}
function stopConversion() {
  form_input.classList.remove("active");
  recognition.stop();
}
function copyConversion() {
  navigator.clipboard.writeText(form_input.value);
  notif_perent.style.top = "30px";
  notif.style.display = "block";
  notif.textContent = "Copied to clipboard";

  setTimeout(() => {
    notif_perent.style.top = "-100px";
  }, 3000);

  stopConversion();
}

btn_start.addEventListener("click", startConversion);
form_input.addEventListener("click", startConversion);
btn_stop.addEventListener("click", stopConversion);
btn_copy.addEventListener("click", copyConversion);
