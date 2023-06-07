"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const smile = document.querySelector(".home-section");
  const eating = document.querySelector(".eating-room");
  const toilet = document.querySelector(".toilet-room");
  const bed = document.querySelector(".bed-room");
  const plates = document.querySelectorAll(".plates");
  const shop = document.querySelector(".shop-room");

  //shop
  const shop_c = document.querySelector(".shop-btn");
  const tvs = document.querySelectorAll(".tvs");
  const chairs = document.querySelectorAll(".armchairs");
  const tv = document.querySelector(".TV");
  const tvImg = document.querySelector(".tv");
  const chair = document.querySelector(".carpet-armchair");
  const chairImg = document.querySelector(".Chair");

  shop_c.addEventListener("click", function () {
    shop.style.display = "block";
    smile.style.display = "none";
    eating.style.display = "none";
    toilet.style.display = "none";
    bed.style.display = "none";
  });

  function openModal() {
    modal.style.display = "block";
  }

  tvs.forEach(function (item, idx) {
    item.addEventListener("click", function () {
      shop.style.display = "none";
      smile.style.display = "flex";
      tvImg.style.display = "none";
      tv.appendChild(item);
    });
  });

  chairs.forEach(function (item, idx) {
    item.addEventListener("click", function () {
      shop.style.display = "none";
      smile.style.display = "flex";
      chairImg.style.display = "none";
      chair.appendChild(item);
    });
  });

  // Tom's acts
  const tom = document.querySelector(".tom");
  const tomt = document.querySelector(".tom-t");
  const tomb = document.querySelector(".tom-t-n");
  const tomh = document.querySelector(".tomh");
  const tomhead = document.querySelector(".head-tom");
  const tomeat = document.querySelector(".eat-tom");

  // 2.1 version

  let coin = document.querySelector(".coin");
  let time = document.querySelector(".time");
  let coinAdd = {
    coins: 300,
  };
  let addedCoins;

  // ani maving

  tomh.addEventListener("click", function () {
    tomh.classList.add("ani-moving");
  });

  //controllers

  const c_smile = document.querySelector(".smile");
  const c_eating = document.querySelector(".eating");
  const c_toilet = document.querySelector(".toilet");
  const c_bed = document.querySelector(".bed");

  c_smile.addEventListener("click", function () {
    smile.style.display = "flex";
    eating.style.display = "none";
    toilet.style.display = "none";
    bed.style.display = "none";
    shop.style.display = "none";
  });

  c_eating.addEventListener("click", function () {
    smile.style.display = "none";
    eating.style.display = "block";
    toilet.style.display = "none";
    bed.style.display = "none";
    shop.style.display = "none";
  });

  c_toilet.addEventListener("click", function () {
    smile.style.display = "none";
    eating.style.display = "none";
    shop.style.display = "none";

    toilet.style.display = "flex";
    bed.style.display = "none";
  });

  c_bed.addEventListener("click", function () {
    smile.style.display = "none";
    eating.style.display = "none";
    toilet.style.display = "none";
    bed.style.display = "flex";
    shop.style.display = "none";
  });

  // eat func
  const eatingFunc = () => {
    tomhead.style.display = "none";
    tomeat.style.display = "inline-block";
    setTimeout(() => {
      tomhead.style.display = "inline-block";
      tomeat.style.display = "none";
    }, 500);
    setTimeout(() => {
      tomhead.style.display = "none";
      tomeat.style.display = "inline-block";
    }, 1000);
    setTimeout(() => {
      tomhead.style.display = "inline-block";
      tomeat.style.display = "none";
    }, 1500);
    // coin adding
    addedCoins = coinAdd.coins + 20;
    coin.innerHTML = `${addedCoins}`;
  };

  // eating
  plates.forEach(function (item) {
    item.addEventListener("click", eatingFunc, { once: true });
  });

  let timeleft = 3;
  const downloadTimer = setInterval(() => {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
    }
    document.getElementById("progressBar").value = 3 - timeleft;
    timeleft -= 1;
  }, 3000);

  // toilet func
  toilet.addEventListener("click", function () {
    var timeleft = 3;
    var downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "";
      } else {
        document.getElementById("countdown").innerHTML = timeleft + "";
      }
      timeleft -= 1;
    }, 1000);
    tomt.style.display = "none";
    tomb.style.display = "block";
    tomb.style.width = "50%";
    setTimeout(() => {
      tomt.style.display = "block";
      tomb.style.display = "none";
      tomh.style.width = "50%";
    }, 4000);
    addedCoins = coinAdd.coins + 50;
    coin.innerHTML = `${addedCoins}`;
  });

  // bed func
  bed.addEventListener("click", function () {
    addedCoins = coinAdd.coins + 100;
    coin.innerHTML = `${addedCoins}`;
    bed.style.background = "black";
    tom.style.display = "none";
    var timeleft = 500;
    var downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "";
      } else {
        document.getElementById("countdown").innerHTML = timeleft + "";
      }
      timeleft -= 1;
    }, 1000);
    setTimeout(() => {
      bed.style.background =
        "url('https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80')";
      bed.style.backgroundSize = "cover";
      bed.style.width = "100%";
      bed.style.height = "91vh";
      bed.style.textalign = "center";
      bed.style.backgroundPosition = "bottom";

      tom.style.display = "block";
    }, 501000);
  });
});