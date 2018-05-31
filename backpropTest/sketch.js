/*
Date Created: May 29, 2018
First Crack At Back Propagation
Gonna Try solving the XOR problem
Time to see if I know what I'm doing...
*/

function setup(){
  createCanvas(windowWidth, windowHeight);
  network = new Network([2,2,1]);
  network.addNodes();
  network.createWeights();
}

function draw(){

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
    
  }
}

class Node{
  constructor(){
    this.weights = [];
    this.bias = random(-1,1);
    this.activation;
  }
}
