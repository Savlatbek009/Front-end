window.addEventListener("DOMContentLoaded", () => {
  const input_g = document.querySelector(".google-v");
  const input_y = document.querySelector(".yandex-v");
  const result_y = document.querySelector(".yandex-r");
  const result_g = document.querySelector(".google-r");
  const search_g = document.querySelector(".google-search");
  const search_y = document.querySelector(".yandex-search");

  // show result
  input_g.addEventListener("input", function (e) {
    result_g.textContent = `Your result: ${input_g.value}`;
  });

  input_y.addEventListener("input", function () {
    result_y.textContent = `Your result: ${input_y.value}`;
  });

  // opening results
  function googlesearch(e) {
    if (input_g.value == "") {
      e.preventDefault();
      alert("Input your information in google searcher");
    } else {
      search_g.href = `https://www.google.ru/search?q=${input_g.value}`;
    }
  }
  function yandexsearch(e) {
    if (input_g.value == "") {
      e.preventDefault();
      alert("Input your information in yandex searcher");
    } else {
      search_y.href = ` https://yandex.ru/search/?text=${input_y.value}`;
    }
  }
  search_g.addEventListener("click", googlesearch);
  search_y.addEventListener("click", yandexsearch);
});
