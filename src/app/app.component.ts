import { Component, OnInit, group } from '@angular/core';
import * as Phaser from 'phaser-ce';
import { Signal } from 'phaser-ce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  game: Phaser.Game;
  world: Phaser.World;

  ngOnInit(): void {
    this.game = new Phaser.Game(
      window.outerWidth, window.outerHeight, Phaser.AUTO, 'content',
      { preload: this.preload, create: this.create, update: this.update });
  }

  constructor() {
  }

  preload() {
    //load images
    this.game.load.image('background', 'assets/aliens.jpg');
    this.game.load.image('pole', 'assets/pole.png');
    this.game.load.image('block', 'assets/pink.png');
    this.game.load.image('concrete', 'assets/concrete.jpg');
  }

  create() {
    console.log(this.game.world);
    this.world = this.game.world;
    var pole1Blocks = [3, 2, 1];
    var pole2Blocks = [];
    var pole3Blocks = [];
    var dragedElement = null;
    // scale
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.parentIsWindow = true;

    // create a new sprite to show the image on the screen
    var background = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "background");
    background.anchor.setTo(0.5, 0.5);

    var concrete = this.game.add.sprite(this.game.world.centerX, this.game.world.height, "concrete");
    var temp = background.width / concrete.height;
    concrete.anchor.setTo(0.5, 0.5);
    concrete.angle = -90;
    concrete.scale.setTo(0.1, temp);

    // poles
    var pole1 = this.game.add.sprite(this.game.world.centerX * 0.5, this.game.world.height, "pole");
    var poleSize = this.game.world.height * 0.7 / pole1.height;
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
    var block1Size = { "x": w, "y": h };
    var block2Size = { "x": w * 0.7, "y": h };
    var block3Size = { "x": w * 0.4, "y": h };
    block1.inputEnabled = true;
    block1.input.pixelPerfectClick = true;
    // block1.input.enableDrag();
    block1.anchor.setTo(0.5, 1);
    block1.scale.setTo(block1Size.x, block1Size.y);
    block1.input.setDragLock(false, false);

    var block2 = this.game.add.sprite(this.game.world.centerX * 0.5, this.game.world.height - block1.height, "block");
    block2.inputEnabled = true;
    block2.input.pixelPerfectClick = true;
    // block2.input.enableDrag();
    block2.anchor.setTo(0.5, 1);
    block2.scale.setTo(block2Size.x, block2Size.y);
    block2.input.setDragLock(false, false);

    var block3 = this.game.add.sprite(this.game.world.centerX * 0.5, this.game.world.height - block1.height - block2.height, "block");
    block3.inputEnabled = true;
    block3.input.pixelPerfectClick = true;
    block3.input.enableDrag();
    block3.input.setDragLock(false, true);
    block3.anchor.setTo(0.5, 1);
    block3.scale.setTo(block3Size.x, block3Size.y);

    // block 1
    block1.events.onDragStart.add(() => {
      if (block2.position.y >= this.game.world.height * 0.315) {
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block1.position.x);
        let x2Dif = Math.abs(x2 - block1.position.x);
        let x3Dif = Math.abs(x3 - block1.position.x);

        if (x1Dif <= x2Dif) {
          console.log("Pop 1");
          dragedElement = pole1Blocks.pop();
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          dragedElement = pole2Blocks.pop();
          console.log("Pop 2");
        } else {
          dragedElement = pole3Blocks.pop();
          console.log("Pop 3");
        }
        // 
        console.log("Start 1");
        console.log("poped element 1", dragedElement);
        console.log("arrays", pole1Blocks);
      }
    });
    block1.events.onDragStop.add(() => {
      console.log("Stop 1");

      if (block3.position.y >= this.game.world.height * 0.315) {
        // console.log('vertical');
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block1.position.x);
        let x2Dif = Math.abs(x2 - block1.position.x);
        let x3Dif = Math.abs(x3 - block1.position.x);

        if (x1Dif <= x2Dif) {
          pole1Blocks.push(dragedElement);
          block1.position.x = x1;
          block1.position.y = this.game.world.height - (pole1Blocks.length - 1) * block1.height;
          console.log("x1", x1, dragedElement);
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          pole2Blocks.push(dragedElement);
          block1.position.x = x2;
          block1.position.y = this.game.world.height - (pole2Blocks.length - 1) * block1.height;
          console.log("x2", x2, dragedElement);
        } else {
          pole3Blocks.push(dragedElement);
          block1.position.x = x3;
          block1.position.y = this.game.world.height - (pole3Blocks.length - 1) * block1.height;
          console.log("x3", x3, dragedElement);
        }

        if(pole1Blocks.length > 0) {
          let temp  = pole1Blocks[pole1Blocks.length-1];
          if(temp == 1) {
            block1.input.enableDrag();
            block1.input.setDragLock(false, true);
          }
          if(temp == 2) {
            block2.input.enableDrag();
            block2.input.setDragLock(false, true);
          }
          if(temp == 3) {
            block3.input.enableDrag();
            block3.input.setDragLock(false, true);
          }
        }
        if(pole2Blocks.length > 0) {
          let temp  = pole2Blocks[pole1Blocks.length-1];
          if(temp == 1) {
            block1.input.enableDrag();
            block1.input.setDragLock(false, true);
          }
          if(temp == 2) {
            block2.input.enableDrag();
            block2.input.setDragLock(false, true);
          }
          if(temp == 3) {
            block3.input.enableDrag();
            block3.input.setDragLock(false, true);
          }
        }
        if(pole3Blocks.length > 0) {
          let temp  = pole3Blocks[pole1Blocks.length-1];
          if(temp == 1) {
            block1.input.enableDrag();
            block1.input.setDragLock(false, true);
          }
          if(temp == 2) {
            block2.input.enableDrag();
            block2.input.setDragLock(false, true);
          }
          if(temp == 3) {
            block3.input.enableDrag();
            block3.input.setDragLock(false, true);
          }
        }

        // block3.input.setDragLock(false, true);
        console.log("pushed element 1", dragedElement);
        console.log("arrays", pole1Blocks, pole2Blocks, pole3Blocks);
        dragedElement = null;
      }
    });
    block1.events.onDragUpdate.add(() => {
      // console.log("Update", block3.position);
      // console.log(pole1Blocks);

      if (block1.position.y >= this.game.world.height) {
        block1.position.y = this.game.world.height;
      } else if (block1.position.y >= this.game.world.height * 0.315) {
        // console.log('vertical');
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block1.position.x);
        let x2Dif = Math.abs(x2 - block1.position.x);
        let x3Dif = Math.abs(x3 - block1.position.x);

        if (x1Dif <= x2Dif && x1Dif <= x3Dif) {
          block1.position.x = x1;
          // var temp = this.game.world.height - (pole1Blocks.length - 1) * block3.height;
          // if (block3.position.y > temp) {
          //   block3.position.y = temp;
          // }
          // console.log("x1", x1);
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          block1.position.x = x2;
          // console.log("x2", x2);
        } else {
          block1.position.x = x3;
          // console.log("x3", x3);
        }

        block1.input.setDragLock(false, true);
      } else {
        // console.log('both');
        block1.input.setDragLock(true, true);
      }
    });

    // block 2
    block2.events.onDragStart.add(() => {
      if (block2.position.y >= this.game.world.height * 0.315) {
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block2.position.x);
        let x2Dif = Math.abs(x2 - block2.position.x);
        let x3Dif = Math.abs(x3 - block2.position.x);

        if (x1Dif <= x2Dif) {
          console.log("Pop 1");
          dragedElement = pole1Blocks.pop();
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          dragedElement = pole2Blocks.pop();
          console.log("Pop 2");
        } else {
          dragedElement = pole3Blocks.pop();
          console.log("Pop 3");
        }
        // 
        console.log("Start 3");
        console.log("poped element 3", dragedElement);
        console.log("arrays", pole1Blocks);
      }
    });
    block2.events.onDragStop.add(() => {
      console.log("Stop 3");

      if (block3.position.y >= this.game.world.height * 0.315) {
        // console.log('vertical');
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block2.position.x);
        let x2Dif = Math.abs(x2 - block2.position.x);
        let x3Dif = Math.abs(x3 - block2.position.x);

        if (x1Dif <= x2Dif) {
          pole1Blocks.push(dragedElement);
          block2.position.x = x1;
          block2.position.y = this.game.world.height - (pole1Blocks.length - 1) * block2.height;
          console.log("x1", x1, dragedElement);
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          pole2Blocks.push(dragedElement);
          block2.position.x = x2;
          block2.position.y = this.game.world.height - (pole2Blocks.length - 1) * block2.height;
          console.log("x2", x2, dragedElement);
        } else {
          pole3Blocks.push(dragedElement);
          block2.position.x = x3;
          block2.position.y = this.game.world.height - (pole3Blocks.length - 1) * block2.height;
          console.log("x3", x3, dragedElement);
        }

        if(pole1Blocks.length > 0) {
          let temp  = pole1Blocks[pole1Blocks.length-1];
          if(temp == 1) {
            block1.input.enableDrag();
            block1.input.setDragLock(false, true);
          }
          if(temp == 2) {
            block2.input.enableDrag();
            block2.input.setDragLock(false, true);
          }
          if(temp == 3) {
            block3.input.enableDrag();
            block3.input.setDragLock(false, true);
          }
        }
        if(pole2Blocks.length > 0) {
          let temp  = pole2Blocks[pole1Blocks.length-1];
          if(temp == 1) {
            block1.input.enableDrag();
            block1.input.setDragLock(false, true);
          }
          if(temp == 2) {
            block2.input.enableDrag();
            block2.input.setDragLock(false, true);
          }
          if(temp == 3) {
            block3.input.enableDrag();
            block3.input.setDragLock(false, true);
          }
        }
        if(pole3Blocks.length > 0) {
          let temp  = pole3Blocks[pole1Blocks.length-1];
          if(temp == 1) {
            block1.input.enableDrag();
            block1.input.setDragLock(false, true);
          }
          if(temp == 2) {
            block2.input.enableDrag();
            block2.input.setDragLock(false, true);
          }
          if(temp == 3) {
            block3.input.enableDrag();
            block3.input.setDragLock(false, true);
          }
        }

        // block3.input.setDragLock(false, true);
        console.log("pushed element 2", dragedElement);
        console.log("arrays", pole1Blocks, pole2Blocks, pole3Blocks);
        dragedElement = null;
      }
    });
    block2.events.onDragUpdate.add(() => {
      // console.log("Update", block3.position);
      // console.log(pole1Blocks);

      if (block2.position.y >= this.game.world.height) {
        block2.position.y = this.game.world.height;
      } else if (block2.position.y >= this.game.world.height * 0.315) {
        // console.log('vertical');
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block2.position.x);
        let x2Dif = Math.abs(x2 - block2.position.x);
        let x3Dif = Math.abs(x3 - block2.position.x);

        if (x1Dif <= x2Dif && x1Dif <= x3Dif) {
          block2.position.x = x1;
          // var temp = this.game.world.height - (pole1Blocks.length - 1) * block3.height;
          // if (block3.position.y > temp) {
          //   block3.position.y = temp;
          // }
          // console.log("x1", x1);
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          block2.position.x = x2;
          // console.log("x2", x2);
        } else {
          block2.position.x = x3;
          // console.log("x3", x3);
        }

        block2.input.setDragLock(false, true);
      } else {
        // console.log('both');
        block2.input.setDragLock(true, true);
      }
    });

    // block 3
    block3.events.onDragStart.add(() => {
      if (block3.position.y >= this.game.world.height * 0.315) {
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block3.position.x);
        let x2Dif = Math.abs(x2 - block3.position.x);
        let x3Dif = Math.abs(x3 - block3.position.x);

        if (x1Dif <= x2Dif) {
          console.log("Pop 1");
          dragedElement = pole1Blocks.pop();
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          dragedElement = pole2Blocks.pop();
          console.log("Pop 2");
        } else {
          dragedElement = pole3Blocks.pop();
          console.log("Pop 3");
        }
        // 
        console.log("Start 3");
        console.log("poped element 3", dragedElement);
        console.log("arrays", pole1Blocks);
      }
    });
    block3.events.onDragStop.add(() => {
      console.log("Stop 3");

      if (block3.position.y >= this.game.world.height * 0.315) {
        // console.log('vertical');
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block3.position.x);
        let x2Dif = Math.abs(x2 - block3.position.x);
        let x3Dif = Math.abs(x3 - block3.position.x);

        if (x1Dif <= x2Dif) {
          pole1Blocks.push(dragedElement);
          block3.position.x = x1;
          block3.position.y = this.game.world.height - (pole1Blocks.length - 1) * block3.height;
          console.log("x1", x1, dragedElement);
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          pole2Blocks.push(dragedElement);
          block3.position.x = x2;
          block3.position.y = this.game.world.height - (pole2Blocks.length - 1) * block3.height;
          console.log("x2", x2, dragedElement);
        } else {
          pole3Blocks.push(dragedElement);
          block3.position.x = x3;
          block3.position.y = this.game.world.height - (pole3Blocks.length - 1) * block3.height;
          console.log("x3", x3, dragedElement);
        }

        if(pole1Blocks.length > 0) {
          let temp  = pole1Blocks[pole1Blocks.length-1];
          if(temp == 1) {
            block1.input.enableDrag();
            block1.input.setDragLock(false, true);
          }
          if(temp == 2) {
            block2.input.enableDrag();
            block2.input.setDragLock(false, true);
          }
          if(temp == 3) {
            block3.input.enableDrag();
            block3.input.setDragLock(false, true);
          }
        }
        if(pole2Blocks.length > 0) {
          let temp  = pole2Blocks[pole1Blocks.length-1];
          if(temp == 1) {
            block1.input.enableDrag();
            block1.input.setDragLock(false, true);
          }
          if(temp == 2) {
            block2.input.enableDrag();
            block2.input.setDragLock(false, true);
          }
          if(temp == 3) {
            block3.input.enableDrag();
            block3.input.setDragLock(false, true);
          }
        }
        if(pole3Blocks.length > 0) {
          let temp  = pole3Blocks[pole1Blocks.length-1];
          if(temp == 1) {
            block1.input.enableDrag();
            block1.input.setDragLock(false, true);
          }
          if(temp == 2) {
            block2.input.enableDrag();
            block2.input.setDragLock(false, true);
          }
          if(temp == 3) {
            block3.input.enableDrag();
            block3.input.setDragLock(false, true);
          }
        }

        // block3.input.setDragLock(false, true);
        console.log("pushed element 3", dragedElement);
        console.log("arrays", pole1Blocks, pole2Blocks, pole3Blocks);
        dragedElement = null;
      }
    });
    block3.events.onDragUpdate.add(() => {
      // console.log("Update", block3.position);
      // console.log(pole1Blocks);

      if (block3.position.y >= this.game.world.height) {
        block3.position.y = this.game.world.height;
      } else if (block3.position.y >= this.game.world.height * 0.315) {
        // console.log('vertical');
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block3.position.x);
        let x2Dif = Math.abs(x2 - block3.position.x);
        let x3Dif = Math.abs(x3 - block3.position.x);

        if (x1Dif <= x2Dif && x1Dif <= x3Dif) {
          block3.position.x = x1;
          // var temp = this.game.world.height - (pole1Blocks.length - 1) * block3.height;
          // if (block3.position.y > temp) {
          //   block3.position.y = temp;
          // }
          // console.log("x1", x1);
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          block3.position.x = x2;
          // console.log("x2", x2);
        } else {
          block3.position.x = x3;
          // console.log("x3", x3);
        }

        block3.input.setDragLock(false, true);
      } else {
        // console.log('both');
        block3.input.setDragLock(true, true);
      }
    });

  }

  update() {

  }

}