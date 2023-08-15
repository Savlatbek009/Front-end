// create qr

const createQR_input = document.querySelector(".createQR");
const qr_img = document.querySelector(".qr-img");

createQR_input.addEventListener("input", function () {
  qr_img.style.width = "150px";
  qr_img.style.height = "150px";
  qr_img.src = "../assets/loader.svg";
  setTimeout(() => {
    qr_img.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
      createQR_input.value;
  }, 900);

  if (createQR_input.value == "") {
    qr_img.style.width = "0";
    qr_img.style.height = "0";
  }
});
