console.log("loaded model.js");

class Model {
  constructor(app) {
    console.log("constructing model");
    this.app = app;
    this.player = undefined;
    this.obstacles = undefined;
  }
  initialize() {
    console.log("initializing model");
    this.player = new Player(this.app);
    this.obstacles = this.makeObstacles();
  }
  makeObstacles() {
    Obstacle.initialize();
    return [
      // where and how would I place a limit to prevent the obstacles from overlapping when they randomize?
      //also how do I add obstacles at posX 0.1 that don't appear when you begin the game?
      new Obstacle(this.app, 0.1, 0.95, 0.3, 0.1, false),
      new Obstacle(this.app, 0.2, 0.975, 0.3, 0.05, false),
      new Obstacle(this.app, 0.4, 0.9, 0.1, 0.2, false),
      new Obstacle(this.app, 0.6, 0.875, 0.25, 0.25, false),
      new Obstacle(this.app, 0.7, 0.9, 0.3, 0.2, false),
      new Obstacle(this.app, 0.9, 0.83, 0.3, 0.3, false),
      new Obstacle(this.app, 1.0, 0.75, 0.2, 0.5, false),
      new Obstacle(this.app, 1.1, 0.8, 0.3, 0.4, false),
      new Obstacle(this.app, 1.2, 0.85, 0.1, 0.3, false),
      //
      new Obstacle(this.app, 0.0, 0.1, 0.2, 0.2, true),
      new Obstacle(this.app, 0.1, 0.025, 0.2, 0.05, true),
      new Obstacle(this.app, 0.3, 0.05, 0.3, 0.1, true),
      new Obstacle(this.app, 0.4, 0.1, 0.4, 0.2, true),
      new Obstacle(this.app, 0.5, 0.07, 0.1, 0.14, true),
      new Obstacle(this.app, 0.6, 0.1, 0.2, 0.2, true),
      new Obstacle(this.app, 0.8, 0.125, 0.2, 0.25, true),
      new Obstacle(this.app, 0.9, 0.15, 0.1, 0.3, true),
      new Obstacle(this.app, 1.0, 0.175, 0.2, 0.35, true),
      new Obstacle(this.app, 1.1, 0.2, 0.05, 0.4, true),
      new Obstacle(this.app, 1.2, 0.175, 0.3, 0.35, true),
    ];
  }
  resize() {
    console.log("resizing model");
    //nothing to do because of the coordinate system we've chosen
  }
  run(timeChange) {
    // console.log("running model");
    this.player.update(timeChange);
    for (let i = 0; i < this.obstacles.length; i++) {
      let obstacle = this.obstacles[i];
      obstacle.update(obstacle.posX - this.player.posX + this.player.fixedPosX);
    }
    // detect collision here
  }
}
