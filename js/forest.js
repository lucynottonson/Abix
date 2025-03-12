let trees = [];
let time = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noiseSeed(random(1000));
    for (let i = 0; i < width; i += 30) {
        let h = noise(i * 0.01) * 150 + 100;
        trees.push(new Tree(i, height, h));
    }
}

function draw() {
    background(10, 10, 30);
    time += 0.01;
    for (let tree of trees) {
        tree.grow();
        tree.sway();
        tree.display();
    }
}

class Tree {  
    constructor(x, y, h) {
        this.x = x;  
        this.y = y;
        this.h = h;
        this.baseH = h; 
        this.angle = 0;
    }

    grow() {
        this.h = this.baseH + noise(this.x * 0.01, time) * 20;
    }

    sway() {
        this.angle = noise(this.x * 0.01, time) * 0.1;
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);

        // Trunk
        stroke(100, 50, 0);
        strokeWeight(4);
        line(0, 0, 0, -this.h);

        // Leaves
        fill(30, 100 + noise(this.x * 0.2, time) * 100, 30);
        noStroke();
        ellipse(0, -this.h, 40, 40 + noise(this.x * 0.02, time) * 20);

        pop();
    }
}