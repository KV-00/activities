class SausageDog extends Animal {

  constructor(x, y, image) {
    super(x, y, image);

    this.script = undefined;

    this.found = false;
    this.rotationSpeed = 0.05;
    this.growth = 5;
    this.rotationAcceleration = 0.0025;
    this.growthAcceleration = 5;
    this.time = 0;
  }

  update() {
    super.update();

    if (this.found) {

      this.time = this.time + deltaTime;
      this.vx = 0;
      this.vy = 0;

      if (this.time < 1000) {
        this.center;
        this.angle += this.rotationSpeed;
        this.rotationSpeed += this.rotationAcceleration;
      }

      else if (this.time >= 1000 && this.time < 2000) {
        this.grow();
      }

      else {
        this.found = false;
        setupAnimals();
        setupSausage();
        }
      }
    }

  grow() {
      this.center;
      this.angle += this.rotationSpeed;
      this.rotationSpeed += this.rotationAcceleration;
      this.image.width += this.growth;
      this.image.height += this.growth;
      this.growth += this.growthAcceleration;
    }

  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      this.found = true;
    }
  }
}
