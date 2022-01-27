class SausageDog extends Animal {

  constructor(x, y, image) {
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = 0.05;
    this.growth = 5;
    this.rotationAcceleration = 0.1;
    this.growthAcceleration = 5;
    this.time = 0;
  }

  update() {
    super.update();

    if (this.found) {

      //MADELINE CHANGES
      this.time = this.time + deltaTime;

      if (this.time < 2000) {

        this.center;
        this.angle += this.rotationSpeed;
        this.rotationSpeed += this.rotationAcceleration;

      } else if (this.time >= 2000 || this.time <= 4000) {

        this.grow();

      } else {

        return;

      }


      }
    }

    grow() {
      this.image.width += this.growth;
      this.image.height += this.growth;
      this.growth += this.growthAcceleration;
    }

    //MADELINE CHANGES

  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      this.found = true;
      setTimeout(() => {}, 3000);
    }
  }
}
