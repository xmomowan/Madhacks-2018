import Phaser from 'phaser'
import Constants from '../constants.js'

export default class extends Phaser.State {

  init() {
      let style = {
            font: "32px Monospace",
            fill: "#00ff00",
            align: "center"
      }
      let text = game.add.text(game.width / 2, game.height / 2, "Game Over", style);
      text.anchor.set(0.5);
  }

  preload() {
  }

  render() {
  }
}
