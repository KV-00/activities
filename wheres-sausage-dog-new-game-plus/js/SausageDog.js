class SausageDog extends Animal {

  constructor(x, y, image) {
    super(x, y, image);

    this.script = undefined;

    this.found = false;
    this.rotationSpeed = 0.05;
<<<<<<< Updated upstream
    this.growth = 5;
    this.rotationAcceleration = 0.0025;
    this.growthAcceleration = 5;
=======
    //this.growth = 5;
    this.rotationAcceleration = 0.1;
    this.growthAcceleration = 1.25;
>>>>>>> Stashed changes
    this.time = 0;

  }

  update() {
    super.update();

    if (this.found) {

      this.time = this.time + deltaTime;
      this.vx = 0;
      this.vy = 0;

<<<<<<< Updated upstream
      if (this.time < 1000) {
        this.center;
=======
      if (this.time < 2000) {

        //this.center;
>>>>>>> Stashed changes
        this.angle += this.rotationSpeed;
        this.rotationSpeed += this.rotationAcceleration;
      }

<<<<<<< Updated upstream
      else if (this.time >= 1000 && this.time < 2000) {
        this.grow();
      }

      else {
        this.found = false;
        setupAnimals();
        setupSausage();
        }
=======
      } else if (this.time >= 2000 && this.time <= 3999) {

        this.grow();

      } else if (this.time >= 4000) {

        scene = "start";

>>>>>>> Stashed changes
      }
    }
  }

  grow() {
<<<<<<< Updated upstream
      this.center;
      this.angle += this.rotationSpeed;
      this.rotationSpeed += this.rotationAcceleration;
      this.image.width += this.growth;
      this.image.height += this.growth;
      this.growth += this.growthAcceleration;
    }

=======
    //this.image.width += this.growth;
    //this.image.height += this.growth;
    this.scale *= this.growthAcceleration;
  }

  //MADELINE CHANGES

>>>>>>> Stashed changes
  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      this.found = true;
    }
  }
}
