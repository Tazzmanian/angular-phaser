import { Component, OnInit } from '@angular/core';
import  * as Phaser  from 'phaser-ce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', { preload: this.preload, create: this.create });
  }
  game: Phaser.Game;

  constructor() {
    // this.game = new Phaser.Game();
  }



  preload() {
    this.game.load.image('logo', 'assets/ds_logo.png');
  }

  create() {
    var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
  }

}