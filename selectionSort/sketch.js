let list = [4,5,1,2,7,4,8,4];
let front = 0;


function setup(){
  selectionSort(list);
}

function draw(){

}

function selectionSort(nums,front){
  let smallestNum;
  let smallLocation;
  let swapped = false;
  for (let i = 0; i < nums.length; i++){
    if (nums[i] < smallestNum){
      smallestNum = nums[i];
      smallLocation = i
      swapped = true;

    }
  }
  let swappedNum = nums[front];
  nums[front] = smallestNum;
  nums[smallLocation] = swappedNum;
  if (swapped){
  selectionSort(nums,front+1)
}
  return nums;

}
