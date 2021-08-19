const VEL_Y_MIN = CONFIG.player.velYMin;

let wingflap = undefined;
let bonk = undefined;

class Player {
  constructor(app) {
    let p = CONFIG.player;
    this.posX = p.posX;
    this.fixedPosX = p.posX;
    this.posY = p.posY;
    this.dimX = p.dimX;
    this.dimY = p.dimY;
    this.img = document.getElementById(p.img);
    this.velX = p.velX;
    this.velY = p.velY;
    this.gravity = CONFIG.world.gravity;
    this.flapBoost = p.flapBoost;
    this.isFlapping = false;
    this.app = app;
    this.view = this.app.view;
  }
  draw() {
    this.view.context.translate(
      this.fixedPosX * window.innerWidth,
      this.posY * window.innerHeight
    );
    this.view.context.drawImage(
      this.img,
      -0.5 * this.dimX * window.innerWidth,
      -0.5 * this.dimY * window.innerHeight,
      this.dimX * window.innerWidth,
      this.dimY * window.innerHeight
    );
    this.view.context.translate(
      -this.fixedPosX * window.innerWidth,
      -this.posY * window.innerHeight
    );
  }
  handleFlap() {
    this.isFlapping = true;
    wingflap.currentTime = 0;
    wingflap.play();
  }
  static initialize() {
    wingflap = document.getElementById("wingflap");
    bonk = document.getElementById("bonk");
  }
  restart() {
    let p = CONFIG.player;
    this.posX = p.posX;
    this.posY = p.posY;
    this.velX = p.velX;
    this.velY = p.velY;
    this.isFlapping = false;
  }
  update(timeChange) {
    this.velY += this.gravity * timeChange;
    if (this.isFlapping) {
      this.velY += this.flapBoost;
      this.isFlapping = false;
    }
    this.posY += this.velY * timeChange;
    this.posX += this.velX * timeChange;
    if (this.posY > 1 - 0.5 * this.dimY) {
      this.posY = 1 - 0.5 * this.dimY;
      this.velY = 0;
    }
    if (this.posY < 0.5 * this.dimY) {
      this.posY = 0.5 * this.dimY;
      this.velY = 0;
    }
    if (this.velY < VEL_Y_MIN) {
      this.velY = VEL_Y_MIN;
    }
    // console.log(this.posX);
  }
}
