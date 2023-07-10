const reverser = document.querySelector(".reverser");
const reverse = document.querySelector(".convert");
const copy_cyrillic = document.querySelector(".copy_cyrillic");
const copy_lotin = document.querySelector(".copy_lotin");
const cyrillic = document.getElementById("input");
const lotin = document.getElementById("output");
reverser.addEventListener("click", function () {
  reverse.classList.toggle("reverse");
});

function convertToLatin() {
  let cyrillicToLatinUzbek = {
    А: "A",
    а: "a",
    Б: "B",
    б: "b",
    В: "V",
    в: "v",
    Г: "G",
    г: "g",
    Д: "D",
    д: "d",
    Е: "E",
    е: "e",
    Ё: "Yo",
    ё: "yo",
    Ж: "Zh",
    ж: "zh",
    З: "Z",
    з: "z",
    И: "I",
    и: "i",
    Й: "Y",
    й: "y",
    К: "K",
    к: "k",
    Л: "L",
    л: "l",
    М: "M",
    м: "m",
    Н: "N",
    н: "n",
    О: "O",
    о: "o",
    П: "P",
    п: "p",
    Р: "R",
    р: "r",
    С: "S",
    с: "s",
    Т: "T",
    т: "t",
    У: "U",
    у: "u",
    Ф: "F",
    ф: "f",
    Х: "X",
    х: "x",
    Ц: "S",
    ц: "s",
    Ч: "Ch",
    ч: "ch",
    Ш: "Sh",
    ш: "sh",
    Щ: "Shch",
    щ: "shch",
    Ъ: "",
    ъ: "",
    Ы: "I",
    ы: "i",
    Ь: "",
    ь: "",
    Э: "E",
    э: "e",
    Ю: "Yu",
    ю: "yu",
    Я: "Ya",
    я: "ya",
  };
  let inputText = document.getElementById("input").value;
  let outputText = "";

  for (let i = 0; i < inputText.length; i++) {
    let char = inputText.charAt(i);
    if (cyrillicToLatinUzbek[char]) {
      outputText += cyrillicToLatinUzbek[char];
    } else {
      outputText += char;
    }
  }

  document.getElementById("output").value = outputText;
}
function convertToCyrillic(e) {
  const latinUzbek = {
    a: "а",
    b: "б",
    d: "д",
    e: "е",
    f: "ф",
    g: "г",
    h: "ҳ",
    i: "и",
    j: "ж",
    k: "к",
    l: "л",
    m: "м",
    n: "н",
    o: "о",
    p: "п",
    q: "қ",
    r: "р",
    s: "с",
    t: "т",
    u: "у",
    v: "в",
    x: "х",
    y: "й",
    z: "з",
    A: "А",
    B: "Б",
    D: "Д",
    E: "Е",
    F: "Ф",
    G: "Г",
    H: "Ҳ",
    I: "И",
    J: "Ж",
    K: "К",
    L: "Л",
    M: "М",
    N: "Н",
    O: "О",
    P: "П",
    Q: "Қ",
    R: "Р",
    S: "С",
    T: "Т",
    U: "У",
    V: "В",
    X: "Х",
    Y: "Й",
    Z: "З",
  };
  let inputText = document.getElementById("output").value;
  let outputText = "";

  for (let i = 0; i < inputText.length; i++) {
    let char = inputText.charAt(i);
    if (latinUzbek[char]) {
      outputText += latinUzbek[char];
    } else {
      outputText += char;
    }
  }

  document.getElementById("input").value = outputText;
}
copy_cyrillic.addEventListener("click", function () {
  navigator.clipboard.writeText(cyrillic.value);
  alert(`copied to clipboard!`);
});
copy_lotin.addEventListener("click", function () {
  navigator.clipboard.writeText(lotin.value);
  alert(`copied to clipboard!`);
});
