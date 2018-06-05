/*
Date Created: May 29, 2018
First Crack At Back Propagation
Gonna Try solving the XOR problem
Time to see if I know what I'm doing...
Despacito
*/

function setup(){
  createCanvas(windowWidth, windowHeight);
  network = new Network([2,2,1]);
  network.addNodes();
  network.createWeights();
  network.feedForward(1,0);
}

function draw(){

}

function activate(x){
    return 1/(1+exp(-1*x));
}

class Network{
  constructor(_networkOutline){
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
  createWeights(){
    for (let layer = 0; layer < this.networkMatrix.length - 1; layer++){
      for (let node = 0; node < this.networkMatrix[layer].length; node++){
        for (let nextLayerNode = 0; nextLayerNode < this.networkMatrix[layer+1].length; nextLayerNode++){
          this.networkMatrix[layer][node].weights.push(random(-1,1));
        }
      }
    }
  }
  feedForward(a,b){
    this.networkMatrix[0][0].activation = activate(a+this.networkMatrix[0][0].bias);
    this.networkMatrix[0][1].activation = activate(b+this.networkMatrix[0][1].bias);

    for (let layer = 0; layer < this.networkMatrix.length - 1; layer++){
      for (let node = 0; node < this.networkMatrix[layer].length; node++){
        for (let nextLayerNode = 0; nextLayerNode < this.networkMatrix[layer+1].length; nextLayerNode++){
          this.networkMatrix[layer+1][nextLayerNode].activation += activate(this.networkMatrix[layer][node].activation * this.networkMatrix[layer][node].weights[nextLayerNode] + this.networkMatrix[layer+1][nextLayerNode].bias);

        }
      }
    }
  }
}

class Node{
  constructor(){
    this.weights = [];
    this.bias = random(-1,1);
    this.activation = 0;
  }

}
