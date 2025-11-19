class SupernovaEnemy {
	constructor(x, y, tx, ty) {
		this.x = x;
        this.y = y;
        this.tx = tx;
        this.ty = ty;
		this.size = 150;
		this.speed = random(0.2, 0.8);
		this.alive = true;
		this.health = 50;
	}

	update() {
		let dir = createVector(this.tx - this.x, this.ty - this.y);
        dir.setMag(this.speed);
        this.x += dir.x;
        this.y += dir.y;	
	}

	display() {
		stroke(glowColor);
		fill(glowColor);
		ellipse(this.x, this.y, this.size);

	}
}
