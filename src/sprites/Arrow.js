import Phaser from 'phaser'

export default class extends Phaser.Sprite {

    constructor (game, x, y, scale, color, rotateSpeed) {

        let points = [	3.5, 10,
                        3.5, -1, 
                        8, -1,
                        0, -8,
                        -8, -1,
                        -3.5, -1,
                        -3.5, 8,
                        3.5, 8];
        points = points.map((x) => { return x * scale; }); // Scale

        let graphics = new Phaser.Graphics(game, {x: -400, y: -300});
		
        graphics.beginFill(color);
        graphics.drawPolygon(points);
        graphics.endFill();
        let texture = graphics.generateTexture();

        super(game, x, y, texture);
		this.mass = 40;
        this.rotateSpeed = rotateSpeed;
        this.anchor.setTo(0.5);
    }

    update () {
		
      this.angle += this.rotateSpeed;
    }
}
