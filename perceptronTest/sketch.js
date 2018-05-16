

function setup(){

}

function draw(){

}

class Perceptron {
  constructor(numOfWeights, bias){
    this.weights = [];
    for (let i = 0; i < numOfWeights; i++){
      this.weights.push(random(-1,1));
    }

  }
  this.feedForward(inputs){
    this.sum = 0;
    for (let i = 0; i < inputs.length; i++){
      this.sum += inputs[i]*this.weights[i];

    }

  }
}

class Trainer {
  constructor(points, answers){

  }
}
