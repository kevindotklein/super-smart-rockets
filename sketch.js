var population;
var count;
var target;
var gen;

function setup() {
  (isMobileDevice()) ? createCanvas(windowWidth, windowHeight) : createCanvas(675, 600);
  pixelDensity(1);
  population = new Population();
  count = 0;
  target = createVector(width / 2, 80);
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

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
