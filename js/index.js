// Time
class Time {
  #hours = new Date().getHours();
  #minutes = new Date().getMinutes();

  getStringTime() {
    if (this.#hours >= 0 && this.#hours <= 9) {
      this.#hours = `0${this.#hours}`;
    }

    if (this.#minutes >= 0 && this.#minutes <= 9) {
      this.#minutes = `0${this.#minutes}`;
    }

    return `${this.#hours}:${this.#minutes}`;
  }
}

setInterval(() => {
  document.querySelector('#js-time').textContent = new Time().getStringTime();
}, 1000);

// Calculation
const outputText = document.querySelector('.output__text');
const outputOption = document.querySelector('.output__option');
const outputPrev = document.querySelector('.output__prev');

let result = ['', null, '', '', ''];

document.querySelectorAll('.keyboard__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const textBtn = btn.querySelector('.keyboard__text').textContent;
    const activeItem = getActiveItem();

    // Numbers and .
    if (textBtn >= 0 && textBtn <= 9) {
      if (result[activeItem] == '0') {
        result[activeItem] = result[activeItem] + '.' + textBtn;
      } else {
        result[activeItem] = result[activeItem] + textBtn;
      }
      setResultText(result[activeItem]);
      setPrevCalc();
    }

    // Point
    if (textBtn === '.') {
      if (!isPoint(outputText.textContent)) {
        result[activeItem] = +result[activeItem] + '.';
        setResultText(result[activeItem]);
        setPrevCalc();
      }
    }

    // AC
    if (textBtn === 'AC') {
      result = ['', null, '', 0];
      setResultText('0');
      outputOption.textContent = '';
      setPrevCalc();
    }

    // +-*/%
    if (
      textBtn === '+' ||
      textBtn === '-' ||
      textBtn === '×' ||
      textBtn === '÷' ||
      textBtn === '%'
    ) {
      if (result[0]) {
        result[1] = textBtn;
        outputOption.textContent = textBtn;
        setPrevCalc();
      }
    }

    // =
    if (textBtn === '=') {
      if (result[0] && result[2]) {
        outputOption.textContent = '=';
        setPrevCalc();
        resolveOperation(result[1]);
      }
    }

    //+/-
    if (textBtn === '+/-') {
      result[activeItem] = +result[activeItem] * -1;
      setResultText(result[activeItem]);
      setPrevCalc();
    }
    console.log(result);
  });
});

function resolveOperation(operator) {
  switch (operator) {
    case '+':
      result[3] = +result[0] + +result[2];
      break;
    case '-':
      result[3] = +result[0] - +result[2];
      break;
    case '×':
      result[3] = +result[0] * +result[2];
      break;
    case '÷':
      result[3] = +result[0] / +result[2];
      break;
    case '%':
      result[3] = +result[0] % +result[2];
      break;
  }
  setResultText(result[3].toString());
  result = [result[3], null, '', ''];
}

function setResultText(res) {
  outputText.textContent = res.length > 10 ? res.substr(0, 10) : res;
}

function isPoint(res) {
  return res.includes('.');
}

function getActiveItem() {
  return result[1] ? 2 : 0;
}

function setPrevCalc() {
  result[4] = `${(result[0] ?? '')?.toString().substr(0, 10)} ${(result[1] ?? '')
    ?.toString()
    .substr(0, 10)} ${(result[2] ?? '')?.toString().substr(0, 10)}`;
  outputPrev.textContent = result[4];
}
