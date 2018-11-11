/* globals __DEV__ */
import Phaser from 'phaser'
import Arrow from '../sprites/Arrow'
import Box from '../sprites/Box'

import Constants from '../constants.js'


export default class extends Phaser.State {
  init() { }
    preload() {
		
		game.load.image('box', 'assets/images/box.jpg');

		
		
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

	  
	  
	  

	  this.boxGroup = game.add.group(); 
//	  game.physics.p2.enable(this.boxGroup,false);
	  
	  
	  for(var i =0; i<2; i++){	  	
		  this.boxGroup.create(Math.random()*this.world.width, Math.random()*this.world.height, 'box');
	  }

//	  	  		this.game.add.existing(this.box);

	  
	game.physics.startSystem(Phaser.Physics.P2JS);
//
//    //  Turn on impact events for the world, without this we get no collision callbacks
    game.physics.p2.setImpactEvents(true);
//
    game.physics.p2.restitution = 0.8;
//	  
	game.physics.p2.enable(this.arrowRed, false);
	game.physics.p2.enable(this.arrowBlue, false);
//	  
//	this.arrowRed.body.createBodyCallback(this.arrowBlue, function(){
//		arrowRed.x -= 500;
//	}, this);
//	  
//	this.arrowBlue.body.createBodyCallback(this.arrowRed, function(){
//		arrowBlue.x += 500;
//	}, this);

	  
	  





		 
  }
	
	update(){
//		var speed = 4;
//		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
//			this.arrowRed.x -=speed;
//    	}
//    	if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
//        	this.arrowRed.x +=speed;
//		}
//    	if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
//        	this.arrowRed.y -=speed;
//		}
//		if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
//        	this.arrowRed.y +=speed;
//		}
//		
//		if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
//			this.arrowBlue.x -=speed;
//    	}
//    	if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
//        	this.arrowBlue.x +=speed;
//		}
//    	if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
//        	this.arrowBlue.y -=speed;
//		}
//		if (game.input.keyboard.isDown(Phaser.Keyboard.S)){
//        	this.arrowBlue.y +=speed;
//		}

		
	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {this.arrowBlue.body.rotateLeft(100);}   //ship movement
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){this.arrowBlue.body.rotateRight(100);}
    else {this.arrowBlue.body.setZeroRotation();}
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){this.arrowBlue.body.thrust(400);}
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){this.arrowBlue.body.reverse(400);}
		
	if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {this.arrowRed.body.rotateLeft(100);}   //ship movement
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D)){this.arrowRed.body.rotateRight(100);}
    else {this.arrowRed.body.setZeroRotation();}
    if (game.input.keyboard.isDown(Phaser.Keyboard.W)){this.arrowRed.body.thrust(400);}
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S)){this.arrowRed.body.reverse(400);}
		
		
		
	if(this.boxGroup.counterLiving<=5){
		  this.boxGroup.create(Math.random()*this.world.width, Math.random()*this.world.height, 'box');
	   }
		
//		let innerthis = this;
//		this.boxGroup.forEach((boxi) => {
//			if(this.game.physics.arcade.overlap(this.arrowRed,boxi)||this.game.physics.arcade.overlap(this.arrowBlue,boxi)){boxi.destroy;}
//		})
		
		
		
	}


//		this.boxGroup.forEach(overlap,this.arrowRed,true	
//			
//		})
		
//	if(this.arrowRed.overlap(this.box)){
//	   this.box.destroy();
//	   }
		
		
//		if(Math.abs(this.arrowBlue.x-this.box.x)<=this.box.length/2&&Math.abs(this.arrowBlue.y-this.box.y)<=this.box.length/2){
//			console.log("true")
//		}
		
//		this.game.physics.arcade.collide(this.arrowBlue, this.arrowRed, function(){
//			this.arrowRed.x -=30;
//			this.arrowBlue.x +=30;
//
//		}, null, this);

		
	
	
	

  render() {
  }
}


