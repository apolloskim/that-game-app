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
/* harmony import */ var _tile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile.js */ "./lib/tile.js");


class Board {
  constructor() {
    this.grid = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ];
    this.tileIds = {};
    this.score = 0;
    this.previousBoard = null;
    this.position = [[]];
    this.scoreTag = document.getElementById("score");
    this.newTile = [];
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
    if (unfilled.length > 0) {
      let idx = unfilled[Math.floor(Math.random() * unfilled.length)];
      let randNum = Math.floor(Math.random() * 5) > 2 ? 4 : 2;
      this.grid[idx.x][idx.y] = new _tile_js__WEBPACK_IMPORTED_MODULE_0__["default"](randNum, false, true, null, {x: idx.x, y: idx.y}, null, Math.random(), null);
      this.tileIds[this.grid[idx.x][idx.y].id] = {x: idx.x, y: idx.y};
    }
  }

  slide(row, rowPos) {
    const arr = row.filter(cell => cell instanceof _tile_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
    const unfilled = Array(4 - arr.length).fill(0);
    const newArr = unfilled.concat(arr);
    return newArr;
  }

  combine(row, rowPos) {
    for (var i = 3; i > 0; i--) {
      if (row[i] instanceof _tile_js__WEBPACK_IMPORTED_MODULE_0__["default"] && row[i - 1] instanceof _tile_js__WEBPACK_IMPORTED_MODULE_0__["default"] && row[i].value === row[i - 1].value) {
        row[i] = new _tile_js__WEBPACK_IMPORTED_MODULE_0__["default"](row[i].value * 2, true, false, null, null, null, Math.random(), [row[i].id, row[i - 1].id]);
        // row[i].mergedFrom = [row[i].id, row[i - 1].id];
        row[i - 1] = 0;
        this.score += row[i].value;
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

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        prevGrid[i][j] = this.grid[i][j];
      }
    }
    return prevGrid;
  }

  fillNumbers() {
    // this.grid = this.inverse();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.grid[i][j]) {
          this.addTile(this.grid[i][j], [i, j]);
        }
      }
    }

    this.newTile.forEach(tile => {
      let tileOuter = document.createElement('div');
      let tileInner = document.createElement('div');

      tileOuter.setAttribute('class', `tile tile-${tile.value} tile-position-${tile.pos.x + 1}-${tile.pos.y + 1} new`);
      tileInner.setAttribute('class', 'tile-inner');
      tileInner.innerHTML = tile.value;
      let tileContainer = document.querySelectorAll('.tile-container')[0];
      tileOuter.appendChild(tileInner);
      tileContainer.appendChild(tileOuter);
    });

    this.newTile = [];

  }

  addTile(tile, pos) {
    let tileOuter = document.createElement('div');
    let tileInner = document.createElement('div');


    if (tile.isNew) {
      this.newTile.push(tile);
      // tileOuter.setAttribute('class', `tile tile-${tile.value} tile-position-${pos[0] + 1}-${pos[1] + 1}`);
      // tileInner.setAttribute('class', 'tile-inner');
      // tileInner.innerHTML = tile.value;
      // let tileContainer = document.querySelectorAll('.tile-container')[0];
      // tileOuter.appendChild(tileInner);
      // tileContainer.appendChild(tileOuter);
    } else if (tile.merged) {

      document.querySelectorAll(`.tile-position-${this.tileIds[tile.mergedFrom[0]].x + 1}-${this.tileIds[tile.mergedFrom[0]].y + 1}`)[0].remove();
      document.querySelectorAll(`.tile-position-${this.tileIds[tile.mergedFrom[1]].x + 1}-${this.tileIds[tile.mergedFrom[1]].y + 1}`)[0].remove();
      tileOuter.setAttribute('class', `tile tile-${tile.value} tile-position-${tile.pos.x + 1}-${tile.pos.y + 1} merged`);
      tileInner.setAttribute('class', 'tile-inner');
      tileInner.innerHTML = tile.value;
      // debugger
      // document.querySelectorAll(`.tile-position-${pos[0] + 1}-${pos[1] + 1}`)[0].remove();
      let tileContainer = document.querySelectorAll('.tile-container')[0];
      tileOuter.appendChild(tileInner);
      tileContainer.appendChild(tileOuter);
      let mergedId = tile.mergedFrom;
      tile.mergedFrom.forEach(id => {
        delete this.tileIds[id];
      });
      // delete this.tileIds[mergedId];
    } else {
        window.requestAnimationFrame(() => {
          let tileP = document.querySelectorAll(`.tile-${tile.value}.tile-position-${tile.prevPos.x + 1}-${tile.prevPos.y + 1}`)[0];
          // debugger
          // tileP.classList.remove(`tile-position-${tile.prevPos.x + 1}-${tile.prevPos.y + 1}`);
          tileP.setAttribute('class', `tile tile-${tile.value} tile-position-${tile.pos.x + 1}-${tile.pos.y + 1}`);
          // debugger
          // tileP.classList.add(`tile-position-${tile.pos.x + 1}-${tile.pos.y + 1}`);
        });
    }


    // let tilePosition = document.querySelectorAll(`.${tileOuter.className.split(' ')[2]}`);

  }

  drawBoard() {
    window.requestAnimationFrame(() => {
      let tileContainer = document.querySelectorAll('.tile-container')[0];
      // while (tileContainer.firstChild) {
      //   tileContainer.removeChild(tileContainer.firstChild);
      // }
      this.fillNumbers();
      this.scoreTag.innerHTML = `Score: ${this.score}`;
    });
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
/* harmony import */ var _tile_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tile.js */ "./lib/tile.js");




class Game {
  constructor() {
    this.board = new _board_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

    this.handleKey = this.handleKey.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
    this.handleSwipeEnd = this.handleSwipeEnd.bind(this);
    this.start = null;
    this.down = false;
  }

