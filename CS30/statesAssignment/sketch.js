let ship;
function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship(100, 100, 1, 0, 0, 0);
}

function draw() {
  background(255);
  ship.move();
  ship.animate();
}
