import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor (game, x, y, asset) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
	this.counter = 0;

  }
	
 update () {
    this.counter += 1;
	if(this.counter>=100){
	   	this.destroy();
	   }
  }
}
