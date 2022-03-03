class Sheep {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.size = 100;
    this.vx = 0;
    this.vy = -2;
    this.scale = 1;
    this.r = 25;
    this.angle = 0;
    this.vxRunning = random(20, -20);
    this.vyRunning = random(20, -20);
    this.scared = false;
    this.touch = false;
  }

  update() {
    this.display();

    if (this.scared === true) {
      this.vx = this.vxRunning;
      this.vy = this.vyRunning;
    }

    // Move the this
    this.x += this.vx;
    this.y += this.vy;

    // spin
    this.angle += 0.05;
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    scale(this.scale);
    image(this.image, 0, 0);
    pop();
  }
}
