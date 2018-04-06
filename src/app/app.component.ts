import { Component, OnInit } from '@angular/core';
import  * as Phaser  from 'phaser-ce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.game = new Phaser.Game(
      800, 600, Phaser.AUTO, 'content',
      { preload: this.preload, create: this.create, update:this.update });
  }
  game: Phaser.Game;

  constructor() {
  }

  preload() {
    //load images
    this.game.load.image('background', 'assets/aliens.jpg');
    this.game.load.image('pole', 'assets/pole.png');
  }

  create() {
    // create a new sprite to show the image on the screen
    // var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
    var background = this.game.add.sprite(0,0, "background");
    background.anchor.setTo(0,0);
    var pole1 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "pole");
    pole1.anchor.setTo(0.15, 0.5);
    var pole2 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "pole");
    pole2.anchor.setTo(0.5);
    var pole3 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "pole");
    pole3.anchor.setTo(0.85, 0.5);
  }

  update() {

  }

}