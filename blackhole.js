class Blackhole {
	constructor(x, y, tx, ty) {
		this.x = x;
        this.y = y;
        this.tx = tx;
        this.ty = ty;
        this.size = 200;
        this.speed = random(0.2, 0.3);
		this.alive = true;
	}

	update() {
        let dir = createVector(this.tx - this.x, this.ty - this.y);
        dir.setMag(this.speed);
        this.x += dir.x;
        this.y += dir.y;
    }

    display() {
        stroke(255);
		fill(0);
        ellipse(this.x, this.y, this.size);
		// fill(255);
		// text(this.y, this.x, this.y);
    }
}
