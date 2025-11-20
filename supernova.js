
class SupernovaEnemy {
	constructor(x, y, tx, ty) {
		this.x = x;
        this.y = y;
        this.tx = tx;
        this.ty = ty;
		this.size = 150;
		this.speed = random(0.2, 0.4);
		this.alive = true;
		this.health = 150;

		this.dir = 1; // direction of pulse
		this.acc = 10  // speed the color increases

		this.col = 150;
		this.color = color(255, 140, 0); // bright plasma orange

		this.cx = x
		this.cy = y;
		this.csize = 0;
	}

	update() {
		let dir = createVector(this.tx - this.x, this.ty - this.y);
        dir.setMag(this.speed);
        this.x += dir.x;
        this.y += dir.y;
		this.cx = this.x;
		this.cy = this.y;

		if (this.health <= 0) {

			// grow explosion
			this.csize += 5;   // speed of expansion

			if (this.csize >= 400) {
				this.alive = false;   // officially dead
			}
		}
	}

	display() {
		if (this.health <= 0) {
			this.displayCollateral();
			return;
		}

		// Alive display:
		stroke(this.color);
		fill(this.color);
		ellipse(this.x, this.y, this.size);

		if (this.health < 75) {
			this.displayFill();
		}

		fill(255);
		text(this.health, this.x, this.y);
	}

	displayFill() {
		if (this.col > 200 || this.col < 0) {
			this.dir *= -1;      // flip direction properly
		}


		if (this.health < 15) {
			this.acc = 20;
		}
		this.col += this.acc * this.dir; 
		this.color.setAlpha(this.col);
	}

	displayCollateral() {
		fill(255);
		stroke(this.color);
		ellipse(this.cx, this.cy, this.csize);
	}

	decreaseHealth() {
		this.health = this.health - 1;
	}
}
