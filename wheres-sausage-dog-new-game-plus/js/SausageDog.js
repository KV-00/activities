class SausageDog extends Animal {

  constructor(x, y, image) {
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = 0.05;
    this.growth = 5;
    this.rotationAcceleration = 0.1;
    this.growthAcceleration = 5;
  }

  update() {
    super.update();

    if (this.found) {
      this.center;
      this.angle += this.rotationSpeed;
      this.rotationSpeed += this.rotationAcceleration;
      setTimeout(1000);
        this.image.width += this.growth;
        this.image.height += this.growth;
        this.growth += this.growthAcceleration;
      }
    }

  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      this.found = true;
      setTimeout(() => {}, 3000);
    }
  }
}
