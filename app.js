console.log("loaded app.js");

class App {
  constructor() {
    console.log("constructing app");

    this.bgMusic = undefined;

    this.model = new Model(this);
    this.view = new View(this);
    this.controller = new Controller(this);

    this.isRunning = true;
    window.onload = this.initialize.bind(this);
  }
  initialize() {
    console.log("initializing App");

    this.bgMusic = document.getElementById("eerie");
    console.log(this.bgMusic);

    this.model.initialize(); //order matters because the view needs the model to be initialized first
    this.view.initialize();
    this.controller.initialize();

    window.onresize = this.resize.bind(this);
    this.resize();
  }
  quit() {
    this.isRunning = false;
    this.bgMusic.pause();
    this.model.setHighScore();
    let playAgain = confirm("do you want to play again?");
    if (playAgain) {
      this.restart();
    } else {
      alert("you lost. haha!");
    }
  }
  resize() {
    console.log("resizing app");

    this.model.resize();
    this.view.resize();
    this.controller.resize();
  }
  restart() {
    this.model.restart();
    this.isRunning = true;
  }
  run(timeNow) {
    // console.log("running App")
    let priorTime = timeNow;
    let that = this;
    requestAnimationFrame(_run);

    function _run(timeNow) {
      let timeChange = timeNow - priorTime;
      if (!that.isRunning) {
        return;
      }
      that.model.run(timeChange);
      that.view.run();
      that.controller.run();
      priorTime = timeNow;
      requestAnimationFrame(_run);
    }
  }
  start() {
    //TO DO - may need to fix initial time jump
    this.bgMusic.play();
    requestAnimationFrame(this.run.bind(this));
  }
}
