import Phaser from 'phaser'
import Constants from '../constants.js'

export default class extends Phaser.State {
  init() {
    game.stage.backgroundColor = Constants.BACKGROUND_COLOR;
  }

  preload() {
  }

  render() {
      this.state.start('Game');
  }
}
