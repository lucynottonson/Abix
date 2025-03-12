let trees = [];
let time = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noiseSeed(random(1000));
    for (let i = 0; i < width; i += 60) {
        let h = noise(i * 0.01) * 150 + 100;
        trees.push(new Tree(i, height, h));
    }
}

let buttonCreated = false; 

function draw() {
    background(10, 10, 30);
    time += 0.01;

    let allGrown = true;

    for (let tree of trees) {
        tree.grow();
        tree.sway();
        tree.display();
        if (!tree.grown) {
            allGrown = false;
        }
    }

    if (allGrown && !buttonCreated) {
        createNextButton();
        buttonCreated = true;
    }   
}

function createNextButton() {
    let button = createButton('VERY GOOD');
    button.position(windowWidth / 2 - 50, windowHeight - 60);
    button.mousePressed(() => {
        window.location.href = 'PUT THE LINK HERE'; //PUT THE CORRECT LINK HERE
    });
}

class Tree {  
    constructor(x, y, h) {
        this.x = x;  
        this.y = y;
        this.h = h;
        this.baseH = h; 
        this.angle = 0;
        this.trunkWidth = noise(this.x * 0.1) * 6 + 5;
        this.maxHeight = height * 0.8; 
        this.grown = false; 
    }

    grow() {
        if (this.h < this.maxHeight) {
            this.h += noise(this.x * 0.01, time) * 0.5;
        } else {
            this.grown = true; 
        }
    }

    sway() {
        this.angle = noise(this.x * 0.2, time) * 0.1;
    }

    display() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);

        stroke (30, 140, 30);
        strokeWeight(this.trunkWidth);
        noFill();

        let xOffset = noise(this.x * 0.2, time) * 10 - 5;

        beginShape();
        for (let i = 0; i <= this.h; i += 5) {
            let xJitter = noise(this.x * 0.05, i * 0.02, time) * 20-5;
            vertex(xOffset + xJitter, -i);
        }
        endShape();

        noStroke();
        this.drawFlower(0, -this.h, 20 + noise(this.x * 0.02, time) * 10, 6);

        pop();
    }

    drawFlower(x, y, r, petals) {
        push();
        translate(x, y);

        noStroke();
        fill(255, 105, 180); 
        for (let i = 0; i < TWO_PI; i += TWO_PI / petals) {
            let px = cos(i) * r;
            let py = sin(i) * r;
            ellipse(px, py, r, r * 1);
        }

        fill(255, 204, 0);
        ellipse(0, 0, r * 0.9, r * 0.9);

        pop();
    }
}