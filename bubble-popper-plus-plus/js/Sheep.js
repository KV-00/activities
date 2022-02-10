class Sheep {
  constructor(x, y, image) {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 100;
    this.vx = random(1, -1);
    this.vy = random(1, -1);
    this.r = 25;
    this.angle = 0;
    this.vxRunning = random(10, -10);
    this.vyRunning = random(10, -10);
    this.jitter = 0;
    this.scared = false;
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

    // Bouncing
    if (
      (this.x > width - this.r && !this.touch) ||
      (this.x < this.r && !this.touch)
    ) {
      this.vx = -this.vx;
    }
    if (
      (this.y > height - this.r && !this.touch) ||
      (this.y < this.r && !this.touch)
    ) {
      this.vy = -this.vy;
    }

    // Facing direction of movement
    if (this.vx > 0) {
      this.angle = atan2(this.vy, this.vx);
    }
    if (this.vx < 0) {
      this.angle = atan2(this.vy, this.vx);
    }

    // Jitter
    this.angle = this.angle + this.jitter * (this.vx * this.vy);

    if (second() % 1 === 0) {
      this.jitter = random(-0.05, 0.05);
    }
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    pop();
  }
}
