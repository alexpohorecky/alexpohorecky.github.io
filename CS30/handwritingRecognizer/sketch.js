/*
ALex Pohorecky
June 15,2018

Given the greyscale values of a 28x28 pixel image of a handwritten number,
the network will guess what number was written.

With the current number of training and test inputs, it takes approximately 6 minutes to "compile".

With the hyper-parameters I have currently set up (hidden layer size, learning constant, epochs, minibatch size),
the network has achieved a recorded success rate of around 11% (slightly better than the 10% probability of just randomly guessing a number).
I believe this poor success rate can be attributed to an error in creating when applying the changes to each weight gradient in the Network.applyMiniBatch() function.

Didn't have time to create a user interface that allows the user to input a single handwritten image by drawing it.
To test a single 784 alpha-value, use the mnist.js library to create inputs and put them through the feed-through function.

Numjs is the library I used for performing the linear algebra and other n-dimensional matrix operations.
Mnist is the library I used to create the training and testing data.

Resources Used:
"Neural Networks" Youtube Series by 3Blue1Brown
"Neural Networks and Deep Learning" by Michael Nielsen
*/

let netTrainingInputs = [];
let netTestingInputs = [];
let net;

function setup(){
  // Create the training and testing data sets.
  let mnistData = mnist.set(6000,4000);
  let trainingSet = mnistData.training;
  let testSet = mnistData.test;
  for (let i = 0; i < trainingSet.length; i++){
    netTrainingInputs.push([trainingSet[i].input, trainingSet[i].output])
  }
  for (let i = 0; i < testSet.length; i++){
    netTestingInputs.push([testSet[i].input, testSet[i].output])
  }

  // Create the network.
  net = new Network([784,30,10]);
  // "Train" the network using stochastic gradient descent.
  net.stochGradientDesc(netTrainingInputs, 30, 10, 3.0);
}
function draw(){

}

function sigmoidDerivative(x){
  // Derivative of the sigmoid function.
  return nj.sigmoid(x).multiply(nj.sigmoid(x).multiply(-1).add(1));
}

function matrixMultVectors(ndColumnVector,ndRowVector){
  //Receive two NDArray Vectors, and return the matrix product of them. (Because for some reason numjs can't do this.)
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
