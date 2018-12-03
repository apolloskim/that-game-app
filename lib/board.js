export default class Board {
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
