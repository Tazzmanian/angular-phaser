import { Component, OnInit, group } from '@angular/core';
import  * as Phaser  from 'phaser-ce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  game: Phaser.Game;
  world: Phaser.World;
  group1: Phaser.Group;
  group2: Phaser.Group;
  group3: Phaser.Group;

  ngOnInit(): void {
    this.game = new Phaser.Game(
      window.outerWidth, window.outerHeight, Phaser.AUTO, 'content',
      { preload: this.preload, create: this.create, update:this.update });
      this.group1 = this.game.add.group();
      this.group2 = this.game.add.group();
      this.group3 = this.game.add.group();
  }

  constructor() {
  }

  preload() {
    //load images
    this.game.load.image('background', 'assets/aliens.jpg');
    this.game.load.image('pole', 'assets/pole.png');
    this.game.load.image('block', 'assets/pink.png');
  }

  create() {
    console.log(this.game.world);
    this.world =  this.game.world;
    // scale
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.parentIsWindow = true;


    // create a new sprite to show the image on the screen
    var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "background");
    background.anchor.setTo(0.5,0.5);

    // poles
    var pole1 = this.game.add.sprite(this.game.world.centerX * 0.5, this.game.world.height, "pole");
    var poleSize = this.game.world.height * 0.7 / pole1.height  ;
    pole1.anchor.setTo(0.5, 1);
    pole1.scale.setTo(poleSize);
    var pole2 = this.game.add.sprite(this.game.world.centerX, this.game.world.height, "pole");
    pole2.anchor.setTo(0.5, 1);
    pole2.scale.setTo(poleSize);
    var pole3 = this.game.add.sprite(this.game.world.centerX * 1.5, this.game.world.height, "pole");
    pole3.anchor.setTo(0.5, 1);
    pole3.scale.setTo(poleSize);

    //blocks
    var block1 = this.game.add.sprite(this.game.world.centerX * 0.5, this.game.world.height, "block");
    var w = window.innerWidth / (4 * block1.width);
    var h = pole1.height / (5 * block1.height);
    var block1Size = {"x": w, "y": h};
    var block2Size = {"x": w * 0.7, "y": h};
    var block3Size = {"x": w * 0.4, "y": h};
    block1.inputEnabled = true;
    block1.input.pixelPerfectClick = true;
    block1.input.enableDrag();
    block1.anchor.setTo(0.5, 1);
    block1.scale.setTo(block1Size.x, block1Size.y);
    
    var block2 = this.game.add.sprite(this.game.world.centerX * 0.5, this.game.world.height - block1.height, "block");
    block2.inputEnabled = true;
    block2.input.pixelPerfectClick = true;
    block2.input.enableDrag();
    block2.anchor.setTo(0.5, 1);
    block2.scale.setTo(block2Size.x, block2Size.y);

    var block3 = this.game.add.sprite(this.game.world.centerX * 0.5, this.game.world.height - block1.height - block2.height, "block");
    block3.inputEnabled = true;
    block3.input.pixelPerfectClick = true;
    block3.input.enableDrag();
    block3.anchor.setTo(0.5, 1);
    block3.scale.setTo(block3Size.x, block3Size.y);

    var block4 = this.game.add.sprite(this.game.world.centerX, this.game.world.height, "block");
    block4.inputEnabled = true;
    block4.input.pixelPerfectClick = true;
    block4.input.enableDrag();
    block4.anchor.setTo(0.5, 1);
    block4.scale.setTo(block1Size.x, block1Size.y);

    this.group1.add(block1);
    this.group1.add(block2);
    this.group1.add(block3);
    
    this.group1.remove(block2);

    
  }

  update() {
  }

}