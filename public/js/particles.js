let particles = [];
let clickCount = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
}

function draw() {
  clear(); // Clears the canvas, making it transparent

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

function mousePressed() {
  clickCount++;
  setTimeout(() => {
    if (clickCount === 1) {
      addParticles('star');
    } else if (clickCount === 2) {
      addParticles('heart');
    }
    clickCount = 0; // Reset click count
  }, 250);
}

function addParticles(shape) {
  for (let i = 0; i < 10; i++) { // Generate 10 particles
    particles.push(new Particle(mouseX, mouseY, shape));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor(x, y, shape) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.alpha = 255;
    this.color = color(random(255), random(255), random(255), this.alpha);
    this.shape = shape;
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
    if (this.shape === 'star') {
      beginShape();
      for (let i = 0; i < 5; i++) {
        let angle = TWO_PI / 5 * i;
        let x = this.x + cos(angle) * 8;
        let y = this.y + sin(angle) * 8;
        vertex(x, y);
        angle += TWO_PI / 10;
        x = this.x + cos(angle) * 4;
        y = this.y + sin(angle) * 4;
        vertex(x, y);
      }
      endShape(CLOSE);
    } else if (this.shape === 'heart') {
      beginShape();
      vertex(this.x, this.y);
      bezierVertex(this.x - 5, this.y - 5, this.x - 10, this.y + 5, this.x, this.y + 10);
      bezierVertex(this.x + 10, this.y + 5, this.x + 5, this.y - 5, this.x, this.y);
      endShape(CLOSE);
    }
  }
}
