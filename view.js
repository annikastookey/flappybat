console.log("loaded view");

class View {
  constructor(app) {
    console.log("constructing view");
    this.app = app;
    this.can = undefined;
    this.context = undefined;
    this.player = undefined;
    this.obstacles = undefined;
  }
  initialize() {
    console.log("initializing view");
    this.can = document.getElementById("can");
    this.context = this.can.getContext("2d");
    this.player = this.app.model.player;
    this.obstacles = this.app.model.obstacles;
  }
  resize() {
    console.log("resizing View");
    this.can.width = window.innerWidth;
    this.can.height = window.innerHeight;
  }
  run() {
    // console.log("running View");
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.player.draw();
    for (let i = 0; i < this.obstacles.length; i++) {
      let obstacle = this.obstacles[i];
      obstacle.draw(obstacle.posX - this.player.posX + this.player.fixedPosX);
    }
    //call draw functions here
  }
}
