import Tile from './tile.js';

export default class Board {
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
      this.grid[idx.x][idx.y] = new Tile(randNum, false, true, null, {x: idx.x, y: idx.y}, null, Math.random(), null);
      this.tileIds[this.grid[idx.x][idx.y].id] = {x: idx.x, y: idx.y};
    }
  }

  slide(row, rowPos) {
    const arr = row.filter(cell => cell instanceof Tile);
    const unfilled = Array(4 - arr.length).fill(0);
    const newArr = unfilled.concat(arr);
    return newArr;
  }

  combine(row, rowPos) {
    for (var i = 3; i > 0; i--) {
      if (row[i] instanceof Tile && row[i - 1] instanceof Tile && row[i].value === row[i - 1].value) {
        row[i] = new Tile(row[i].value * 2, true, false, null, null, null, Math.random(), [row[i].id, row[i - 1].id]);
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
    } else if (tile.merged) {

      document.querySelectorAll(`.tile-position-${this.tileIds[tile.mergedFrom[0]].x + 1}-${this.tileIds[tile.mergedFrom[0]].y + 1}`)[0].remove();
      document.querySelectorAll(`.tile-position-${this.tileIds[tile.mergedFrom[1]].x + 1}-${this.tileIds[tile.mergedFrom[1]].y + 1}`)[0].remove();
      tileOuter.setAttribute('class', `tile tile-${tile.value} tile-position-${tile.pos.x + 1}-${tile.pos.y + 1} merged`);
      tileInner.setAttribute('class', 'tile-inner');
      tileInner.innerHTML = tile.value;
      let tileContainer = document.querySelectorAll('.tile-container')[0];
      tileOuter.appendChild(tileInner);
      tileContainer.appendChild(tileOuter);
      let mergedId = tile.mergedFrom;
      tile.mergedFrom.forEach(id => {
        delete this.tileIds[id];
      });
    } else {
        window.requestAnimationFrame(() => {
          let tileP = document.querySelectorAll(`.tile-${tile.value}.tile-position-${tile.prevPos.x + 1}-${tile.prevPos.y + 1}`)[0];
          tileP.setAttribute('class', `tile tile-${tile.value} tile-position-${tile.pos.x + 1}-${tile.pos.y + 1}`);
        });
    }
  }

  drawBoard() {
    window.requestAnimationFrame(() => {
      let tileContainer = document.querySelectorAll('.tile-container')[0];
      this.fillNumbers();
      this.scoreTag.innerHTML = `Score: ${this.score}`;
    });
  }

}
