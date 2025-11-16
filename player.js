
let dir = 1; // direction of pulse
let acc = 10; // speed the color increases
let aimColor;

class Player {
	constructor(cx, cy, r) {
		this.cx = cx;
		this.cy = cy;
		this.r = r;
		this.angle = 0;
		this.rotationSpeed = 2;
		this.col = 150;
		// this.aimPulse = new Pulse({ x: 0, y: 0 }, 0.5, 0.1, 10);

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

	drawAimLine() {
		if (this.col > 200 || this.col < 0) {
			dir = dir * -1;
		}

		this.col += acc * dir;


		push();

		let aimColor = color(color(255, 140, 0));
		aimColor.setAlpha(this.col);

		stroke(aimColor);
		strokeWeight(1);

		drawingContext.shadowBlur = 0;
		drawingContext.shadowColor = 'rgba(0,0,0,0)';

		translate(this.x, this.y);

		const len = 700;
		line(0, 0, len * cos(this.angle), len * sin(this.angle));

		pop();
	}
}
