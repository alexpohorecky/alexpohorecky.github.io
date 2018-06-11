/*
Date Created: May 29, 2018
First Crack At Back Propagation
Gonna Try solving the XOR problem
Time to see if I know what I'm doing...
*/
let examples = [[1,0]];
function setup(){
  createCanvas(windowWidth, windowHeight);
  trainer = new Trainer(examples);
  network = new Network([2,2,1], trainer.answers);
  network.addNodes();
  network.generateWeights();
  network.feedForward(examples[0][0],examples[0][1]);
}

function draw(){

}

function sigmoid(x){
    return 1/(1+exp(-1*x));
}

function dSigmoid(x){
  return sigmoid(x)*(1-sigmoid(x));
}

function cost(outputActivation, answer){
  return 0.5*sq(answer - outputActivation);
}

function outputError(outputActivation, answer, weightedSum){
  return((answer-outputActivation)*dSigmoid(weightedSum));
}




}
class Trainer{
  constructor(examples){
    this.answers = [];
    for (let example of examples){
      if (example[0] && !example[1] || !example[0] && example[1]){
        this.answers.push(1);
      }
      else{
        this.answers.push(0);
      }
    }
  }
}
class Network{
  constructor(_networkOutline, answers){
    this.networkOutline = _networkOutline;
    this.networkMatrix = [];

  }
  addNodes(){
    for (let  nodesInLayer of this.networkOutline){
      let layer = [];
      for (let i = 0; i < nodesInLayer; i++){
        layer.push(new Node());
      }
      this.networkMatrix.push(layer)
    }
  }
  generateWeights(){
    for (let layer = 0; layer < this.networkOutline.length; layer++){
      for (let node = 0; node < this.networkOutline[layer]; node++){
        for (let nextLayerNode = 0; nextLayerNode < this.networkOutline[layer+1]; nextLayerNode++){
          this.networkMatrix[layer+1][nextLayerNode].weights.push(random(-1,1));
        }
      }
    }
  }

  feedForward(a,b){
    this.networkMatrix[0][0].activation = sigmoid(a+this.networkMatrix[0][0].bias);
    this.networkMatrix[0][1].activation = sigmoid(b+this.networkMatrix[0][1].bias);


    for (let layer = 1; layer < this.networkMatrix.length; layer++){
      for (let node = 0; node < this.networkMatrix[layer].length; node++){
        for (let previousLayerNode = 0; previousLayerNode < this.networkMatrix[layer-1].length; previousLayerNode++){
          this.networkMatrix[layer][node].weightedSum += this.networkMatrix[layer-1][previousLayerNode].activation * this.networkMatrix[layer][node].weights[previousLayerNode];

        }
        this.networkMatrix[layer][node].activation = sigmoid(this.networkMatrix[layer][node].weightedSum + this.networkMatrix[layer][node].bias);
      }
    }
  }



  shiftBackError(){
    this.networkMatrix[this.networkMatrix.length-1][0].error = outputError(this.networkMatrix[this.networkMatrix.length-1][0].activation, answers[0], this.networkMatrix[this.networkMatrix.length-1][0].weightedSum);
    let weightMatrix = [];
    let errorVector = [];
    let weightedSumVector = [];
    for (let node = 0; node < this.networkMatrix[layerIndex+1].length; node++){
      let nodeWeights = [];
      for (let weight = 0; weight < this.networkMatrix[layerIndex+1][node].weights.length; weight++){
        nodeWeights.push(this.networkMatrix[layerIndex+1][node].weights[weight]);
      }
      weightMatrix.push(nodeWeights);
    }

  }


}

class Node{
  constructor(/*numOfInputs*/){
    this.weights = [];
    this.weightedSum = 0;
    // for (let i = 0; i < numOfInputs; i++){
    //   this.weights.push(random(-1,1));
    // }
    this.bias = random(-1,1);
    this.activation = 0;

    this.error;

  }

}
