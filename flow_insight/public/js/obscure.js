const maxPoints = 10;
const maxSpeed = 0.2;
const speedScaling = 2;
const proportions = [0.5, 0.3, .2]
let pointTypes = [];

let theShader;
let points = [];
let directions = [];

function preload() {
  theShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  describe("3 separate point clouds with distinct different colors (that when combined add to white) float around on the canvas and create an emerging pattern based on voronoi noise and cell shading");
  pointTypes = [color(proportions[0] * 255, proportions[1] * 255, proportions[2] * 255),
                color(proportions[2] * 255, proportions[0] * 255, proportions[1] * 255),
                color(proportions[1] * 255, proportions[2] * 255, proportions[0] * 255)];
  
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  background(255);
  noStroke();
  for (let j = 0; j < pointTypes.length; j++) {
    let newPoints = [];
    let newDirections = [];
    for (let i = 0; i < maxPoints; i++) {
      newPoints[i] = createVector((random() - 0.5) * width, (random() - 0.5) * height);
      newDirections[i] = p5.Vector.random2D().mult(100);
    }
    points[j] = newPoints;
    directions[j] = newDirections;
  }
}

function draw() {
  for (let i = 0; i < pointTypes.length; i++) {
    updatePoints(i);
  }

  theShader.setUniform('u_mouse', [mouseX, height - mouseY]);
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_points', getRawVectorArray());
  theShader.setUniform('u_colors', getRawTypeColors());
  shader(theShader);
  rect(0, 0, width, height);
}

function updatePoints(type) {
  let newPoints = [maxPoints];
  for (let i = 0; i < points[type].length; i++) {
    newPoints[i] = updatePoint(type, i);
  }
  points[type] = newPoints;
}

function updatePoint(type, index) {
  let newDirection = createVector(0, 0);
  newDirection.add(p5.Vector.mult(points[type][index], -1).limit(maxSpeed));

  for (let i = 0; i < maxPoints; i++) {
    if (index == i) {
      continue;
    }
    let diffVec = p5.Vector.sub(points[type][i], points[type][index]);
    diffVec.limit(maxSpeed);
    newDirection.add(diffVec);
  }

  directions[type][index].add(newDirection);

  let newPoint = p5.Vector.add(points[type][index], p5.Vector.mult(directions[type][index], deltaTime * 0.001 * speedScaling));
  return newPoint;
}

function getRawVectorArray() {
  let rawArray = [];
  for (let j = 0; j < pointTypes.length; j++) {
    for (let i = 0; i < maxPoints; i++) {
      rawArray[2 * j * maxPoints + i * 2] = points[j][i].x;
      rawArray[2 * j * maxPoints + i * 2 + 1] = points[j][i].y;
    }
  }
  return rawArray;
}

function getRawTypeColors() {
  let rawArray = [];
  for (let i = 0; i < pointTypes.length; i++) {
    rawArray[3 * i + 0] = red(pointTypes[i]) / 255.0;
    rawArray[3 * i + 1] = green(pointTypes[i]) / 255.0;
    rawArray[3 * i + 2] = blue(pointTypes[i]) / 255.0;
  }
  return rawArray;
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
