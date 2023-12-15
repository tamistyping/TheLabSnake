let song;
let z = 0;

document.addEventListener("DOMContentLoaded", () => {
  const startPage = document.querySelector(".start-page");
  const gamePage = document.querySelector(".game-page");
  const startGame = document.getElementById("startGame");
  const endPage = document.querySelector(".end-page");
  const resetButton = document.getElementById("reset");
  const muteButton = document.getElementById("mute");

  song = new Audio("audio.mp3");
  document.getElementById("startGame").addEventListener("click", () => {
    song.play();
    song.volume = 0.1;
  });

  startGame.addEventListener("click", handleStart);
  function handleStart() {
    startPage.style.display = "none";
    gamePage.style.display = "flex";
    init();
  }

  function toggleSound() {
    console.log(song);
    if (z === 0) {
      muteSound();
      secondColor();
      z = 1;
    } else {
      openSound();
      firstColor();
      z = 0;
    }
  }

  function secondColor() {
    muteButton.style.background = "red";
  }

  function muteSound() {
    song.pause();
  }

  function firstColor() {
    muteButton.style.background = "white";
  }

  function openSound() {
    song.play();
  }
  function init() {
    endPage.style.display = "none";

    //! VARIABLES & ELEMENTS

    muteButton.addEventListener("click", toggleSound);

    // creating the board
    const board = document.querySelector(".board");

    // configuring the board
    const width = 10;
    const height = 10;
    const cellCount = width * height;
    let pointsScore = 0;
    let points = document.querySelector(".score");
    let cells = [];
    let newInterval = 550;
    points.innerText = `POINTS: 0`;

    // configuring snake
    const startingPosition = 52;
    let currentPosition = 52;
    let snake = [54, 53, 52];
    let snakeTimer;
    let snakeDirection = 1;
    let gameOver = false;
    

    // configure food
    let foodPosition = Math.floor(Math.random() * cellCount);
    // sounds
    let biteSound = new Audio("eat.mp3");
    biteSound.volume = 0.15;
    let deadSound = new Audio("dead.mp3")
    deadSound.volume = 0.8

    //! FUNCTIONS

    function eatSound() {
      if (biteSound.paused || biteSound.ended) {
        // If the sound is paused or has ended, play it
        biteSound.play();
      } else {
        // If the sound is currently playing, pause and reset it
        biteSound.pause();
        biteSound.currentTime = 0;
        biteSound.play();
      }
    }

    function deadNoise() {
        deadSound.play()
    }

    function createBoard() {
      for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement("div");
        // cell.innerText = i
        // cell.dataset.index = 1
        cell.style.height = `${100 / height}`;
        cell.style.width = `${100 / width}`;
        board.appendChild(cell);
        cells.push(cell);
      }
      addSnake();
      createFood();
    }

    createBoard();

    function addSnake() {
      snake.forEach((snakeIndex, index) => {
        cells[snakeIndex].classList.add(index === 0 ? "head" : "snake");
      });
    }

    function removeSnake() {
      snake.forEach((snakeIndex) => {
        cells[snakeIndex].classList.remove("head", "snake");
      });
    }

    function createFood() {
      cells[foodPosition].classList.remove("food"); //remove food on board
      foodPosition = Math.floor(Math.random() * cellCount); //create random space
      cells[foodPosition].classList.add("food"); //add it to random space

      if (snake.includes(foodPosition)) {
        cells[foodPosition].classList.remove("food");
        createFood();
      }
    }

    //reset
    function resetGame() {
      console.log("hello");
      endPage.style.display = "flex";
      board.innerHTML = "";
      finalScore = document.getElementById("endScore");
      finalScore.innerText = `YOU SCORED... ${pointsScore} `;
      resetButton.addEventListener("click", init);
    }

    function movingSnake() {
      snakeTimer = setInterval(() => {
        removeSnake();

        const headPosition = snake[0] + snakeDirection;
        console.log("snake direction: " + snakeDirection);
        if (snake.includes(headPosition)) {
          console.log("snake ate himself oops");
          deadState();
          clearInterval(snakeTimer);
          return;
        }

        const horizontalPosition = snake[0] % width;
        const verticalPosition = Math.floor(snake[0] / width);

        if (
          (horizontalPosition === 9 && snakeDirection === 1) ||
          (horizontalPosition === 0 && snakeDirection === -1) ||
          (verticalPosition === 9 && snakeDirection === 10) ||
          (verticalPosition === 0 && snakeDirection === -10)
        ) {
          clearInterval(snakeTimer);
          console.log("gameover");
          deadState();
        }

        if (!cells[snake[0]].classList.contains("food")) {
          snake.pop();
        } else {
          console.log(newInterval);
          eatFood();
        }

        if (!gameOver) {
          snake.unshift(snake[0] + snakeDirection);
          addSnake();
        }
      }, newInterval);
    }

    movingSnake();

    let lastKey = null;

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
      lastKey = key;
      console.log("key pressed " + key);
    }

    function eatFood() {
      eatSound();
      pointsScore++;
      points.innerText = `POINTS: ${pointsScore}`;
      console.log("snake after eating: ", snake);

      createFood();

      if (newInterval > 200) {
        newInterval -= 25;
      }

      clearInterval(snakeTimer);
      snakeTimer = setInterval(() => {
        removeSnake();

        const headPosition = snake[0] + snakeDirection;

        if (snake.includes(headPosition)) {
          console.log("snake ate himself oops");
          deadState();
          clearInterval(snakeTimer);
          return;
        }

        const horizontalPosition = snake[0] % width;
        const verticalPosition = Math.floor(snake[0] / width);

        if (
          (horizontalPosition === 9 && snakeDirection === 1) ||
          (horizontalPosition === 0 && snakeDirection === -1) ||
          (verticalPosition === 9 && snakeDirection === 10) ||
          (verticalPosition === 0 && snakeDirection === -10)
        ) {
          console.log("gameover");
          deadState();
          clearInterval(snakeTimer);
        }

        if (!cells[snake[0]].classList.contains("food")) {
          snake.pop();
        } else {
          console.log(newInterval);
          eatFood();
        }
        if (!gameOver) {
          snake.unshift(snake[0] + snakeDirection);
          addSnake();
        }
      }, newInterval);
    }

    function deadState() {
        deadNoise()
      gameOver = true;
      console.log(snake);
      snake.forEach((snakeIndex) => {
        cells[snakeIndex].classList.add("dead");
      });

      setTimeout(resetGame, 2000);
    }

    //! EVENTS
    document.addEventListener("keyup", handleMovement);
  }
  document.addEventListener("DOMContentLoaded", init);
});
