class SausageDog extends Animal {

  constructor(x, y, image) {
    super(x, y, image);

    this.script = undefined;

    this.found = false;
    this.rotationSpeed = 0.05;
    this.rotationAcceleration = 0.0025;
    this.rotationAcceleration = 0.1;
    this.growthAcceleration = 1.25;
    this.time = 0;

  }

  update() {
    super.update();

    if (this.found) {

      this.time = this.time + deltaTime;
      this.vx = 0;
      this.vy = 0;

      if (this.time < 1000) {

        this.angle += this.rotationSpeed;
        this.rotationSpeed += this.rotationAcceleration;
      } else if (this.time >= 1000 && this.time < 2000) {
        this.grow();
      } else {
        this.found = false;
        gameState = "start";
      }
    }
  }


  grow() {
    this.angle += this.rotationSpeed;
    this.rotationSpeed += this.rotationAcceleration;
    this.scale *= this.growthAcceleration;
  }


  //MADELINE CHANGES

  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      this.found = true;
    }
  }
}
