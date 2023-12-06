function getStringTime() {
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();

  if (hours >= 0 && hours <= 9) {
    hours = `0${hours}`;
  }

  if (minutes >= 0 && minutes <= 9) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

setInterval(() => {
  document.querySelector("#js-time").textContent = getStringTime();
}, 1000);

const outputText = document.querySelector(".output__text");
const outputOption = document.querySelector(".output__option");

let result = ["", null, "", ""];

document.querySelectorAll(".keyboard__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const textBtn = btn.querySelector(".keyboard__text").textContent;
    const activeItem = getActiveItem();

    // Numbers and .
    if (textBtn >= 0 && textBtn <= 9) {
      if (!result[1]) {
        result[0] = result[0] + textBtn;
        outputText.textContent = result[0];
      } else {
        result[2] = result[2] + textBtn;
        outputText.textContent = result[2];
      }
    }

    // Point
    if (textBtn === ".") {
      if (!isPoint(outputText.textContent)) {
        result[activeItem] = +result[activeItem] + ".";
        outputText.textContent = result[activeItem];
      }
    }

    // AC
    if (textBtn === "AC") {
      result = ["", null, "", 0];
      outputText.textContent = "0";
      outputOption.textContent = "";
    }

    // +-*/%
    if (
      textBtn === "+" ||
      textBtn === "-" ||
      textBtn === "X" ||
      textBtn === "/" ||
      textBtn === "%"
    ) {
      result[1] = textBtn;
      outputOption.textContent = textBtn;
    }

    // =
    if (textBtn === "=") {
      if (result[0] && result[2]) {
        outputOption.textContent = "=";
        resolveOperation(result[1]);
      }
    }

    //+/-
    if (textBtn === "+/-") {
      result[activeItem] = +result[activeItem] * -1;
      outputText.textContent = result[activeItem];
    }
    console.log(result);
  });
});

function resolveOperation(operator) {
  switch (operator) {
    case "+":
      result[3] = +result[0] + +result[2];
      break;
    case "-":
      result[3] = +result[0] - +result[2];
      break;
    case "X":
      result[3] = +result[0] * +result[2];
      break;
    case "/":
      result[3] = +result[0] / +result[2];
      break;
    case "%":
      result[3] = +result[0] % +result[2];
      break;
  }
  setResultText(result[3]);
  result = [result[3], null, "", ""];
}

function setResultText(res) {
  outputText.textContent = res.toString().length > 10 ? res.toFixed(10) : res;
}

function isPoint(res) {
  return res.includes(".");
}

function getActiveItem() {
  return result[2] ? 2 : 0;
}
