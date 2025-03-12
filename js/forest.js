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
        this.trunkWidth = noise(this.x * 0.1) * 9 + 5;
    }

    grow() {
        this.h += noise(this.x * 0.01, time) * 0.2; 
    }

    sway() {
        this.angle = noise(this.x * 0.2, time) * 0.1;
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);

        stroke(100, 50, 0);
        strokeWeight(this.trunkWidth);
        noFill();

        let xOffset = noise(this.x * 0.2, time) * 10 - 5;

        beginShape();
        for (let i = 0; i <= this.h; i += 5) {
            let xJitter = noise(this.x * 0.05, i * 0.02, time) * 20-5;
            vertex(xOffset + xJitter, -i);
        }
        endShape();

        fill(200, 50, 100); 
        noStroke();
        this.drawFlower(0, -this.h, 20 + noise(this.x * 0.02, time) * 10, 6);

        pop();
    }

    drawFlower(x, y, r, petals) {
        push();
        translate(x, y);
        for (let i = 0; i < TWO_PI; i += TWO_PI / petals) {
            let px = cos(i) * r;
            let py = sin(i) * r;
            ellipse(px, py, r, r * 1.5);
        }
        pop();
    }
}