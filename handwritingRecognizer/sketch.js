/*
ALex Pohorecky

Given the greyscale values of a 28x28 pixel image of a handwritten number,
the network will guess what number was written.

Resources Used:
"Neural Networks" Youtube Series by 3Blue1Brown
"Neural Networks and Deep Learning" by Michael Nielsen
*/

let net;
function setup(){
  net = new Network([784,30,10]);
  net.stochGradientDesc(inputs, 10, 10, 3)
}
function draw(){

}

function retrievePixelValues(){
  let dataFileBuffer  = fs.readFileSync('train-images-idx3-ubyte');
  let labelFileBuffer = fs.readFileSync('train-labels-idx1-ubyte');
  let pixelValues     = [];

  // It would be nice with a checker instead of a hard coded 60000 limit here
  for (let image = 0; image <= 59999; image++) {
    let pixels = [];

    for (let y = 0; y <= 27; y++) {
        for (let x = 0; x <= 27; x++) {
            pixels.push(dataFileBuffer[(image * 28 * 28) + (x + (y * 28)) + 16]);
        }
    }

    let imageData  = {};
    imageData[JSON.stringify(labelFileBuffer[image + 8])] = pixels;

    pixelValues.push(imageData);
  }
  return pixelValues;
}

function sigmoidDerivative(x){
  return nj.sigmoid(x).multiply(nj.sigmoid(x).multiply(-1).add(1));
}

function matrixMultVectors(ndColumnVector,ndRowVector){
  //Receive to NDArray Vectors, and return the matrix product of them.
  let matrixProduct = [];
  let columnVector = ndColumnVector.tolist();
  let rowVector = ndRowVector.tolist();
  for (let columnElement of columnVector){
    let row = [];
    for (let rowElement of rowVector){
      row.push(columnElement*rowElement);
    }
    matrixProduct.push(row);
  }
  return nj.array(matrixProduct);
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
    let highestOutput = 0;
    for (let node = 0; node < a.tolist().length; node++){
      if (a.tolist()[node] > highestOutput){
        highestOutput = a.tolist()[node];
      }
    }
    return highestOutput;
  }

  costDerivative(outputs, answer){
    return (outputs.subtract(answer));
  }

  backpropagate(inputs, answer){
    let deltaWeightGradient = [];
    let deltaBiasGradient = [];
    for (let layer = 0; layer < this.numOfLayers-1; layer++){
      deltaWeightGradient.push(nj.zeros(this.weights[layer].shape));
      deltaBiasGradient.push(nj.zeros(this.biases[layer].shape));
    }


    // Feeding forward, except the activations and weighted sums are kept track of for the purpose of backpropagation.
    let activation = inputs;
    let activations = [inputs];
    let weightedSums = [];
    for (let layer = 0; layer < this.numOfLayers-1; layer++){
      let weightedSum = nj.dot(this.weights[layer].T, activation).add(this.biases[layer],false);
      weightedSums.push(weightedSum);
      activation = nj.sigmoid(weightedSum);
      activations.push(activation);
    }
    // Determine the error in the output layer.
    let error = this.costDerivative(activations[activations.length-1], answer).multiply(sigmoidDerivative(weightedSums[weightedSums.length-1]));

    deltaBiasGradient[deltaBiasGradient.length-1] = error;
    deltaWeightGradient[deltaWeightGradient.length-1] = matrixMultVectors(error, activations[activations.length-2]);


    //Propagate the error back through the layers.
    for (let layer = this.numOfLayers-2; layer = 0; layer--){
      let weightedSum = weightedSums[layer];
      error = nj.dot(this.weights[layer+1].T, error).multiply(sigmoidDerivative(weightedSum));
      deltaBiasGradient[layer] = error;
      deltaWeightGradient[layer] = matrixMultVectors(error, activations[layer-1]);
    }
    return [deltaWeightGradient, deltaBiasGradient];
  }

  applyMiniBatch(miniBatch, learningRate){
    // Apply each test data in a mini-batch through the network, tweaking the weights and biases.
    let weightGradient = [];
    let biasGradient = [];
    for (let layer = 0; layer < this.weights.length; layer++){
      //console.log(this.weights[layer].shape);
      weightGradient.push(nj.zeros(this.weights[layer].shape));
    }
    for (let layer = 0; layer < this.biases.length; layer++){
      biasGradient.push(nj.zeros(this.biases[layer].shape));
    }

    for (let test of miniBatch){
      let inputs = test[0];
      let answer = test[1];
      let deltaGradients = this.backpropagate(inputs, answer);
      let deltaWeightGradient = deltaGradients[0];
      let deltaBiasGradient = deltaGradients[1];
      // Update the gradients.
      for (let layer = 0; layer < weightGradient.length; layer++){
        // Bodge fix for adding two arrays of different shape... keep eye on it...
        weightGradient[layer] = weightGradient[layer].add(deltaWeightGradient[layer].reshape(weightGradient[layer].shape));
      }
      for (let layer = 0; layer < biasGradient.length; layer++){
        biasGradient[layer] = biasGradient[layer].add(deltaBiasGradient[layer]);
      }
      // Update the weights and biases.
      for (let layer = 0; layer < this.weights.length; layer++){
        this.weights[layer] = this.weights[layer].subtract(weightGradient[layer].multiply(learningRate/miniBatch.length));
      }
      for (let layer = 0; layer < this.biases.length; layer++){
        this.biases[layer] = this.biases[layer].subtract(biasGradient[layer].multiply(learningRate/miniBatch.length));
      }
    }
  }

  stochGradientDesc(_trainingData, numOfEpochs, miniBatchSize, learningConstant){
    // Use stochastic gradient descent to train the network.
    let numOfExamples = _trainingData.length;
    let trainingData = _trainingData
    for (let epoch = 0; epoch < numOfEpochs; epoch++){
      trainingData = shuffle(trainingData);
      let miniBatches = [];
      // Create mini-batches.
      for (let i = 0; i < numOfExamples/miniBatchSize; i++){
        miniBatches.push(trainingData.slice(i,i+miniBatchSize));
      }
      for (let miniBatch of miniBatches){
        this.applyMiniBatch(miniBatch, learningConstant);
      }
    }
  }

  evaluate(testData){
    // Feeds test data through network and returns how many it guessed correctly.

  }


}
