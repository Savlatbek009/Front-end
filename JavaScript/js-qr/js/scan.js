// scanner qr
const result_url = document.querySelector(".result_url");
const result_txt = document.querySelector(".result_txt");

function onScanSuccess(qrCodeMessage) {
  result_url.href = "https://www.google.com/search?q=" + qrCodeMessage;
  result_url.target = "_blank";
  result_txt.textContent = qrCodeMessage;
}
var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
  fps: 10,
  qrbox: 250,
});
html5QrcodeScanner.render(onScanSuccess);
