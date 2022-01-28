class Animal {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.touch = false;
    this.vx = random(1, -1);
    this.vy = random(1, -1);
    this.acceleration = 0.01;
    this.scale = 1;
    this.r = 25;

    this.angle = 0;

    this.jitter = 0;


  }

  update() {
    this.display();

    if (this.vx > 0) {
      this.angle = atan2(this.vy, this.vx);
    }
    if (this.vx < 0) {
      this.angle = atan2(this.vy, this.vx);
    }




    this.angle = this.angle + this.jitter * (this.vx * this.vy);

    if (second() % 1 === 0) {
      this.jitter = random(-0.05, 0.05);
    }

    if (this.touch) {
      this.x += this.vx * 5;
      this.vx += this.acceleration;
      this.y += this.vy * 5;
      this.vy += this.acceleration;
    }
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);

    rotate(this.angle);
    scale(this.scale);
    image(this.image, 0, 0);

    this.x += this.vx;
    this.y += this.vy;
    if (this.x > width - this.r && !this.touch || this.x < this.r && !this.touch) {
      this.vx = -this.vx;
    }
    if (this.y > height - this.r && !this.touch || this.y < this.r && !this.touch) {
      this.vy = -this.vy;
    }
    pop();

  }

  overlap(x, y) {
    if (x > this.x - this.image.width / 2 &&
      x < this.x + this.image.width / 2 &&
      y > this.y - this.image.height / 2 &&
      y < this.y + this.image.height / 2) {
      return true;
    } else {
      return false;
    }
  }

  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      this.touch = true;
    }
  }
}
