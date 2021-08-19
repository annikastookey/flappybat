const PROB_BIG = CONFIG.obstacle.probBig;
const BIG_COUNT_MAX = CONFIG.obstacle.bigCountMax;
const COLLISION_MULTIPLIER_X = 0.45;
const COLLISION_MULTIPLIER_Y = 0.95;

let bigCount = BIG_COUNT_MAX + 1;
let stalagmites = [];
let stalactites = [];

class Obstacle {
  constructor(app, posX, posY, dimX, dimY, isHanging) {
    this.posX = posX;
    this.posY = posY;
    this.dimX = dimX;
    this.dimY = dimY;
    this.collisionX = dimX * 0.5 * COLLISION_MULTIPLIER_X;
    this.collisionY = dimY * 0.5 * COLLISION_MULTIPLIER_Y;
    this.isHanging = isHanging;
    let imgIndex = Math.floor(Math.random() * CONFIG.obstacle.numImgs);
    this.img = isHanging ? stalactites[imgIndex] : stalagmites[imgIndex];
    this.app = app;
    this.view = this.app.view;
    this.isBonkable = true;
  }
  static initialize() {
    for (let i = 0; i < CONFIG.obstacle.numImgs; i++) {
      stalagmites.push(
        document.getElementById(CONFIG.obstacle.stalagmitePrefix + i)
      );
      stalactites.push(
        document.getElementById(CONFIG.obstacle.stalactitePrefix + i)
      );
    }
  }
  collide() {
    bonk.currentTime = 0;
    bonk.play();
    setTimeout(() => {
      this.isBonkable = true;
    }, 1000);
    this.isBonkable = false;
  }
  draw(x) {
    this.view.context.translate(
      x * window.innerWidth,
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
      -x * window.innerWidth,
      -this.posY * window.innerHeight
    );
  }
  update(x) {
    if (x + this.dimX < 0) {
      // need to reset obstacle
      this.posX += CONFIG.obstacle.updateOffset;
      bigCount++;
      let imgIndex = Math.floor(Math.random() * CONFIG.obstacle.numImgs);
      this.img = this.isHanging ? stalactites[imgIndex] : stalagmites[imgIndex];
      if (bigCount > BIG_COUNT_MAX) {
        // its been long enough since a big to make another one
        let r = Math.random();
        if (r < PROB_BIG) {
          this.dimY = CONFIG.obstacle.dimYMax;
          bigCount = 0;
        } else {
          this.dimY =
            CONFIG.obstacle.dimYMin + CONFIG.obstacle.dimYMid * Math.random();
        }
      } else {
        // its been to soon to make another big one
        this.dimY =
          CONFIG.obstacle.dimYMin + CONFIG.obstacle.dimYMid * Math.random();
      }
      if (this.isHanging) {
        this.posY = 0.5 * this.dimY;
      } else {
        this.posY = 1 - 0.5 * this.dimY;
      }
      this.dimX =
        CONFIG.obstacle.dimXMin + CONFIG.obstacle.dimXMid * Math.random();
    }
  }
}