  setup() {
    this.board.addNumber();
    this.board.addNumber();
    console.log(this.board.grid);
    console.log(this.board.tileIds);
    let invertedBoard = this.board.inverse();
    console.log(`------------------------------`);
    let tileStr = '';
    invertedBoard.forEach(row => {
      let tileArr = [];
      row.forEach(tile => {
        tileArr.push(tile instanceof _tile_js__WEBPACK_IMPORTED_MODULE_1__["default"] ? tile.value : 0);
      });
      tileStr += `| ${tileArr.join(' | ')} |\n`;
    });
    console.log(tileStr);
    console.log(`------------------------------`);
    this.board.drawBoard();
  }

  handleKey(e) {
    let flipped = false;
    let inversed = false;
    let pressed = false;

    this.board.grid.forEach(row => {
      row.forEach(tile => {
        if (tile instanceof _tile_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
          tile.prevPos = tile.pos;
          tile.isNew = false;
          tile.merged = false;
          tile.mergedFrom = null;
        }
      })
    });

    // this.board.tileIds = {};
    //
    // for (let i = 0; i < 4; i++) {
    //   for (let j = 0; j < 4; j++) {
    //     if (this.board.grid[i][j] instanceof Tile) {
    //       this.board.tileIds[this.board.grid[i][j].id] = {x: i, y: j};
    //     }
    //   }
    // }

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
        // debugger
        inversed = true;
        pressed = true;


        break;
      case "ArrowLeft":
        this.board.grid = this.board.inverse();
        this.board.reverse();
        // debugger
        inversed = true;
        flipped = true;
        pressed = true;
        break;
    }

    if (pressed) {
      for (var i = 0; i < 4; i++) {
        this.board.grid[i] = this.board.slide(this.board.grid[i], i);
        this.board.grid[i] = this.board.combine(this.board.grid[i], i);
        this.board.grid[i] = this.board.slide(this.board.grid[i], i);
      }

      if (flipped) {
        this.board.reverse();
      }

      if (inversed) {
        this.board.grid = this.board.inverse();
      }

      // this.board.tileIds = {};

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (this.board.grid[i][j] instanceof _tile_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
            this.board.grid[i][j].pos = {x: i, y: j};
            this.board.tileIds[this.board.grid[i][j].id] = {x: i, y: j};
          }
        }
      }

      // debugger

      this.board.addNumber();
      this.board.drawBoard();
      console.log(this.board.grid);
      console.log(this.board.tileIds);
      let invertedBoard = this.board.inverse();
      console.log(`------------------------------`);
      let tileStr = '';
      invertedBoard.forEach(row => {
        let tileArr = [];
        row.forEach(tile => {
          tileArr.push(tile instanceof _tile_js__WEBPACK_IMPORTED_MODULE_1__["default"] ? tile.value : 0);
        });
        tileStr += `| ${tileArr.join(' | ')} |\n`;
      });
      console.log(tileStr);
      console.log(`------------------------------`);
    }
  }

  handlePress(e) {
    if (this.down) return;
    e.preventDefault();
    this.down = true;
    // debugger
    if (this.gameOver()) {
      // document.getElementById('game-over').style.opacity = 1;
      // document.getElementById('game-over').style.transition = "all 2s";
      // document.getElementById('game-over').innerHTML = "Game Over!";
      // document.getElementById('over').style.display = 'block';
      document.querySelectorAll('.game-over')[0].style.visibility = 'visible';
      document.querySelectorAll('.game-over')[0].innerHTML = 'Game Over!'
      this.removeKeyPress();
    } else {
      this.handleKey(e);
    }
    this.down = false;
    // debugger
  }

  handleSwipe(e) {
    e.preventDefault();
    e.stopPropagation();
    if(e.touches.length === 1){
      //just one finger touched
      this.start = e.touches.item(0).clientX;
      this.startY = e.touches.item(0).clientY;
    }
  }

  handleSwipeEnd(e) {
    e.preventDefault();
    e.stopPropagation();
    var offset = 100;//at least 100px are a swipe
    if(this.start){
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
        this.board.grid[i] = this.board.slide(this.board.grid[i], i);
        this.board.grid[i] = this.board.combine(this.board.grid[i], i);
        this.board.grid[i] = this.board.slide(this.board.grid[i], i);
      }

      if (flipped) {
        this.board.reverse();
      }

      if (inversed) {
        this.board.grid = this.board.inverse();
      }
      this.board.addNumber();
      this.board.drawBoard();
    }
  }

  removeKeyPress() {
    window.removeEventListener("keydown", this.handlePress);
  }

  addKeyPress() {
    window.addEventListener('keydown', this.handlePress);
  }

  play() {
    this.addKeyPress();
    window.addEventListener("touchstart", this.handleSwipe);
    window.addEventListener("touchend", this.handleSwipeEnd);
  }

  gameOver() {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.board.grid[i][j] === 0) {
          return false;
        }

        if (j < 3 && (this.board.grid[i][j].value === this.board.grid[i][j + 1].value || this.board.inverse()[i][j].value === this.board.inverse()[i][j + 1].value)) {
          return false;
        }
      }
    }
    return true;
  }
}


/***/ }),

/***/ "./lib/tile.js":
/*!*********************!*\
  !*** ./lib/tile.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return tile; });
class tile {
  constructor(value, merged, isNew, movedFrom, pos, prevPos, id, mergedFrom) {
    this.value = value;
    this.merged = merged;
    this.isNew = isNew;
    this.mergedFrom = mergedFrom;
    this.movedFrom = movedFrom;
    this.pos = pos;
    this.prevPos = prevPos;
    this.id = id;
  }
}


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map