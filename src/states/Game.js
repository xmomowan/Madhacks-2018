/* globals __DEV__ */
import Phaser from 'phaser'
import Arrow from '../sprites/Arrow'
import Box from '../sprites/Box'
import CapturePoint from '../sprites/CapturePoint.js'

import Constants from '../constants.js'

export default class extends Phaser.State {
    init() { }
    preload() {

        game.load.image('box', 'assets/images/box.jpg');
    }

  create() {


      let centerX = this.world.centerX;
      let centerY = this.world.centerY;
      this.capturePoint = new CapturePoint(this.game, centerX, centerY, 130);
      this.game.add.existing(this.capturePoint);

      this.arrowBlue = new Arrow(this.game, 
                                 Constants.ARROW_STARTING_POSITION_X,
                                 centerY,
                                 3, 
                                 Constants.ARROW_BLUE_COLOR, 
                                 Constants.ARROW_ROTATE_SPEED);
      
      this.game.add.existing(this.arrowBlue);

      this.arrowRed = new Arrow(this.game, 
                                this.world.width - Constants.ARROW_STARTING_POSITION_X,
                                centerY,
                                3, 
                                Constants.ARROW_RED_COLOR, 
                                Constants.ARROW_ROTATE_SPEED);
      
      this.game.add.existing(this.arrowRed);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 0.8;
        game.physics.p2.enable(this.arrowRed, false);
        game.physics.p2.enable(this.arrowBlue, false);

    this.game.physics.arcade.enable([this.arrowBlue, this.arrowRed, this.capturePoint], false);
    this.capturePoint.recalculateBody();
  }
    
    update(){


        if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.arrowBlue.body.rotateLeft(100);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
            this.arrowBlue.body.rotateRight(100);
        } else {
            this.arrowBlue.body.setZeroRotation();
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
            this.arrowBlue.body.thrust(400);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.S)){
            this.arrowBlue.body.reverse(400);
        }
            
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.arrowRed.body.rotateLeft(100);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            this.arrowRed.body.rotateRight(100);
        }else {
            this.arrowRed.body.setZeroRotation();
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            this.arrowRed.body.thrust(400);
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            this.arrowRed.body.reverse(400);
        }

        let captureFrame = this.capturePoint.body.frame;


        let blueCapturing = this.checkOverlay(this.arrowBlue);
        let redCapturing = this.checkOverlay(this.arrowRed);

        if(blueCapturing && redCapturing) {

            // do nothing
        } else if (blueCapturing) {

            this.capturePoint.blueCapturing();
        } else if (redCapturing) {

            this.capturePoint.redCapturing();
        }

        if(this.capturePoint.blueWon()) {
            this.game.state.start('GameOver');
        }

        if(this.capturePoint.redWon()) {
            this.game.state.start('GameOver');
        }
    }

    checkOverlay(sprite){

        let x = sprite.x;
        let y = sprite.y;

        let body = this.capturePoint.body;
        if(sprite.x > body.x && sprite.x < body.x + body.width &&
           sprite.y > body.y && sprite.y < body.y + body.height) {

            return true;
        }

        return false;
    }

    moveArrows() {

        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            this.arrowRed.x -= Constants.ARROW_MOVE_SPEED;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            this.arrowRed.x += Constants.ARROW_MOVE_SPEED;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            this.arrowRed.y -= Constants.ARROW_MOVE_SPEED;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            this.arrowRed.y += Constants.ARROW_MOVE_SPEED;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
            this.arrowBlue.x -= Constants.ARROW_MOVE_SPEED;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
            this.arrowBlue.x += Constants.ARROW_MOVE_SPEED;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
            this.arrowBlue.y -= Constants.ARROW_MOVE_SPEED;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.S)){
            this.arrowBlue.y += Constants.ARROW_MOVE_SPEED;
        }
    }

  render() {
  }
}


