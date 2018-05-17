
let p;
let numOfPoints = 20000;
let training = [];
let lastTime;
let waitTime = 1;
function setup(){
  createCanvas(windowWidth, windowHeight);
  p = new Perceptron(3);
  for (let i = 0; i < numOfPoints; i++){
    let x = random(-width/2, width/2);
    let y = random(-height/2, height/2);
    let a = findAnswer(f(x),y);
    training.push(new Trainer(x, y, a));
  }
  //lastTime = millis();
}

function draw(){
  background(255);
  translate(width/2, height/2);
  for (let x = -width/2; x < width/2; x++){
    stroke(255,0,0);
    point(x,f(x));
  }
  for(let trainer of training){
    //if (millis() - lastTime >= waitTime){
      stroke(0);
      p.train(trainer.inputs, trainer.answer);
      let guess = p.throughput(trainer.inputs);
      if (guess > 0){
        noFill();
      }
      else{
        fill(0);
      }
      ellipse(trainer.inputs[0], trainer.inputs[1], 10);
      //lastTime = millis();
    //}
  }
}

function f(x){
  return 2*x+1;
}
function findAnswer(line, yCoord){
  if (yCoord < line){
    return -1;
  }
  else{
    return 1;
  }
}
class Perceptron{
  constructor(numOfWeights){
    this.n = numOfWeights;
    this.weights = [];
    this.learningConstant = 0.00000010;
    for (let i = 0; i < this.n; i++){
      this.weights.push(random(-1,1));
    }

  }
  throughput(inputs){
    this.sum = 0
    for (let i = 0; i < this.n; i++){
      this.sum += inputs[i] * this.weights[i];
    }
    return this.activate(this.sum);
  }

  activate(sum){
    return sum/abs(sum);
  }

  train(input, answer){
    this.attempt = this.throughput(input);
    this.error = answer - this.attempt;
    for (let i = 0; i < this.n; i++){
      this.weights[i] += this.learningConstant * this.error * input[i];
    }
  }
}

class Trainer{
  constructor(x,y,a){
    this.inputs = [x,y,1];
    this.answer = a;

  }
}
