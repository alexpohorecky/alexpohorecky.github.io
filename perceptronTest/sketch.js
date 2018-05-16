

function setup(){

}

function draw(){

}

class Perceptron {
  constructor(numOfWeights){
    this.weights = [];
    this.c = 0.01;
    for (let i = 0; i < numOfWeights; i++){
      this.weights.push(random(-1,1));
    }

  }
  this.feedForward(inputs){
    this.sum = 0;
    for (let i = 0; i < inputs.length; i++){
      this.sum += inputs[i]*this.weights[i];

    }
    return this.activate(this.sum);

  }
  this.activate(sum){
    return sum/abs(sum);
  }

  this.train(inputs, answer){
    this.guess = feedForward(inputs);
    this.error = answer - this.guess;

    for (let i = 0; i < numOfWeights; i++){
      weights[i]+= c * error * inputs[i];
    }
  }
}

class Trainer {
  constructor(x, y, a){
    this.inputs = [x,y,1];
    this.answer = a;
  }

  this.f(x){
    return 2*x+1
  }
}
