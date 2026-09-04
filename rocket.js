var maxFit;

class Rocket {
  constructor(dna) {
    this.pos = createVector(CANVAS_W/2, CANVAS_H-30);
    this.vel = createVector();
    this.acc = createVector();
    this.dna = dna || new DNA();
    this.fitness = 0;
    this.completed = false;
  }

  // if m = 1
  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    // reach the target
    if (d < 10) {
      this.completed = true;
      this.pos = target.copy();
    }

    this.applyForce(this.dna.genes[count]);

    if (!this.completed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
    }

    this.acc.mult(0);
  }

  show() {
    push();
    noStroke();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());

    rectMode(CENTER);
    rect(0, 0, 37, 7);
    pop();
  }

  calcFitness() {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    // set width as max fitness
    this.fitness = map(d, 0, width, width, 0);
    if (this.completed) { this.fitness *= 10; }
  }

}

class Population {
  constructor() {
    this.rockets = [];
    this.size = 25;
    this.matingPool = [];

    for (let i = 0; i < this.size; i++) {
      this.rockets[i] = new Rocket();
    }
  }

  run() {
    for (let i = 0; i < this.size; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }

  evaluate() {
    maxFit = 0;
    for (let i = 0; i < this.size; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxFit) {
        maxFit = this.rockets[i].fitness;
      }
    }

    // norm fitness (0..=1)
    for (let i = 0; i < this.size; i++) {
      this.rockets[i].fitness /= maxFit;
    }
    this.matingPool = [];

    for (let i = 0; i < this.size; i++) {
      let n = this.rockets[i].fitness * 100;
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    }
  }

  selection() {
    let newRockets = [];
    for (let i = 0; i < this.rockets.length; i++) {
      let parentA = random(this.matingPool).dna;
      let parentB = random(this.matingPool).dna;
      let child = parentA.crossover(parentB);
      newRockets[i] = new Rocket(child);
    }
    this.rockets = newRockets;
  }
}
