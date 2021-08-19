const CONFIG = {
  controller : {
    flapKey : " ",
    quitKey : "escape",
    startButton: "startButton",
    startDelay : 1500,
    tryAgainButton: "tryAgainButton"
  },
  obstacle : {
    bigCountMax : 4,
    dimXMin : 0.05,
    dimXMid : 0.15,
    dimYMax : 0.5,
    dimYMin : 0.05,
    dimYMid : 0.35,
    numImgs : 10,
    probBig : 0.5,
    stalagmitePrefix : "stalagmite-",
    stalactitePrefix : "stalactite-",
    updateOffset : 1.3,
  },
  player : {
    dimX : 0.1,
    dimY : 0.1,
    flapBoost : -0.0002,
    img : "bat",
    posX : 0.3,
    posY : 0.5,
    velX : 0.0002,
    velY : 0,
    velYMin : -0.00013,
  },
  world : {
    gravity : 0.00000031,
  }
}