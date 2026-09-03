var lifespan = 300;

class DNA {
  constructor(genes) {
    if (genes) {
      this.genes = genes;
    } else {
      this.genes = [];
      for (let i = 0; i < lifespan; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(0.2);
      }
    }
  }

  crossover(partner) {
    let child = [];
    let mid = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      (i < mid) ? child[i] = this.genes[i] : child[i] = partner.genes[i];
    }
    return new DNA(child);
  }
}
