webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ".content {\r\n    margin: auto;\r\n    padding: auto;\r\n}\r\n\r\n.container {\r\n    width: 100%;\r\n    height: 100%;\r\n    background-size: auto;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- <h1>TypeScript HTML App</h1> -->\r\n<div class=\"container\">\r\n  <div id=\"content\"></div>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_phaser_ce__ = __webpack_require__("./node_modules/phaser-ce/build/phaser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_phaser_ce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_phaser_ce__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        this.game = new __WEBPACK_IMPORTED_MODULE_1_phaser_ce__["Game"](window.outerWidth, window.outerHeight, __WEBPACK_IMPORTED_MODULE_1_phaser_ce__["AUTO"], 'content', { preload: this.preload, create: this.create, update: this.update });
    };
    AppComponent.prototype.preload = function () {
        //load images
        this.game.load.image('background', 'assets/aliens.jpg');
        this.game.load.image('pole', 'assets/pole.png');
        this.game.load.image('block', 'assets/pink.png');
        this.game.load.image('concrete', 'assets/concrete.jpg');
    };
    AppComponent.prototype.create = function () {
        var _this = this;
        console.log(this.game.world);
        this.world = this.game.world;
        var pole1Blocks = [3, 2, 1];
        var pole2Blocks = [];
        var pole3Blocks = [];
        var dragedElement = null;
        var counter = 0;
        // scale
        this.game.scale.scaleMode = __WEBPACK_IMPORTED_MODULE_1_phaser_ce__["ScaleManager"].SHOW_ALL;
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
            font: 'bold 6vw Arial',
            fill: '#D0171B',
            align: "center"
        };
        var score = this.game.add.text(this.game.world.centerX * 0.5, this.game.world.height * 0.1, '0', style);
        score.anchor.setTo(2, 0.5);
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
        block1.events.onDragStart.add(function () {
            block2.input.disableDrag();
            block3.input.disableDrag();
            if (dragedElement == null && block2.position.y >= _this.game.world.height * 0.315) {
                var x1 = pole1.position.x;
                var x2 = pole2.position.x;
                var x3 = pole3.position.x;
                var x1Dif = Math.abs(x1 - block1.position.x);
                var x2Dif = Math.abs(x2 - block1.position.x);
                var x3Dif = Math.abs(x3 - block1.position.x);
                if (x1Dif <= x2Dif) {
                    dragedElement = pole1Blocks.pop();
                }
                else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
                    dragedElement = pole2Blocks.pop();
                }
                else {
                    dragedElement = pole3Blocks.pop();
                }
            }
        });
        block1.events.onDragStop.add(function () {
            if (block1.position.y >= _this.game.world.height * 0.315) {
                var x1 = pole1.position.x;
                var x2 = pole2.position.x;
                var x3 = pole3.position.x;
                var x1Dif = Math.abs(x1 - block1.position.x);
                var x2Dif = Math.abs(x2 - block1.position.x);
                var x3Dif = Math.abs(x3 - block1.position.x);
                if (x1Dif <= x2Dif) {
                    block1.position.x = x1;
                    if (pole1Blocks.length > 0 && pole1Blocks[pole1Blocks.length - 1] <= dragedElement) {
                        block1.position.y = _this.game.world.height * 0.315;
                    }
                    else {
                        pole1Blocks.push(dragedElement);
                        block1.position.y = _this.game.world.height - (pole1Blocks.length - 1) * block1.height;
                        dragedElement = null;
                    }
                }
                else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
                    block1.position.x = x2;
                    if (pole2Blocks.length > 0 && pole2Blocks[pole2Blocks.length - 1] <= dragedElement) {
                        block1.position.y = _this.game.world.height * 0.315;
                    }
                    else {
                        pole2Blocks.push(dragedElement);
                        block1.position.y = _this.game.world.height - (pole2Blocks.length - 1) * block1.height;
                        dragedElement = null;
                    }
                }
                else {
                    block1.position.x = x3;
                    if (pole3Blocks.length > 0 && pole3Blocks[pole3Blocks.length - 1] <= dragedElement) {
                        block1.position.y = _this.game.world.height * 0.315;
                    }
                    else {
                        pole3Blocks.push(dragedElement);
                        block1.position.y = _this.game.world.height - (pole3Blocks.length - 1) * block1.height;
                        dragedElement = null;
                    }
                }
                block1.input.setDragLock(false, true);
                block2.input.setDragLock(false, true);
                block3.input.setDragLock(false, true);
                if (dragedElement == null) {
                    if (pole1Blocks.length > 0) {
                        var temp_1 = pole1Blocks[pole1Blocks.length - 1];
                        if (temp_1 == 1) {
                            block3.input.enableDrag();
                        }
                        if (temp_1 == 2) {
                            block2.input.enableDrag();
                        }
                        if (temp_1 == 3) {
                            block1.input.enableDrag();
                        }
                    }
                    if (pole2Blocks.length > 0) {
                        var temp_2 = pole2Blocks[pole2Blocks.length - 1];
                        if (temp_2 == 1) {
                            block3.input.enableDrag();
                        }
                        if (temp_2 == 2) {
                            block2.input.enableDrag();
                        }
                        if (temp_2 == 3) {
                            block1.input.enableDrag();
                        }
                    }
                    if (pole3Blocks.length > 0) {
                        var temp_3 = pole3Blocks[pole3Blocks.length - 1];
                        if (temp_3 == 1) {
                            block3.input.enableDrag();
                        }
                        if (temp_3 == 2) {
                            block2.input.enableDrag();
                        }
                        if (temp_3 == 3) {
                            block1.input.enableDrag();
                        }
                    }
                    counter += 1;
                    score.text = counter.toString();
                }
            }
            console.log("1", pole1Blocks, pole2Blocks, pole3Blocks);
        });
        block1.events.onDragUpdate.add(function () {
            block2.input.disableDrag();
            block3.input.disableDrag();
            if (block1.position.y >= _this.game.world.height) {
                block1.position.y = _this.game.world.height;
            }
            else if (block1.position.y >= _this.game.world.height * 0.315) {
                var x1 = pole1.position.x;
                var x2 = pole2.position.x;
                var x3 = pole3.position.x;
                var x1Dif = Math.abs(x1 - block1.position.x);
                var x2Dif = Math.abs(x2 - block1.position.x);
                var x3Dif = Math.abs(x3 - block1.position.x);
                if (x1Dif <= x2Dif && x1Dif <= x3Dif) {
                    block1.position.x = x1;
                }
                else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
                    block1.position.x = x2;
                }
                else {
                    block1.position.x = x3;
                }
                block1.input.setDragLock(false, true);
            }
            else {
                block1.input.setDragLock(true, true);
            }
        });
        // block 2
        block2.events.onDragStart.add(function () {
            block1.input.disableDrag();
            block3.input.disableDrag();
            if (dragedElement == null && block2.position.y >= _this.game.world.height * 0.315) {
                var x1 = pole1.position.x;
                var x2 = pole2.position.x;
                var x3 = pole3.position.x;
                var x1Dif = Math.abs(x1 - block2.position.x);
                var x2Dif = Math.abs(x2 - block2.position.x);
                var x3Dif = Math.abs(x3 - block2.position.x);
                if (x1Dif <= x2Dif) {
                    dragedElement = pole1Blocks.pop();
                }
                else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
                    dragedElement = pole2Blocks.pop();
                }
                else {
                    dragedElement = pole3Blocks.pop();
                }
            }
        });
        block2.events.onDragStop.add(function () {
            if (block2.position.y >= _this.game.world.height * 0.315) {
                var x1 = pole1.position.x;
                var x2 = pole2.position.x;
                var x3 = pole3.position.x;
                var x1Dif = Math.abs(x1 - block2.position.x);
                var x2Dif = Math.abs(x2 - block2.position.x);
                var x3Dif = Math.abs(x3 - block2.position.x);
                if (x1Dif <= x2Dif) {
                    block2.position.x = x1;
                    if (pole1Blocks.length > 0 && pole1Blocks[pole1Blocks.length - 1] <= dragedElement) {
                        block2.position.y = _this.game.world.height * 0.315;
                    }
                    else {
                        pole1Blocks.push(dragedElement);
                        block2.position.y = _this.game.world.height - (pole1Blocks.length - 1) * block2.height;
                        dragedElement = null;
                    }
                }
                else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
                    block2.position.x = x2;
                    if (pole2Blocks.length > 0 && pole2Blocks[pole2Blocks.length - 1] < dragedElement) {
                        block2.position.y = _this.game.world.height * 0.315;
                    }
                    else {
                        pole2Blocks.push(dragedElement);
                        block2.position.y = _this.game.world.height - (pole2Blocks.length - 1) * block2.height;
                        dragedElement = null;
                    }
                }
                else {
                    block2.position.x = x3;
                    if (pole3Blocks.length > 0 && pole3Blocks[pole3Blocks.length - 1] <= dragedElement) {
                        block2.position.y = _this.game.world.height * 0.315;
                    }
                    else {
                        pole3Blocks.push(dragedElement);
                        block2.position.y = _this.game.world.height - (pole3Blocks.length - 1) * block2.height;
                        dragedElement = null;
                    }
                }
                block1.input.setDragLock(false, true);
                block2.input.setDragLock(false, true);
                block3.input.setDragLock(false, true);
                console.log("2 enables");
                if (dragedElement == null) {
                    if (pole1Blocks.length > 0) {
                        var temp_4 = pole1Blocks[pole1Blocks.length - 1];
                        if (temp_4 == 1) {
                            console.log(1, 1);
                            block3.input.enableDrag();
                        }
                        if (temp_4 == 2) {
                            console.log(1, 2);
                            block2.input.enableDrag();
                        }
                        if (temp_4 == 3) {
                            console.log(1, 3);
                            block1.input.enableDrag();
                        }
                    }
                    if (pole2Blocks.length > 0) {
                        var temp_5 = pole2Blocks[pole2Blocks.length - 1];
                        if (temp_5 == 1) {
                            console.log(2, 1);
                            block3.input.enableDrag();
                        }
                        if (temp_5 == 2) {
                            console.log(2, 2);
                            block2.input.enableDrag();
                        }
                        if (temp_5 == 3) {
                            console.log(2, 3);
                            block1.input.enableDrag();
                        }
                    }
                    if (pole3Blocks.length > 0) {
                        var temp_6 = pole3Blocks[pole3Blocks.length - 1];
                        if (temp_6 == 1) {
                            console.log(3, 1);
                            block3.input.enableDrag();
                        }
                        if (temp_6 == 2) {
                            console.log(3, 2);
                            block2.input.enableDrag();
                        }
                        if (temp_6 == 3) {
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
        block2.events.onDragUpdate.add(function () {
            block1.input.disableDrag();
            block3.input.disableDrag();
            if (block2.position.y >= _this.game.world.height) {
                block2.position.y = _this.game.world.height;
            }
            else if (block2.position.y >= _this.game.world.height * 0.315) {
                // console.log('vertical');
                var x1 = pole1.position.x;
                var x2 = pole2.position.x;
                var x3 = pole3.position.x;
                var x1Dif = Math.abs(x1 - block2.position.x);
                var x2Dif = Math.abs(x2 - block2.position.x);
                var x3Dif = Math.abs(x3 - block2.position.x);
                if (x1Dif <= x2Dif) {
                    block2.position.x = x1;
                }
                else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
                    block2.position.x = x2;
                }
                else {
                    block2.position.x = x3;
                }
                block2.input.setDragLock(false, true);
            }
            else {
                block2.input.setDragLock(true, true);
            }
        });
        // block 3
        block3.events.onDragStart.add(function () {
            block1.input.disableDrag();
            block2.input.disableDrag();
            if (dragedElement == null && block3.position.y >= _this.game.world.height * 0.315) {
                var x1 = pole1.position.x;
                var x2 = pole2.position.x;
                var x3 = pole3.position.x;
                var x1Dif = Math.abs(x1 - block3.position.x);
                var x2Dif = Math.abs(x2 - block3.position.x);
                var x3Dif = Math.abs(x3 - block3.position.x);
                if (x1Dif <= x2Dif) {
                    dragedElement = pole1Blocks.pop();
                }
                else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
                    dragedElement = pole2Blocks.pop();
                }
                else {
                    dragedElement = pole3Blocks.pop();
                }
            }
        });
        block3.events.onDragStop.add(function () {
            console.log(block3.position.y, _this.game.world.height * 0.315);
            if (block3.position.y >= _this.game.world.height * 0.315) {
                var x1 = pole1.position.x;
                var x2 = pole2.position.x;
                var x3 = pole3.position.x;
                var x1Dif = Math.abs(x1 - block3.position.x);
                var x2Dif = Math.abs(x2 - block3.position.x);
                var x3Dif = Math.abs(x3 - block3.position.x);
                if (x1Dif <= x2Dif) {
                    if (pole1Blocks.length > 0 && pole1Blocks[pole1Blocks.length - 1] <= dragedElement) {
                        block3.position.y = _this.game.world.height * 0.315;
                    }
                    else {
                        pole1Blocks.push(dragedElement);
                        block3.position.y = _this.game.world.height - (pole1Blocks.length - 1) * block3.height;
                        dragedElement = null;
                    }
                    block3.position.x = x1;
                }
                else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
                    block3.position.x = x2;
                    if (pole2Blocks.length > 0 && pole2Blocks[pole2Blocks.length - 1] <= dragedElement) {
                        block3.position.y = _this.game.world.height * 0.315;
                    }
                    else {
                        pole2Blocks.push(dragedElement);
                        block3.position.y = _this.game.world.height - (pole2Blocks.length - 1) * block3.height;
                        dragedElement = null;
                    }
                }
                else {
                    block3.position.x = x3;
                    if (pole3Blocks.length > 0 && pole3Blocks[pole3Blocks.length - 1] <= dragedElement) {
                        block3.position.y = _this.game.world.height * 0.315;
                    }
                    else {
                        pole3Blocks.push(dragedElement);
                        block3.position.y = _this.game.world.height - (pole3Blocks.length - 1) * block3.height;
                        dragedElement = null;
                    }
                }
                block1.input.setDragLock(false, true);
                block2.input.setDragLock(false, true);
                block3.input.setDragLock(false, true);
                console.log("3 enables");
                if (dragedElement == null) {
                    if (pole1Blocks.length > 0) {
                        var temp_7 = pole1Blocks[pole1Blocks.length - 1];
                        if (temp_7 == 1) {
                            console.log(1, 1);
                            block3.input.enableDrag();
                        }
                        if (temp_7 == 2) {
                            console.log(1, 2);
                            block2.input.enableDrag();
                        }
                        if (temp_7 == 3) {
                            console.log(1, 3);
                            block1.input.enableDrag();
                        }
                    }
                    if (pole2Blocks.length > 0) {
                        var temp_8 = pole2Blocks[pole2Blocks.length - 1];
                        if (temp_8 == 1) {
                            console.log(2, 1);
                            block3.input.enableDrag();
                        }
                        if (temp_8 == 2) {
                            console.log(2, 2);
                            block2.input.enableDrag();
                        }
                        if (temp_8 == 3) {
                            console.log(2, 3);
                            block1.input.enableDrag();
                        }
                    }
                    if (pole3Blocks.length > 0) {
                        var temp_9 = pole3Blocks[pole3Blocks.length - 1];
                        if (temp_9 == 1) {
                            console.log(3, 1);
                            block3.input.enableDrag();
                        }
                        if (temp_9 == 2) {
                            console.log(3, 2);
                            block2.input.enableDrag();
                        }
                        if (temp_9 == 3) {
                            console.log(3, 3);
                            block1.input.enableDrag();
                        }
                    }
                    counter += 1;
                    score.text = counter.toString();
                }
            }
            console.log("3", pole1Blocks, pole2Blocks, pole3Blocks);
            if (pole3Blocks.length == 3) {
                var style = {
                    font: 'bold 20vw Times',
                    fill: '#D0171B',
                    align: "center"
                };
                var end = _this.game.add.text(_this.game.world.centerX, _this.game.world.centerY, 'WIN', style);
                end.anchor.setTo(0.5);
                end.visible = true;
                block1.input.disableDrag();
                block2.input.disableDrag();
                block3.input.disableDrag();
                var style1 = {
                    font: 'bold 4vw Times',
                    fill: '#D0171B',
                    align: "center"
                };
                var replay = _this.game.add.text(_this.game.world.centerX * 1.5, _this.game.world.height * 0.1, 'REPLAY', style1);
                replay.anchor.setTo(0.5);
                replay.visible = true;
                // replay.input.enabled = true;
                replay.inputEnabled = true;
                replay.events.onInputDown.add(function () {
                    // console.log("replay")
                    _this.game.state.restart();
                });
            }
        });
        block3.events.onDragUpdate.add(function () {
            block1.input.disableDrag();
            block2.input.disableDrag();
            if (block3.position.y >= _this.game.world.height) {
                block3.position.y = _this.game.world.height;
            }
            if (block3.position.y >= _this.game.world.height * 0.315) {
                // console.log('vertical');
                var x1 = pole1.position.x;
                var x2 = pole2.position.x;
                var x3 = pole3.position.x;
                var x1Dif = Math.abs(x1 - block3.position.x);
                var x2Dif = Math.abs(x2 - block3.position.x);
                var x3Dif = Math.abs(x3 - block3.position.x);
                if (x1Dif <= x2Dif) {
                    block3.position.x = x1;
                }
                else if (x2Dif <= x1Dif && x2Dif <= x3Dif) {
                    block3.position.x = x2;
                }
                else {
                    block3.position.x = x3;
                }
                block3.input.setDragLock(false, true);
            }
            else {
                block3.input.setDragLock(true, true);
            }
        });
    };
    AppComponent.prototype.update = function () {
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("./src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map