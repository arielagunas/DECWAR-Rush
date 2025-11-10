class Projectile {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.angle = angle;
        this.speed = 7;
        this.alive = true;
    }

    update() {
        this.x += this.speed * cos(this.angle);
        this.y += this.speed * sin(this.angle);
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height)
            this.alive = false;
    }

    display() {
        stroke(glowColor);
        fill(glowColor);
        ellipse(this.x, this.y, this.size);
    }
}