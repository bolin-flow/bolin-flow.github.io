const NB_PARTICLES = 200;
let triangles = [];
let particles = [];
let myColor;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  clear(); // Ensure initial clear
  myColor = new MyColor();
  for (let i = 0; i < NB_PARTICLES; i++) {
    particles.push(new Particle());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  myColor.update();

  triangles = [];

  // Move particles
  for (let p of particles) {
    p.move();
  }

  // Check for neighbors and add triangles
  for (let p1 of particles) {
    p1.neighbors = [p1];
    for (let p2 of particles) {
      if (p1 !== p2) {
        let d = dist(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);
        if (d > 0 && d < Particle.DIST_MAX) {
          p1.neighbors.push(p2);
        }
      }
    }
    if (p1.neighbors.length > 1) {
      addTriangles(p1.neighbors);
    }
  }

  // Draw triangles
  drawTriangles();
}

function drawTriangles() {
  noStroke();
  fill(myColor.R, myColor.G, myColor.B, 13);
  stroke(max(myColor.R - 15, 0), max(myColor.G - 15, 0), max(myColor.B - 15, 0), 13);
  beginShape(TRIANGLES);
  for (let t of triangles) {
    t.display();
  }
  endShape(CLOSE); // Ensure shape is closed
}

function addTriangles(neighbors) {
  if (neighbors.length > 2) {
    for (let i = 1; i < neighbors.length - 1; i++) {
      for (let j = i + 1; j < neighbors.length; j++) {
        triangles.push(new Triangle(neighbors[0].pos, neighbors[i].pos, neighbors[j].pos));
      }
    }
  }
}

function mousePressed() {
  myColor.init();
}

class MyColor {
  constructor() {
    this.init();
  }

  init() {
    this.R = random(255);
    this.G = random(255);
    this.B = random(255);
    this.Rspeed = random([-1, 1]) * random(0.7, 1.5);
    this.Gspeed = random([-1, 1]) * random(0.7, 1.5);
    this.Bspeed = random([-1, 1]) * random(0.7, 1.5);
  }

  update() {
    this.R += this.Rspeed;
    if (this.R > 255 || this.R < 0) this.Rspeed *= -1;

    this.G += this.Gspeed;
    if (this.G > 255 || this.G < 0) this.Gspeed *= -1;

    this.B += this.Bspeed;
    if (this.B > 255 || this.B < 0) this.Bspeed *= -1;
  }
}

class Particle {
  static RAD = 4;
  static BOUNCE = -1;
  static SPEED_MAX = 2.2;
  static DIST_MAX = 50;

  constructor() {
    this.pos = createVector(random(width), random(height));
    this.speed = createVector(random(-Particle.SPEED_MAX, Particle.SPEED_MAX), 
    random(-Particle.SPEED_MAX, Particle.SPEED_MAX));
    this.neighbors = [];
  }

  move() {
    this.pos.add(this.speed);

    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.speed.x *= Particle.BOUNCE;
    } else if (this.pos.x > width) {
      this.pos.x = width;
      this.speed.x *= Particle.BOUNCE;
    }

    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.speed.y *= Particle.BOUNCE;
    } else if (this.pos.y > height) {
      this.pos.y = height;
      this.speed.y *= Particle.BOUNCE;
    }
  }

  display() {
    fill(255, 14);
    noStroke();
    ellipse(this.pos.x, this.pos.y, Particle.RAD, Particle.RAD);
  }
}

class Triangle {
  constructor(p1, p2, p3) {
    this.A = p1;
    this.B = p2;
    this.C = p3;
  }

  display() {
    vertex(this.A.x, this.A.y);
    vertex(this.B.x, this.B.y);
    vertex(this.C.x, this.C.y);
  }
}
