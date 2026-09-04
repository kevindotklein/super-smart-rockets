const CANVAS_W = 675;
const CANVAS_H = 600;

var population;
var count;
var target;
var gen;

function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  pixelDensity(1);
  handleScale();
  population = new Population();
  count = 0;
  target = createVector(CANVAS_W / 2, 80);
  gen = 0;
}

function draw() {
  background(0);
  population.run();
  if (count >= lifespan) {
    population.evaluate();
    population.selection();
    gen++;
    count = 0;
  }


  // target
  ellipse(target.x, target.y, 18, 18);

  // lifespan
  textSize(16);
  textAlign(LEFT, TOP);
  fill(255);
  noStroke();
  text(`lifespan (${lifespan} max): ${count}`, 20, 20);
  count++;

  // gen
  text(`gen: ${gen}`, 20, 50);

  // max fit
  text(`max fit: ${maxFit || 0}`, 20, 80);

}

function handleScale() {
  let scale = Math.min(
    windowWidth / CANVAS_W,
    windowHeight / CANVAS_H,
    1
  );

  let canvasEl = document.querySelector('canvas');
  canvasEl.style.transformOrigin = 'top left';
  canvasEl.style.transform = `scale(${scale})`;

  canvasEl.style.position = 'absolute';
  canvasEl.style.left = `${(windowWidth - CANVAS_W * scale) / 2}px`;
  canvasEl.style.top = `${(windowHeight - CANVAS_H * scale) / 2}px`;
}
