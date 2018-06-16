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
    // Feed the inputs through the network and return the network's guess as to what number was inputted.
    let a = nj.array(inputs);
    for (let layer = 0; layer < this.numOfLayers-1; layer++){
      a = nj.sigmoid(nj.dot(this.weights[layer].T, a).add(this.biases[layer],false));
    }
    let highestOutput = 0;
    let highestIndex;
    for (let node = 0; node < a.tolist().length; node++){
      if (a.tolist()[node] > highestOutput){
        highestOutput = a.tolist()[node];
        highestIndex = node;
      }
    }
    return highestIndex;
  }

  costDerivative(outputs, answer){
    // Determine the rate of change of the quadratic cost function.
    return (outputs.subtract(answer));
  }

  backpropagate(inputs, answer){
    // Given a set of inputs and the corresponding output activations, determine the error, backpropagate it, and determine the amount to change
    // each weight and bias.
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
    let numOfTests = testData.length;
    let numOfSuccesses = 0;
    for (let test of testData){
      let testOutput = test[1];
      let highestOutput = 0;
      let highestIndex;
      for (let node = 0; node < testOutput.length; node++){
        if (testOutput[node] > highestOutput){
          highestOutput = testOutput[node];
          highestIndex = node;
        }
      }
      let testResult = this.feedforward(test[0]);
      if (testResult === highestIndex){
        numOfSuccesses++
      }
     }
     return numOfSuccesses/numOfTests;

  }


}
