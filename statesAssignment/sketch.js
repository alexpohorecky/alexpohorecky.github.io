// Alex Pohorecky
// Monday, February 26, 2018
// Computer Science 30, Period 5
// Bouncing Balls Simulator
// Extra For Experts:
// I used a random function to generate randomly colored balls.
// I used the class-type to create the ball object, which wasn't taught in class.

let balls = [];
let elasticity = 3;
let friction = 0.01;
let horizontalVelocity = 0;
let verticalVelocity = 0;
let gravity = 0.98;
let menuState = false;

function setup() {

  createCanvas(windowWidth, windowHeight);
}

function draw() {
