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
    
  }
}

class Node{
  constructor(){
    this.weights = [];
    this.bias = random(-1,1);
    this.activation;
  }
}
