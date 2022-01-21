class SausageDog extends Animal {

  constructor(x, y, image) {
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = 0.05;
    this.growth = 5;
    this.rotationAcceleration = 0.005;
    this.growthAcceleration = 2;
  }

  update() {
    super.update();

    if (this.found) {
      this.center;
      this.image.width += this.growth;
      this.image.height += this.growth;
      this.growth += this.growthAcceleration
      this.angle += this.rotationSpeed;
      this.rotationSpeed += this.rotationAcceleration;
    }
  }

  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      this.found = true;
      setTimeout(() => {}, 3000);
    }
  }
}
