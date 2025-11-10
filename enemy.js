class Enemy {
    constructor(x, y, tx, ty) {
        this.x = x;
        this.y = y;
        this.tx = tx;
        this.ty = ty;
        this.size = 25;
        this.speed = random(0.5, 0.8);
        this.alive = true;
    }

    update() {
        let dir = createVector(this.tx - this.x, this.ty - this.y);
        dir.setMag(this.speed);
        this.x += dir.x;
        this.y += dir.y;
    }

    display() {
        stroke(glowColor);
        noFill();
        ellipse(this.x, this.y, this.size);
    }
}
