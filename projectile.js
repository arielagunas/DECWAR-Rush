class Projectile {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.angle = angle;
        this.speed = 7;
        this.alive = true;

        this.vx = this.speed * cos(this.angle);
        this.vy = this.speed * sin(this.angle);
    }

    update() {
        for (let e of enemies) {
            if (e instanceof Blackhole) {

                let bh = createVector(e.x, e.y);
                let p  = createVector(this.x, this.y);
                let dir = p5.Vector.sub(bh, p);  // vector toward blackhole

                let distSq = dir.magSq();
                distSq = max(distSq, 50);       

                // gravitational strength (tweak 20000 for more/less pull)
                let strength = 10000 / distSq;

                dir.setMag(strength);

                // apply gravitational acceleration to projectile
                this.vx += dir.x;
                this.vy += dir.y;
            }
        }

        this.x += this.vx;
        this.y += this.vy;

        // Kill if out of bounds
        if (
            this.x < 0 || this.x > width ||
            this.y < 0 || this.y > height
        ) {
            this.alive = false;
        }
    }

    display() {
        stroke(glowColor);
        fill(glowColor);
        ellipse(this.x, this.y, this.size);
    }
}
