let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
}

function draw() {
  clear(); // Clears the canvas, making it transparent
  particles.push(new Particle(mouseX, mouseY));

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.alpha = 255;
    this.color = color(random(255), random(255), random(255), this.alpha);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
    this.color.setAlpha(this.alpha); // Update alpha for fading effect
  }

  finished() {
    return this.alpha < 0;
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, 16);
  }
}
