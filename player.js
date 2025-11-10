class Player {
  constructor(cx, cy, r) {
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.angle = 0;
    this.rotationSpeed = 3;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) this.angle -= this.rotationSpeed;
    if (keyIsDown(RIGHT_ARROW)) this.angle += this.rotationSpeed;

    this.x = this.cx + this.r * cos(this.angle);
    this.y = this.cy + this.r * sin(this.angle);
  }

  display() {
    stroke(glowColor);
    noFill();
    push();
    translate(this.x, this.y);
    rotate(this.angle + 90);
    triangle(-10, 10, 10, 10, 0, -15);
    pop();
  }
}
