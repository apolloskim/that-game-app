/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/2048.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/2048.js":
/*!*********************!*\
  !*** ./lib/2048.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./lib/game.js");



document.addEventListener("DOMContentLoaded", () => {
  let game = new _game_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  game.setup();
  game.play();
});


/***/ }),

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Board; });
class Board {
  constructor() {
    this.grid = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ];
    this.score = 0;
    this.previousBoard = null;
    this.position = [[]];
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.scoreTag = document.getElementById("score");
    this.colors = [
      ['white', 'white', 'white', 'white'],
      ['white', 'white', 'white', 'white'],
      ['white', 'white', 'white', 'white'],
      ['white', 'white', 'white', 'white']
    ];
  }

  addNumber() {
    let unfilled = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] === 0) {
          unfilled.push({x: i, y: j});
        }
      }
    }
    let idx = unfilled[Math.floor(Math.random() * unfilled.length)];
    this.grid[idx.x][idx.y] = Math.floor(Math.random() * 5) > 2 ? 4 : 2;
  }

  slide(row) {
    const arr = row.filter(value => value);
    const unfilled = Array(4 - arr.length).fill(0);
    const newArr = unfilled.concat(arr);
    return newArr;
  }

  combine(row, row_pos) {
    for (var i = 3; i > 0; i--) {
      if (row[i] === row[i - 1]) {
        row[i] = row[i] * 2;
        row[i - 1] = 0;
        this.score += row[i];
      }
    }
    return row;
  }

  inverse() {
    let newGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];

    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        newGrid[i][j] = this.grid[j][i];
      }
    }
    return newGrid;
  }

  reverse() {
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i].reverse();
    }
  }

  prevBoard() {
    let prevGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];

    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        prevGrid[i][j] = this.grid[i][j];
      }
    }
    return prevGrid;
  }

  fillNumbers() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.scoreTag.innerHTML = this.score;

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] !== 0) {
          if (this.grid[i][j] === 8) {
            this.colors[i][j] = '#CFD770';
          } else if (this.grid[i][j] === 16) {
            this.colors[i][j] = '#DA7E72';
          } else if (this.grid[i][j] === 32) {
            this.colors[i][j] = '#AF5B8B';
          } else if (this.grid[i][j] === 64) {
            this.colors[i][j] = '#765192';
          } else if (this.grid[i][j] === 128) {
            this.colors[i][j] = '#56A567';
          } else if (this.grid[i][j] === 256) {
            this.colors[i][j] = "#DAD672";
          } else if (this.grid[i][j] === 512) {
            this.colors[i][j] = "#F7012D";
          } else if (this.grid[i][j] === 1024) {
            this.colors[i][j] = "#E70183";
          } else if (this.grid[i][j] === 2048) {
            this.colors[i][j] = "#FF7503";
          } else {
            this.colors[i][j] = 'white';
          }

          this.context.font = "35px arial";
          this.context.fillStyle = this.colors[i][j];
          this.context.fillText(this.grid[i][j], i * 100 + (100 / 2), j * 100 + (100 / 2));
        }
      }
    }

    this.context.strokeStyle = "white";
    this.context.stroke();
  }

  drawBoard() {
    const p = 10;


    const bw = 400;
    const bh = 400;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.scoreTag.innerHTML = this.score;
    this.context.textAlign = "center";
    this.context.textBaseline = "top";
    for (var x = 0; x <= bw; x += 100) {
        this.context.moveTo(2 + x + p, p);
        this.context.lineTo(2 + x + p, bh + p);
    }


    for (var x = 0; x <= bh; x += 100) {
        this.context.moveTo(p, 2 + x + p);
        this.context.lineTo(bw + p, 2 + x + p);
    }


    this.context.strokeStyle = "white";
    this.context.stroke();

  }
}


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Game; });
/* harmony import */ var _board_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board.js */ "./lib/board.js");



