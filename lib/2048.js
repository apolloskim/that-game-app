
let grid;
let unfilled = [];
const p = 10;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const bw = 400;
const bh = 400;

function setup() {
  grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ];

  addNumber();
  addNumber();
  console.table(grid);
  context.textAlign = "top";
  context.textBaseline = "top";
  drawBoard();

  
}

function drawBoard() {
  for (var x = 0; x <= bw; x += 100) {
      context.moveTo(0.5 + x + p, p);
      context.lineTo(0.5 + x + p, bh + p);
  }


  for (var x = 0; x <= bh; x += 100) {
      context.moveTo(p, 0.5 + x + p);
      context.lineTo(bw + p, 0.5 + x + p);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== 0) {
        context.font = "50px arial";
        context.fillStyle = "purple";
        context.fillText(grid[i][j], i * 100 + (100 / 2), j * 100 + (100 / 2));
      }
    }
  }


  context.strokeStyle = "black";
  context.stroke();
}

function addNumber(){
  unfilled = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        unfilled.push({x: i, y: j});
      }
    }
  }
  let idx = unfilled[Math.floor(Math.random() * unfilled.length)];
  grid[idx.x][idx.y] = Math.floor(Math.random() * 5) > 2 ? 4 : 2;
}

function slide(row) {
  const arr = row.filter(value => value);
  // debugger
  const unfilled = Array(4 - arr.length).fill(0);
  const newArr = unfilled.concat(arr);
  return newArr;
}

function combine(row) {
  for (var i = 3; i > 0; i--) {
    if (row[i] === row[i - 1]) {
      row[i] = row[i] * 2;
      row[i - 1] = 0;
    }
  }
  return row;
}

function inverse(grid) {
  let newGrid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      newGrid[i][j] = grid[j][i];
    }
  }
  return newGrid;
}

document.addEventListener("DOMContentLoaded", setup());
