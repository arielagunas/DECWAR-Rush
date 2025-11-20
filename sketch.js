/*
DECWAR Rush — MVP
Main p5.js sketch
*/



let player, base;
let enemies = [];
let projectiles = [];
let glowColor;
let baseRadius = 100;
let enemyCount = 3;

let startOpacity = 0;

// standby, playing, win, lose
let gameState = "standby";
let gameLevel = 1;

function setup() {
    createCanvas(1280, 720);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
    textFont("monospace");
    noCursor();

    glowColor = color(255, 140, 0); // bright plasma orange

    player = new Player(width / 2, height / 2, baseRadius);
    base = new Base(width / 2, height / 2);

    spawnEnemies(enemyCount);
}

function draw() {
    // motion blur effect
    background(0, 50);

    // enable glow effect
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = glowColor;

	if (gameState === "standby") {
		displayStartScreen();
	}
	
    else if (gameState === "playing") {
        base.update();
        base.display();
		displayHUD();
        player.update();
        player.display();
		player.drawAimLine();
        for (let p of projectiles) {
            p.update();
            p.display();
        }

        for (let e of enemies) {
            e.update();
            e.display();

            // check for collision with base
            if (dist(e.x, e.y, base.x, base.y) < base.size / 2) {
                gameState = "lose";
            }

			if (e instanceof SupernovaEnemy && e.health <= 0) {
				let blastRadius = e.csize / 2;

				let baseRadius  = base.size / 2;    // base radius

				if (dist(e.cx, e.cy, base.x, base.y) < blastRadius + baseRadius) {
					gameState = "lose";
				}

				for (let other of enemies) {
					if (other !== e) { // don't compare with itself

						let otherRadius = other.size / 2;

						// if shockwave overlaps another enemy
						if (dist(e.cx, e.cy, other.x, other.y) < blastRadius + otherRadius) {

							if (other instanceof DotEnemy) {
								other.alive = false;
							}

							// supernovas chain-react (optional)
							if (other instanceof SupernovaEnemy && other.health > 0) {
								other.health = 0; // triggers THEIR explosion
							}
						}
					}
				}
			}

            // Check for collisions with projectiles
            for (let p of projectiles) {
                if (dist(e.x, e.y, p.x, p.y) < e.size / 2) {

					if (e instanceof DotEnemy) {
						e.alive = false;
						p.alive = false;
					}
					else if (e instanceof SupernovaEnemy) {
						console.log("Supernova hit!");

						e.decreaseHealth();
					}
                }
            }
        }

        // Remove dead entities
        enemies = enemies.filter(e => e.alive);
        projectiles = projectiles.filter(p => p.alive);

        // Check win condition
        if (enemies.length === 0) {
			gameLevel++;
			startLevel(gameLevel);
        }

    } else {
        displayEndScreen();
    }

    // Add CRT-style scanlines (optional aesthetic)
    addScanlines();
}

function displayHUD() {
	textSize(18);

	hudString = "Level " + gameLevel
	
    text(hudString, width / 2, height / 9 );
}

function keyPressed() {
    if (key === ' ') {
        projectiles.push(new Projectile(player.x, player.y, player.angle));
    }

	if (key === 'Enter') {
		if (gameState === "standby") {
			gameState = "playing";
		}
	}

    if (key === 'R' || key === 'r') {
        restartGame();
    }
}

function startLevel(level) {
    let enemyCountNew = floor(3 + Math.log(level) * 0.5);
	enemies = [];
	projectiles = [];
	spawnEnemies(enemyCountNew);
}

function restartGame() {
	if (gameState === "lose" || gameState === "win") {
		enemies = [];
		projectiles = [];
		spawnEnemies(enemyCount);
		gameState = "playing";
	}
    
}

function spawnEnemies(n) {
    for (let i = 0; i < n; i++) {
        let side = floor(random(4));
        let x, y;
        if (side === 0) x = random(width), y = 0;
        else if (side === 1) x = width, y = random(height);
        else if (side === 2) x = random(width), y = height;
        else x = 0, y = random(height);
		let enemy;

		if (random() < 0.8) {
			enemy = new DotEnemy(x, y, width / 2, height / 2);
		} else {
			enemy = new SupernovaEnemy(x, y, width / 2, height / 2);
		}

		enemies.push(enemy);

	}
}

function displayStartScreen() {

	if (startOpacity < 100) {
		startOpacity++;
	}
	fill(glowColor);
	textSize(48);
	text("DECWARS Rush", width / 2, height / 2);
	textSize(24);

	fill(color(255, 140, 0, startOpacity));
	text("Control with the Left and Right keys", width / 2, height / 2 + 60);
	text("Spacebar to shoot", width / 2, height / 2 + 100);

	text("Press ENTER to start", width / 2, height / 2 + 200);

}

function displayEndScreen() {
    fill(glowColor);
    textSize(48);
    if (gameState === "lose") {
        text("YOU LOSE", width / 2, height / 2);
		
		// reset game back to level 1
		gameLevel = 1;
    }
    textSize(24);
    text("Press R to Restart", width / 2, height / 2 + 60);
}

function addScanlines() {
    drawingContext.shadowBlur = 0;
    stroke(255, 100, 0, 15);
    for (let y = 0; y < height; y += 4) {
        line(0, y, width, y);
    }
}
