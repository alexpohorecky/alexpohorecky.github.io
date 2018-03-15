class Artillery {
  constructor(_team, _size, _ammo, _location, dmg, hp){
    this.team = _team;
    this.size = _size;
    this.ammo = _ammo;
    this.location = _location;
    this.damage = dmg;
    this.health = hp;
    this.alive = true;
    this.aimLocation;
    this.aimDirection;

  }
  fire(){
    new Bullet(this.aimLocation, this.aimDirection, this.damage);
    this.ammo -= 1;
  }

  aim(){}

  build(){}

  die(){}

  receiveDamage(){}


}
