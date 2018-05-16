
let p;
let numOfPoints = 2000;
function setup(){
  p = new Perceptron(3);
  for (let i = 0; i < numOfPoints; i++)
}

function draw(){

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
    this.learningConstant = 0.01;
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
