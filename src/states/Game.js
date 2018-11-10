/* globals __DEV__ */
import Phaser from 'phaser'
import Arrow from '../sprites/Arrow'
import lang from '../lang'

export default class extends Phaser.State {
  init() { }
    preload() {
        let points = [-10, 3.5,
                      1, 3.5, 
                      1, 8,
                      8, 0,
                      1, -8,
                      1, -3.5,
                      -8, -3.5,
                      -8, 3.5];

        // make arrow bigger
        points = points.map((x) => {

            return x * 3;
        });

        let arrowBluePoly = new Phaser.Polygon(points);
        let arrowBlueGraphics = new Phaser.Graphics(game, {x: -400, y: -300});
        arrowBlueGraphics.beginFill(0xFF38ff);
        arrowBlueGraphics.drawPolygon(points);
        arrowBlueGraphics.endFill();
        this.textured = arrowBlueGraphics.generateTexture();

        // Draw circle
        var graphics = game.add.graphics(game.world.centerX, game.world.centerY);
        game.stage.backgroundColor = "#CBCEC6";

        //  Our first arc will be a line only
        graphics.lineStyle(1, 0x353EC4);
        graphics.beginFill(0x353EC4);

        // graphics.arc(0, 0, 135, game.math.degToRad(0), game.math.degToRad(90), false);
        graphics.arc(0, 0, 180, Math.PI/2, 3/2*Math.PI, false);

        //  As we wish to draw a 2nd arc on the SAME Graphics object, we need to move the drawing operation
        // graphics.moveTo(-100, -100);

        //  This will reset the lineStyle
        graphics.lineStyle(1,0xFF3300);

        //  And this draws a filled arc
        graphics.beginFill(0xFF3300);

        //  Note the 'true' at the end, this tells it to draw anticlockwise
        graphics.arc(0, 0, 180, 3/2*Math.PI, Math.PI/2, false);
        graphics.endFill();
    }

  create() {
      
      this.arrowBlue = new Arrow(this.game, this.world.centerX, this.world.centerY, this.textured);
      this.game.add.existing(this.arrowBlue);
  }

  render() {
  }
}
