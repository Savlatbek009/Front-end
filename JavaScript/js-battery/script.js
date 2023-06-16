navigator.getBattery().then((battery) => {
  let charging = document.querySelector(".charing");
  let uncharging = document.querySelector(".uncharing");
  let percentage = document.querySelector(".percentage");
  let percent = document.querySelector(".percent");
  let isCharging = document.querySelector(".isCharging");

  function updateAllBatteryInfo() {
    updateLevelInfo();
    updateChargeInfo();
  }
  setInterval(() => {
    updateAllBatteryInfo();
  }, 1);

  function updateLevelInfo() {
    percentage.style.width = battery.level * 100 + "%";
    percent.innerHTML = battery.level * 100 + "%";
  }

  function updateChargeInfo() {
    if (battery.charging) {
      isCharging.textContent = "Charging";
    } else {
      isCharging.textContent = "Not charging";
    }
  }

  battery.addEventListener("levelchange", () => {
    updateLevelInfo();
  });

  battery.addEventListener("chargingchange", () => {
    updateChargeInfo();
  });
});
