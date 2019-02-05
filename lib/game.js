import Board from './board.js';
import Tile from './tile.js';


export default class Game {
  constructor() {
    this.board = new Board();

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
    // console.log(this.board.grid);
    // console.log(this.board.tileIds);
    // let invertedBoard = this.board.inverse();
    // console.log(`------------------------------`);
    // let tileStr = '';
    // invertedBoard.forEach(row => {
    //   let tileArr = [];
    //   row.forEach(tile => {
    //     tileArr.push(tile instanceof Tile ? tile.value : 0);
    //   });
    //   tileStr += `| ${tileArr.join(' | ')} |\n`;
    // });
    // console.log(tileStr);
    // console.log(`------------------------------`);
    this.board.drawBoard();
  }

  handleKey(e) {
    let flipped = false;
    let inversed = false;
    let pressed = false;

    this.board.grid.forEach(row => {
      row.forEach(tile => {
        if (tile instanceof Tile) {
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

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (this.board.grid[i][j] instanceof Tile) {
            this.board.grid[i][j].pos = {x: i, y: j};
            this.board.tileIds[this.board.grid[i][j].id] = {x: i, y: j};
          }
        }
      }

      this.board.addNumber();
      this.board.drawBoard();
      // console.log(this.board.grid);
      // console.log(this.board.tileIds);
      // let invertedBoard = this.board.inverse();
      // console.log(`------------------------------`);
      // let tileStr = '';
      // invertedBoard.forEach(row => {
      //   let tileArr = [];
      //   row.forEach(tile => {
      //     tileArr.push(tile instanceof Tile ? tile.value : 0);
      //   });
      //   tileStr += `| ${tileArr.join(' | ')} |\n`;
      // });
      // console.log(tileStr);
      // console.log(`------------------------------`);
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
