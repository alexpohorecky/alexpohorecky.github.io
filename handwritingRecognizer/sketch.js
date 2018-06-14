/*
ALex Pohorecky

Given the greyscale values of a 28x28 pixel image of a handwritten number,
the network will guess what number was written.

Resources Used:
"Neural Networks" Youtube Series by 3Blue1Brown
"Neural Networks and Deep Learning" by Michael Nielsen
*/
let inputs = [];
let net;
function setup(){
  for (let i = 0; i < 784; i++){
    inputs.push(random(0,1));
  }
  net = new Network([1,2,1]);
}
function draw(){

}

function sigmoidDerivative(x){
  return nj.sigmoid(x).multiply(nj.sigmoid(x).multiply(-1).add(1));
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
    // Feed the inputs through the network and return the activations of the output layer
    let a = nj.array(inputs);
    for (let layer = 0; layer < this.numOfLayers-1; layer++){
      a = nj.sigmoid(nj.dot(this.weights[layer].T, a).add(this.biases[layer],false));
    }
    return a;
  }

  costDerivative(outputs, answer){
    return (outputs.subtract(answer));
  }

  backpropagate(inputs, answer){
    let deltaWeightGradient = [];
    let deltaBiasGradient = [];
    for (let layer = 0; layer < this.numOfLayers; layer++){
      weightGradient.push(nj.zeros(this.weights[layer].shape));
      biasGradient.push(nj.zeros(this.biases[layer].shape));
    }

    // Feeding forward, except the activations and weighted sums are kept track of for the purpose of backpropagation.
    let activation = inputs;
    let activations = [inputs];
    let weightedSums = [];
    for (let layer = 0; layer < this.numOfLayers-1; layer++){
      let weightedSum = nj.dot(this.weights[layer].T, activation).add(this.baises[layer],false);
      weightedSums.push(weightedSum);
      activation = nj.sigmoid(weightedSum);
      activations.push(activation);
    }
    // Determine the error in the output layer.
    let error = costDerivative(activations[activations.length-1], answer).multiply(sigmoidDerivative(weightedSums[weightedSums.length-1]));

    deltaBiasGradient[deltaBiasGradient.length-1] = error;
    deltaWeightGradient[deltaWeightGradient.length-1] = nj.dot(error, activations[activations.length-2].T);

    //Propagate the error back through the layers.
    for (let layer = this.numOfLayers-2; layer > 0; layer--){
      let weightedSum = weightedSums[layer];
      error = nj.dot(this.weights[layer+1].T, error).multiply(sigmoidDerivative(weightedSum));
      deltaBiasGradient[layer] = error;
      deltaWeightGradient[layer] = nj.dot(error, activations[layer-1].T);
    }
    return [deltaWeightGradient, deltaBiasGradient];
  }

  applyMiniBatch(miniBatch, learningRate){
    // Apply each test data in a mini-batch through the network, tweaking the weights and biases.
    let weightGradient = [];
    let biasGradient = [];
    for (let layer = 0; layer < this.numOfLayers; layer++){
      weightGradient.push(nj.zeros(this.weights[layer].shape));
      biasGradient.push(nj.zeros(this.biases[layer].shape));
    }

    for (let test of miniBatch){
      let inputs = test[0];
      let answer = test[1];
      let deltaGradients = backpropagate(inputs, answer);
      let deltaWeightGradient = deltaGradients[0];
      let deltaBiasGradient = deltaGradients[1];
      for (let layer = 0; layer < this.numOfLayers; layer++){
        weightGradient[layer] = weightGradient[layer].add(backpropagate(test[0],test[1])[0]);
        biasGradient[layer] = biasGradient[layer].add(backpropagate())
      }
    }
  }


}
