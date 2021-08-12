console.log("loaded controller.js");

class Controller {
  constructor(app) {
    console.log("construcing Controller");
    this.app = app;
    this.isFlapping = false;
  }
  handleKD(event) {
    event.preventDefault();
    switch (event.key) {
      case CONFIG.controller.quitKey:
        this.app.quit();
        break;
      case CONFIG.controller.flapKey:
        if (!this.isFlapping) {
          this.isFlapping = true;
          this.app.model.player.handleFlap();
        }
        break;
    }
  }
  handleKU() {
    event.preventDefault();
    switch (event.key) {
      case CONFIG.controller.flapKey:
        this.isFlapping = false;
        break;
    }
  }
  initialize() {
    let that = this;
    console.log("initializing controller");
    window.addEventListener("keydown", this.handleKD.bind(this));
    window.addEventListener("keyup", this.handleKU.bind(this));
    document
      .getElementById(CONFIG.controller.startButton)
      .addEventListener("click", function () {
        setTimeout(function () {
          that.app.start();
        }, CONFIG.controller.startDelay);
        this.style.display = "none";
      });
  }
  resize() {
    console.log("resizing controller");
  }
  run() {
    // console.log("running controller");
  }
}
