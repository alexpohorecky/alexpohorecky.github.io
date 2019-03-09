class Peg{
  constructor(_x,_y,_r){
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.hit = false;
  }

  show(){
    if (this.hit){
      fill("Green");
    }
    else{
      fill("Red");
    }
    noStroke();
    ellipse(this.x, this.y, this.r);
  }
}
