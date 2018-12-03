import Board from './board.js';


export default class Game {
  constructor() {
    this.board = new Board();

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
