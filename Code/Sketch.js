/*
DECWAR Rush — MVP
Main p5.js sketch
*/



let player, base;
let enemies = [];
let projectiles = [];
let glowColor;
let baseRadius = 100;
let enemyCount = 5;
let gameState = "playing";

function setup() {
    createCanvas(900, 700);
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
    // Create motion blur effect
    background(0, 50);

    // Enable glow effect
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = glowColor;

    if (gameState === "playing") {
        base.update();
        base.display();

        player.update();
        player.display();

        for (let p of projectiles) {
            p.update();
            p.display();
        }

        for (let e of enemies) {
            e.update();
            e.display();

            // Check for collision with base
            if (dist(e.x, e.y, base.x, base.y) < base.size / 2) {
                gameState = "lose";
            }

            // Check for collisions with projectiles
            for (let p of projectiles) {
                if (dist(e.x, e.y, p.x, p.y) < e.size / 2) {
                    e.alive = false;
                    p.alive = false;
                }
            }
        }

        // Remove dead entities
        enemies = enemies.filter(e => e.alive);
        projectiles = projectiles.filter(p => p.alive);

        // Check win condition
        if (enemies.length === 0) {
            gameState = "win";
        }

    } else {
        displayEndScreen();
    }

    // Add CRT-style scanlines (optional aesthetic)
    addScanlines();
}

function keyPressed() {
    if (key === ' ') {
        projectiles.push(new Projectile(player.x, player.y, player.angle));
    }

    if (key === 'R' || key === 'r') {
        restartGame();
    }
}

function restartGame() {
    enemies = [];
    projectiles = [];
    spawnEnemies(enemyCount);
    gameState = "playing";
}

function spawnEnemies(n) {
    for (let i = 0; i < n; i++) {
        let side = floor(random(4));
        let x, y;
        if (side === 0) x = random(width), y = 0;
        else if (side === 1) x = width, y = random(height);
        else if (side === 2) x = random(width), y = height;
        else x = 0, y = random(height);

        enemies.push(new Enemy(x, y, width / 2, height / 2));
    }
}

function displayEndScreen() {
    fill(glowColor);
    textSize(48);
    if (gameState === "win") {
        text("YOU WIN", width / 2, height / 2);
    } else if (gameState === "lose") {
        text("YOU LOSE", width / 2, height / 2);
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