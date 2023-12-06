const time = {
  getHours: function () {
    return new Date().getHours();
  },
  getMinutes: function () {
    return new Date().getMinutes();
  },
  getStringTime: function () {
    let hours = this.getHours(),
      minutes = this.getMinutes();
    if (this.getHours() >= 0 && this.getHours() <= 9) {
      hours = `0${this.getHours()}`;
    }
    if (this.getMinutes() >= 0 && this.getMinutes() <= 9) {
      hours = `0${this.getMinutes()}`;
    }
    return `${hours}:${minutes}`;
  },
};

setInterval(() => {
  document.querySelector("#js-time").textContent = time.getStringTime();
}, 500);
