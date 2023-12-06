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

document.querySelectorAll(".keyboard__btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(btn.querySelector(".keyboard__text").textContent);
  });
});
