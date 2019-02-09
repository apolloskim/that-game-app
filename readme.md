# 2048: Combine Numbers!

[Play here!](https://apolloskim.github.io/2048-Combine-Numbers/)

![Alt Text](2048-demo.gif)

### Overview

2048: *Combine Numbers!* is inspired by the original [2048](https://play2048.co/) game.

The objective is to slide numbered tiles on a grid to combine them to a create a new tile numbered 2048. The game will start with only two numbered tiles in random positions, and each will have a value of either 2 or 4.

Depending on which arrow key you press, the grid will slide to that direction. The tiles with the same number will merge, creating a new tile with double the number.

### How to Play

There are four ways to move the tiles:

1. up arrow
2. down arrow
3. left arrow
4. right arrow

According to the direction of the arrow, the tiles will slide accordingly. After sliding, if the tiles that are adjacent to each other have the same number, they will merge to create a new tile with double the value. Once you create a new tile with the number 2048, you have won the game. The game will be over and you have lost if the grid is filled entirely with numbered tiles, none of which have any neighbor tiles with the same number.

### Languages Used

HTML, CSS, and Javascript was used to create this game.

* *HTML*: Used to structure the initial page layout.
* *CSS*: Used to style the board, tile animation, and the general page.
* *Javascript*: Used to create the board class, tile class, and the game class.

### Features

I used *requestAnimationFrame()* to update the DOM every time a user presses a key. There were three conditions that I had to consider before updating the tiles.

1. If the tile was **new**, I pushed the tile to an array, and for each tile in the array, created a new HTML element, appending it to the the *tile-container* in the DOM:

```Javascript
addTile(tile, pos) {
  ...
  if (tile.isNew) {
    this.newTile.push(tile);
  }
  ...
}

fillNumbers() {
  ...
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
```

2. If the tile was **merged** from two previous tiles, I created a new HTML element, set its class to the new position, appended to the tile-container in the DOM, then deleted the previous tile in the DOM:

```Javascript
addTile(tile, pos) {
  let tileOuter = document.createElement('div');
  let tileInner = document.createElement('div');
  ...
   else if (tile.merged) {
    document.querySelectorAll(`.tile-position-${this.tileIds[tile.mergedFrom[0]].x + 1}-${this.tileIds[tile.mergedFrom[0]].y + 1}`)[0].remove();
    document.querySelectorAll(`.tile-position-${this.tileIds[tile.mergedFrom[1]].x + 1}-${this.tileIds[tile.mergedFrom[1]].y + 1}`)[0].remove();
    tileOuter.setAttribute('class', `tile tile-${tile.value} tile-position-${tile.pos.x + 1}-${tile.pos.y + 1} merged`);
    tileInner.setAttribute('class', 'tile-inner');
    tileInner.innerHTML = tile.value;
    let tileContainer = document.querySelectorAll('.tile-container')[0];
    tileOuter.appendChild(tileInner);
    tileContainer.appendChild(tileOuter);
    ...
  }
  ...
}
```

3. If the tile was neither **new** or **merged**, then I simply replaced its CSS class from its previous position to its new position:

```Javascript
addTile(tile, pos) {
  ...
  else {
      window.requestAnimationFrame(() => {
        let tileP = document.querySelectorAll(`.tile-${tile.value}.tile-position-${tile.prevPos.x + 1}-${tile.prevPos.y + 1}`)[0];
        tileP.setAttribute('class', `tile tile-${tile.value} tile-position-${tile.pos.x + 1}-${tile.pos.y + 1}`);
      });
  }
}
```

Thus, the function for updating the DOM is as such:

```Javascript
drawBoard() {
  window.requestAnimationFrame(() => {
    let tileContainer = document.querySelectorAll('.tile-container')[0];
    this.fillNumbers();
    this.scoreTag.innerHTML = `Score: ${this.score}`;
  });
}
```

### Future Plans
* Add better styling for tiles with numbers over 256.
* Add a ranking table of users based on the number of points won.
