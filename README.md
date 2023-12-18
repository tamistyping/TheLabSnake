This is a classic snake game based in a lab where the snake grows by feeding off different colored test tubes.

I used HTML5, CSS & JavaScript to create this game.

https://tamistyping.github.io/TheLabSnake/ //you can access the game using this link

Anyway, this game took me 5 days to code & below summarises the steps I took to complete this magnificent game!



- I spent an hour or so creating a plan on Canva to give me a rough idea of what I'd be creating-
  
  <img width="873" alt="Screenshot 2023-12-18 at 16 41 22" src="https://github.com/tamistyping/TheLabSnake/assets/114356636/307c7372-440c-4718-bda7-f672b6ba73ea">
  
1) I started by creating my grid -
  ```
  const board = document.querySelector(".board");
  const width = 10;
  const height = 10;
  const cellCount = width * height;
  
  function createBoard() {
      for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div");
        cell.style.height = `${100 / height}`;
        cell.style.width = `${100 / width}`;
        board.appendChild(cell);
        cells.push(cell);
      }
  ```

2) I then created 'random' test tubes to appear around the board. I started with declaring the variables & then defined a createFood() function.
```
  let foodPosition = Math.floor(Math.random() * cellCount);
  let snakeFood = ["red", "food", "orange", "purple", "blue"];
  let randomColor = snakeFood[Math.floor(Math.random() * snakeFood.length)];

  function createFood() {
      cells[foodPosition].classList.remove(randomColor); //remove food on board
      foodPosition = Math.floor(Math.random() * cellCount); //create random space again
      randomColor = snakeFood[Math.floor(Math.random() * snakeFood.length)]; //generate random color again
      cells[foodPosition].classList.add(randomColor); //add it to random space

      if (snake.includes(foodPosition)) {
        cells[foodPosition].classList.remove(randomColor);
        createFood();
      }
    }
```

  3) I then went on to create my snake and added movement functions to it. I tried to make my movement functions as simple as possible-

```
  function handleMovement(event) {
        const key = event.keyCode;
        const up = 38;
        const down = 40;
        const left = 37;
        const right = 39;
  
        if (key === lastKey) {
          return;
        }
  
        if (key === up) {
          // currentPosition -= width
          snakeDirection = -10;
        } else if (key === down) {
          // currentPosition += width
          snakeDirection = 10;
        } else if (key === left) {
          // currentPosition--
          snakeDirection = -1;
        } else if (key === right) {
          // currentPosition++
          snakeDirection = 1;
        }
  
        addSnake(currentPosition);
      }
  }
```

4) I Then created a eatFood() function which gets triggered by the IF statement I made-

```
  if (!cells[snake[0]].classList.contains(randomColor)) {
            snake.pop();
          } else {
            console.log(newInterval);
            eatFood();
          }
```

5) I then created a points variable and kept track of pointsScore. Every time ‘eatFood()’ gets called, the points go up by 1.

6) Then I added another IF statement whereby the game would reset if the snake 'ate' itself.

```
   if (snake.includes(headPosition)) {
        console.log("snake ate himself oops");
        deadState();
        clearInterval(snakeTimer);
        return;
      }
```
7) I found a bug where if a key gets pressed twice consecutively when landing on a test tube, the food regenerates multiple times. I created a 'lastKey' variable and made an IF statement to fix the bug -

```
   if (key === lastKey) {
          return;
      }
```

8) I added in other features such as highScore, audio, start pages & ending pages which I had fun coding, especially designing the looks on CSS.


Conclusion: For my first project, I'm super happy with how it turned out. I wanted to add a function whereby the snake changes to the color of the test tube it eats, but every time I tried doing this, my code would break. Maybe, I'll have a go at implementing this sometime in the future when I'm better experienced
