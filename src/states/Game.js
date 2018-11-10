/* globals __DEV__ */
import Phaser from 'phaser'
import Arrow from '../sprites/Arrow'

import Constants from '../constants.js'

export default class extends Phaser.State {
  init() { }
    preload() {
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
      
      this.arrowBlue = new Arrow(this.game, 
                                 Constants.ARROW_STARTING_POSITION_X,
                                 this.world.centerY,
                                 3, 
                                 Constants.ARROW_BLUE_COLOR, 
                                 Constants.ARROW_ROTATE_SPEED);
      this.game.add.existing(this.arrowBlue);

      this.arrowRed = new Arrow(this.game, 
                                this.world.width - Constants.ARROW_STARTING_POSITION_X,
                                this.world.centerY,
                                3, 
                                Constants.ARROW_RED_COLOR, 
                                Constants.ARROW_ROTATE_SPEED);
      this.game.add.existing(this.arrowRed);
  }

  render() {
  }
}