class Game {
  constructor() {
    this.board = new _board_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

    this.handleKey = this.handleKey.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.handleSwipeEnd = this.handleSwipeEnd.bind(this);
    this.start = null;
  }

  setup() {
    this.board.addNumber();
    this.board.addNumber();
    this.board.drawBoard();
    this.board.fillNumbers();
  }

  handleKey(e) {

    let flipped = false;
    let inversed = false;
    let pressed = false;
    switch(e.code) {
      case "ArrowUp":
        this.board.reverse();
        flipped = true;
        pressed = true;
        break;
      case "ArrowDown":
        pressed = true;
        break;
      case "ArrowRight":
        this.board.grid = this.board.inverse();
        inversed = true;
        pressed = true;
        break;
      case "ArrowLeft":
        this.board.grid = this.board.inverse();
        this.board.reverse();
        inversed = true;
        flipped = true;
        pressed = true;
        break;
    }

    if (pressed) {
      for (var i = 0; i < 4; i++) {
        this.board.grid[i] = this.board.slide(this.board.grid[i]);
        this.board.grid[i] = this.board.combine(this.board.grid[i], i);
        this.board.grid[i] = this.board.slide(this.board.grid[i]);
      }

      if (flipped) {
        this.board.reverse();
      }

      if (inversed) {
        this.board.grid = this.board.inverse();
      }
      this.board.fillNumbers();
      this.board.addNumber();
    }
  }

  handlePress(e) {
    e.preventDefault();
    if (this.gameOver()) {
      document.getElementById('game-over').style.opacity = 1;
      document.getElementById('game-over').style.transition = "all 2s";
      document.getElementById('game-over').innerHTML = "Game Over!";
      document.getElementById('over').style.display = 'block';
      this.removeKeyPress();
    } else {
      this.handleKey(e);
    }
  }

  handleSwipe(e) {
    e.preventDefault();
    if(e.touches.length === 1){
      //just one finger touched
      this.start = e.touches.item(0).clientX;
      this.startY = e.touches.item(0).clientY;
    }
  }

  handleSwipeEnd(e) {
    e.preventDefault();
    var offset = 100;//at least 100px are a swipe
    if(this.start){
      // debugger
      //the only finger that hit the screen left it
      var end = event.changedTouches.item(0).clientX;
      var endY = event.changedTouches.item(0).clientY;

      let flipped = false;
      let inversed = false;
      let pressed = false;

      if(end > this.start + offset){
       //a left -> right swipe
       this.board.grid = this.board.inverse();
       inversed = true;
       pressed = true;
      }
      if(end < this.start - offset ){
       //a right -> left swipe
       this.board.grid = this.board.inverse();
       this.board.reverse();
       inversed = true;
       flipped = true;
       pressed = true;
      }
      if(endY > this.startY + offset) {
        pressed = true;
      }
      if(endY < this.startY - offset) {
        this.board.reverse();
        flipped = true;
        pressed = true;
      }

      for (var i = 0; i < 4; i++) {
        this.board.grid[i] = this.board.slide(this.board.grid[i]);
        this.board.grid[i] = this.board.combine(this.board.grid[i], i);
        this.board.grid[i] = this.board.slide(this.board.grid[i]);
      }

      if (flipped) {
        this.board.reverse();
      }

      if (inversed) {
        this.board.grid = this.board.inverse();
      }
      this.board.fillNumbers();
      this.board.addNumber();

    }
  }

  removeKeyPress() {
    window.removeEventListener("keydown", this.handlePress);
  }

  play() {
    window.addEventListener("keydown", this.handlePress);
    window.addEventListener("touchstart", this.handleSwipe);
    window.addEventListener("touchend", this.handleSwipeEnd);
  }

  gameOver() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        // debugger
        if (this.board.grid[i][j] === 0) {
          return false;
        }
        if (this.board.grid[i][j] === this.board.grid[i][j + 1] || this.board.inverse()[i][j] === this.board.inverse()[i][j + 1]) {
          return false;
        }
      }
    }
    return true;
  }

}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map