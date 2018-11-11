import Phaser from 'phaser'
import Constants from '../constants.js'

export default class extends Phaser.Sprite {

    constructor(game, x, y, radius) {

        let bmp = game.add.bitmapData(radius * 2, radius * 2);
        super(game, x, y, bmp);
        this.anchor.setTo(0.5);

        this.radius = radius;
        this.blueProgress = 0;

        this.bmp = bmp;
        this.bmp.clear();

        let ctx = this.bmp.ctx;

        // blue part
        this.constructor.arc(ctx, this.radius, this.radius, this.radius, 0.5, 1.5, Constants.CAPTURE_BLUE_COLOR, false);

        // red part
        this.constructor.arc(ctx, this.radius, this.radius, this.radius, 0.5, 1.5, Constants.CAPTURE_RED_COLOR, true);

        // center overlay
        this.constructor.arc(ctx, this.radius, this.radius, this.radius * 0.87, 0, 2, Constants.BACKGROUND_COLOR, false);

        this.bmp.dirty = true; 
    }

    static arc(ctx, x, y, radius, start, end, color, direction) {

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius, start * Math.PI, end * Math.PI, direction);
        ctx.closePath();
        ctx.fill();
    }

    update() {

        this.bmp.clear();
        let ctx = this.bmp.ctx;

        // blue part
        this.constructor.arc(ctx, this.radius, this.radius, this.radius, 0.5 + this.blueProgress, 1.5, Constants.CAPTURE_BLUE_COLOR, true);

        // red part
        this.constructor.arc(ctx, this.radius, this.radius, this.radius, 0.5 + this.blueProgress, 1.5, Constants.CAPTURE_RED_COLOR, false);

        // center overlay
        this.constructor.arc(ctx, this.radius, this.radius, this.radius * 0.87, 0, 2, Constants.BACKGROUND_COLOR, false);

        this.bmp.dirty = true; 
    }

    recalculateBody() {

        this.body.setSize(this.radius * 2, this.radius * 2, 0, 0);
    }

    blueCapturing() {

        let after = this.blueProgress + Constants.CAPTURING_SPEED;
        if(after > 1) {

            this.blueProgress = 0.99999;
        } else {

            this.blueProgress = after;
        }
    }

    redCapturing() {

        let after = this.blueProgress - Constants.CAPTURING_SPEED;
        if(after < -1) {

            this.blueProgress = -0.99999;
        } else {

            this.blueProgress = after;
        }
    }

    blueWon() {

        return this.blueProgress == 0.99999;
    }

    redWon() {

        return this.blueProgress == -0.99999;
    }
}
