let bubble;
function setup(){
  createCanvas(windowWidth, windowHeight);
  bubble = new Bubble(width/2, height, 50, 50);
}

function draw(){
  background(255);
  bubble.move();
  bubble.showBubble();
}

class Timer{
  constructor(milliSeconds){
    this.startTime;
    this.timerStarted = false;
    this.waitTime = milliSeconds;
    this.isDone = false;
    this.finishTime = this.startTime + this.waitTime;
  }
  timerStart(){
    this.startTime = millis();
    this.timerStarted = true;
  }
  reset(milliSeconds){
    this.startTime = millis();
    this.waitTime = milliSeconds;
    this.isDone = false;
    this.finishTime = this.startTime + this.waitTime;
  }
  timerDone(){
    if (millis() >= this.finishTime){
      return true;
    }
    else{
      return false;
    }
  }
}

class Bubble{
  constructor(_x,_y,_r, d){
    //this.wobbleDisplacement = d;
    this.x = _x;
    this.y = _y;
    this.r = _r;
    //this.xSpeed = 10;
    this.ySpeed = -10;
    //this.wobblePlace = this.x + this.wobbleDisplacement;
    this.bubbleTimer = new Timer(1000);

  }
  move(){
    //this.x += this.xSpeed;
    this.y += this.ySpeed;
    // if (this.x === this.wobblePlace){
    //   this.xSpeed *= -1;
    //   this.wobbleDisplacement *= -1;
    //   this.wobblePlace += 2 * this.wobbleDisplacement;
    // }
    if (this.y <= this.r){
      this.y = this.r;
      this.ySpeed = 0;
      if (!bubbleTimer.timerStarted){
        this.bubbleTimer.timerStart();
      }

    }
  }
  clicked(){

  }
  showBubble(){
    if (!this.bubbleTimer.timerDone()){
      ellipse(this.x,this.y,this.r);
    }

  }
}
