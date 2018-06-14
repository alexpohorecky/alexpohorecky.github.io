/*
ALex Pohorecky

Given the alpha values of a 28x28 pixel image of a handwritten number,
the network will guess what number was written.
*/
let inputs = [];
let net;
function setup(){
  for (let i = 0; i < 784; i++){
    inputs.push(random(0,1));
  }
  net = new Network([784,15,10]);
}
function draw(){

}


class Network{
  constructor(layerSizeArray){
    this.numOfLayers = layerSizeArray.length;
    this.layerSizes = layerSizeArray;
    this.biases = [];
    this.weights = [];
    // Initializes the biases and weights in the network using a Standard Normal Distribution.
    for (let layer = 1; layer < this.numOfLayers; layer++){
      let layerBiases = [];
      for(let node = 0; node < this.layerSizes[layer]; node++){
        layerBiases.push(randomGaussian());
      }
      this.biases.push(nj.array(layerBiases));
    }
    for (let layer = 0; layer < this.numOfLayers-1; layer++){
      let layerWeights = [];
      for (let node = 0; node < this.layerSizes[layer]; node++){
        let nodeWeights = [];
        for(let weightsInNode = 0; weightsInNode < this.layerSizes[layer+1]; weightsInNode++){
          nodeWeights.push(randomGaussian());
        }
        layerWeights.push(nodeWeights);
      }
      this.weights.push(nj.array(layerWeights));
    }

  }

  feedforward(inputs){
    let a = nj.array(inputs);
    for (let layer = 0; layer < this.numOfLayers-1; layer++){
      a = nj.sigmoid(nj.dot(this.weights[layer].T, a).add(this.biases[layer],false));
    }
    return a;
  }
}
