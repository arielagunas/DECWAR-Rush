class Base {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = baseRadius;
  }

  update() { }

  display() {
    stroke(glowColor);
    noFill();
    ellipse(this.x, this.y, this.size);
    line(this.x - 10, this.y, this.x + 10, this.y);
    line(this.x, this.y - 10, this.x, this.y + 10);
  }
}