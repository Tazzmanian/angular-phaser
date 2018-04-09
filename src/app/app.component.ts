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
    var counter = 0;
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
    
    //score
    var style = {
      font: 'bold 4vw Arial',
      fill: '#D0171B',
      align: "center"
    }
    var score = this.game.add.text(this.game.world.centerX * 0.5, this.game.world.height * 0.1, '0', style);
    score.anchor.setTo(2,0.5);
    score.visible = true;

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
    block1.anchor.setTo(0.5, 1);
    block1.scale.setTo(block1Size.x, block1Size.y);
    block1.input.setDragLock(false, false);

    var block2 = this.game.add.sprite(this.game.world.centerX * 0.5, this.game.world.height - block1.height, "block");
    block2.inputEnabled = true;
    block2.input.pixelPerfectClick = true;
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
      block2.input.disableDrag();
      block3.input.disableDrag();

      if (dragedElement == null && block2.position.y >= this.game.world.height * 0.315) {
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block1.position.x);
        let x2Dif = Math.abs(x2 - block1.position.x);
        let x3Dif = Math.abs(x3 - block1.position.x);

        if (x1Dif <= x2Dif) {
          dragedElement = pole1Blocks.pop();
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          dragedElement = pole2Blocks.pop();
        } else {
          dragedElement = pole3Blocks.pop();
        }
      }
    });
    block1.events.onDragStop.add(() => {
      if (block1.position.y >= this.game.world.height * 0.315) {
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block1.position.x);
        let x2Dif = Math.abs(x2 - block1.position.x);
        let x3Dif = Math.abs(x3 - block1.position.x);

        if (x1Dif <= x2Dif) {
          block1.position.x = x1;
          if (pole1Blocks.length > 0 && pole1Blocks[pole1Blocks.length - 1] <= dragedElement) {
            block1.position.y = this.game.world.height * 0.315;
          } else {
            pole1Blocks.push(dragedElement);
            block1.position.y = this.game.world.height - (pole1Blocks.length - 1) * block1.height;
            dragedElement = null;
          }
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          block1.position.x = x2;
          if (pole2Blocks.length > 0 && pole2Blocks[pole2Blocks.length - 1] <= dragedElement) {
            block1.position.y = this.game.world.height * 0.315;
          } else {
            pole2Blocks.push(dragedElement);
            block1.position.y = this.game.world.height - (pole2Blocks.length - 1) * block1.height;
            dragedElement = null;
          }
        } else {
          block1.position.x = x3;
          if (pole3Blocks.length > 0 && pole3Blocks[pole3Blocks.length - 1] <= dragedElement) {
            block1.position.y = this.game.world.height * 0.315;
          } else {
            pole3Blocks.push(dragedElement);
            block1.position.y = this.game.world.height - (pole3Blocks.length - 1) * block1.height;
            dragedElement = null;
          }
        }

        block1.input.setDragLock(false, true);
        block2.input.setDragLock(false, true);
        block3.input.setDragLock(false, true);

        if (dragedElement == null) {
          if (pole1Blocks.length > 0) {
            let temp = pole1Blocks[pole1Blocks.length - 1];
            if (temp == 1) {
              block3.input.enableDrag();
            }
            if (temp == 2) {
              block2.input.enableDrag();
            }
            if (temp == 3) {
              block1.input.enableDrag();
            }
          }
          if (pole2Blocks.length > 0) {
            let temp = pole2Blocks[pole2Blocks.length - 1];
            if (temp == 1) {
              block3.input.enableDrag();
            }
            if (temp == 2) {
              block2.input.enableDrag();
            }
            if (temp == 3) {
              block1.input.enableDrag();
            }
          }
          if (pole3Blocks.length > 0) {
            let temp = pole3Blocks[pole3Blocks.length - 1];
            if (temp == 1) {
              block3.input.enableDrag();
            }
            if (temp == 2) {
              block2.input.enableDrag();
            }
            if (temp == 3) {
              block1.input.enableDrag();
            }
          }
          counter += 1;
          score.text = counter.toString();
        }
      }
      console.log("1", pole1Blocks, pole2Blocks, pole3Blocks);
    });
    block1.events.onDragUpdate.add(() => {
      block2.input.disableDrag();
      block3.input.disableDrag();

      if (block1.position.y >= this.game.world.height) {
        block1.position.y = this.game.world.height;
      } else if (block1.position.y >= this.game.world.height * 0.315) {
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block1.position.x);
        let x2Dif = Math.abs(x2 - block1.position.x);
        let x3Dif = Math.abs(x3 - block1.position.x);

        if (x1Dif <= x2Dif && x1Dif <= x3Dif) {
          block1.position.x = x1;
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          block1.position.x = x2;
        } else {
          block1.position.x = x3;
        }
        block1.input.setDragLock(false, true);
      } else {
        block1.input.setDragLock(true, true);
      }
    });

    // block 2
    block2.events.onDragStart.add(() => {
      block1.input.disableDrag();
      block3.input.disableDrag();

      if (dragedElement == null && block2.position.y >= this.game.world.height * 0.315) {
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block2.position.x);
        let x2Dif = Math.abs(x2 - block2.position.x);
        let x3Dif = Math.abs(x3 - block2.position.x);

        if (x1Dif <= x2Dif) {
          dragedElement = pole1Blocks.pop();
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          dragedElement = pole2Blocks.pop();
        } else {
          dragedElement = pole3Blocks.pop();
        }
      }
    });
    block2.events.onDragStop.add(() => {
      if (block2.position.y >= this.game.world.height * 0.315) {
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block2.position.x);
        let x2Dif = Math.abs(x2 - block2.position.x);
        let x3Dif = Math.abs(x3 - block2.position.x);

        if (x1Dif <= x2Dif) {
          block2.position.x = x1;
          if (pole1Blocks.length > 0 && pole1Blocks[pole1Blocks.length - 1] <= dragedElement) {
            block2.position.y = this.game.world.height * 0.315;
          } else {
            pole1Blocks.push(dragedElement);
            block2.position.y = this.game.world.height - (pole1Blocks.length - 1) * block2.height;
            dragedElement = null;
          }
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          block2.position.x = x2;
          if (pole2Blocks.length > 0 && pole2Blocks[pole2Blocks.length - 1] < dragedElement) {
            block2.position.y = this.game.world.height * 0.315;
          } else {
            pole2Blocks.push(dragedElement);
            block2.position.y = this.game.world.height - (pole2Blocks.length - 1) * block2.height;
            dragedElement = null;
          }
        } else {
          block2.position.x = x3;
          if (pole3Blocks.length > 0 && pole3Blocks[pole3Blocks.length - 1] <= dragedElement) {
            block2.position.y = this.game.world.height * 0.315;
          } else {
            pole3Blocks.push(dragedElement);
            block2.position.y = this.game.world.height - (pole3Blocks.length - 1) * block2.height;
            dragedElement = null;
          }
        }

        block1.input.setDragLock(false, true);
        block2.input.setDragLock(false, true);
        block3.input.setDragLock(false, true);

        console.log("2 enables");
        if (dragedElement == null) {
          if (pole1Blocks.length > 0) {
            let temp = pole1Blocks[pole1Blocks.length - 1];
            if (temp == 1) {
              console.log(1, 1);
              block3.input.enableDrag();
            }
            if (temp == 2) {
              console.log(1, 2);
              block2.input.enableDrag();
            }
            if (temp == 3) {
              console.log(1, 3);
              block1.input.enableDrag();
            }
          }
          if (pole2Blocks.length > 0) {
            let temp = pole2Blocks[pole2Blocks.length - 1];
            if (temp == 1) {
              console.log(2, 1);
              block3.input.enableDrag();
            }
            if (temp == 2) {
              console.log(2, 2);
              block2.input.enableDrag();
            }
            if (temp == 3) {
              console.log(2, 3);
              block1.input.enableDrag();
            }
          }
          if (pole3Blocks.length > 0) {
            let temp = pole3Blocks[pole3Blocks.length - 1];
            if (temp == 1) {
              console.log(3, 1);
              block3.input.enableDrag();
            }
            if (temp == 2) {
              console.log(3, 2);
              block2.input.enableDrag();
            }
            if (temp == 3) {
              console.log(3, 3);
              block1.input.enableDrag();
            }
          }
          counter += 1;
          score.text = counter.toString();
        }
      }
      console.log("2", pole1Blocks, pole2Blocks, pole3Blocks);
    });

    block2.events.onDragUpdate.add(() => {
      block1.input.disableDrag();
      block3.input.disableDrag();
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

        if (x1Dif <= x2Dif) {
          block2.position.x = x1;
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          block2.position.x = x2;
        } else {
          block2.position.x = x3;
        }
        block2.input.setDragLock(false, true);
      } else {
        block2.input.setDragLock(true, true);
      }
    });

    // block 3
    block3.events.onDragStart.add(() => {
      block1.input.disableDrag();
      block2.input.disableDrag();

      if (dragedElement == null && block3.position.y >= this.game.world.height * 0.315) {
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block3.position.x);
        let x2Dif = Math.abs(x2 - block3.position.x);
        let x3Dif = Math.abs(x3 - block3.position.x);

        if (x1Dif <= x2Dif) {
          dragedElement = pole1Blocks.pop();
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          dragedElement = pole2Blocks.pop();
        } else {
          dragedElement = pole3Blocks.pop();
        }
      }
    });

    block3.events.onDragStop.add(() => {
      console.log(block3.position.y, this.game.world.height * 0.315)
      if (block3.position.y >= this.game.world.height * 0.315) {
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block3.position.x);
        let x2Dif = Math.abs(x2 - block3.position.x);
        let x3Dif = Math.abs(x3 - block3.position.x);

        if (x1Dif <= x2Dif) {
          if (pole1Blocks.length > 0 && pole1Blocks[pole1Blocks.length - 1] <= dragedElement) {
            block3.position.y = this.game.world.height * 0.315;
          } else {
            pole1Blocks.push(dragedElement);
            block3.position.y = this.game.world.height - (pole1Blocks.length - 1) * block3.height;
            dragedElement = null;
          }
          block3.position.x = x1;
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          block3.position.x = x2;
          if (pole2Blocks.length > 0 && pole2Blocks[pole2Blocks.length - 1] <= dragedElement) {
            block3.position.y = this.game.world.height * 0.315;
          } else {
            pole2Blocks.push(dragedElement);
            block3.position.y = this.game.world.height - (pole2Blocks.length - 1) * block3.height;
            dragedElement = null;
          }
        } else {
          block3.position.x = x3;
          if (pole3Blocks.length > 0 && pole3Blocks[pole3Blocks.length - 1] <= dragedElement) {
            block3.position.y = this.game.world.height * 0.315;
          } else {
            pole3Blocks.push(dragedElement);
            block3.position.y = this.game.world.height - (pole3Blocks.length - 1) * block3.height;
            dragedElement = null;
          }
        }

        block1.input.setDragLock(false, true);
        block2.input.setDragLock(false, true);
        block3.input.setDragLock(false, true);

        console.log("3 enables")
        if (dragedElement == null) {
          if (pole1Blocks.length > 0) {
            let temp = pole1Blocks[pole1Blocks.length - 1];
            if (temp == 1) {
              console.log(1, 1);
              block3.input.enableDrag();
            }
            if (temp == 2) {
              console.log(1, 2);
              block2.input.enableDrag();
            }
            if (temp == 3) {
              console.log(1, 3);
              block1.input.enableDrag();
            }
          }
          if (pole2Blocks.length > 0) {
            let temp = pole2Blocks[pole2Blocks.length - 1];
            if (temp == 1) {
              console.log(2, 1);
              block3.input.enableDrag();
            }
            if (temp == 2) {
              console.log(2, 2);
              block2.input.enableDrag();
            }
            if (temp == 3) {
              console.log(2, 3);
              block1.input.enableDrag();
            }
          }
          if (pole3Blocks.length > 0) {
            let temp = pole3Blocks[pole3Blocks.length - 1];
            if (temp == 1) {
              console.log(3, 1);
              block3.input.enableDrag();
            }
            if (temp == 2) {
              console.log(3, 2);
              block2.input.enableDrag();
            }
            if (temp == 3) {
              console.log(3, 3);
              block1.input.enableDrag();
            }
          }
          counter += 1;
          score.text = counter.toString();
        }
      }
      console.log("3", pole1Blocks, pole2Blocks, pole3Blocks);
    });
    block3.events.onDragUpdate.add(() => {
      block1.input.disableDrag();
      block2.input.disableDrag();
      if (block3.position.y >= this.game.world.height) {
        block3.position.y = this.game.world.height;
      }

      if (block3.position.y >= this.game.world.height * 0.315) {
        // console.log('vertical');
        let x1 = pole1.position.x;
        let x2 = pole2.position.x;
        let x3 = pole3.position.x;

        let x1Dif = Math.abs(x1 - block3.position.x);
        let x2Dif = Math.abs(x2 - block3.position.x);
        let x3Dif = Math.abs(x3 - block3.position.x);

        if (x1Dif <= x2Dif) {
          block3.position.x = x1;
        } else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
          block3.position.x = x2;
        } else {
          block3.position.x = x3;
        }

        block3.input.setDragLock(false, true);
      } else {
        block3.input.setDragLock(true, true);
      }
    });

  }

  update() {

  }

}