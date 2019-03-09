let list = [];
let listLen = 10;

function setup(){
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < listLen; i++){
    list.push(random(0,255));
  }
}

function draw(){
  for (let i = 0; i < listLen; i++){
    fill(list[i]);
    ellipse(width/listLen * i + width/listLen/2 , height/2, width/listLen);
  }

}

function bubbleSort(nums){
  let swapped = false;
  for (let i = 0; i < nums.length-1; i++){

    if (nums[i] > nums[i+1]){
      let largerNum = nums[i];
      nums[i] = nums[i+1];
      nums[i+1] = largerNum;
      swapped = true;
    }
  }
  if (swapped){
    bubbleSort(nums);
  }

  return nums;


}
function keyPressed(){
  if(keyCode === 32){
    bubbleSort(list);
  }
  if(keyCode === 27){
    list = [];
    for (let i = 0; i < listLen; i++){
        list.push(random(0,255));
      }
  }
}
