class InputHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowUp" || e.key === "ArrowDown") &&
        this.game.keys.indexOf(e.key) === -1
      ) {
        this.game.keys.push(e.key);
      } else if (e.key === " ") {
        this.game.player.shootTop();
      } else if (e.key === "d") {
        this.game.debug = !this.game.debug;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (this.game.keys.indexOf(e.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
      }
    });
  }

  inputevents(animate) {
    const game = this.game;
    let canvas = document.getElementById("canvas1");

    window.addEventListener("keydown", (e) => {
      if (!game.pause || !game.gameOver) {
        if (e.keyCode === 27) {
          if (game.pause) {
            game.pause = false;
            animate(0);
          } else {
            game.pause = true;
          }
        }
      }
    });

    canvas.addEventListener("click", (event) => {
      // Get the mouse coordinates relative to the canvas
      let x = event.clientX - canvas.offsetLeft;
      let y = event.clientY - canvas.offsetTop;

      // Check if the "Resume" button is clicked
      if (
        x > -161 &&
        x < -11 &&
        y > 49 &&
        y < 100 &&
        game.gameOver === false &&
        game.start &&
        game.score < game.winningScore
      ) {
        // Call the resumeGame function
        game.pause = false;
        animate(0);
      }

      // Check if the "Restart" button is clicked
      else if (
        x < 160 &&
        x > 6 &&
        y > 49 &&
        y < 100 &&
        game.start &&
        game.gameOver === false
      ) {
        // Call the restartGame function
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(game.id);
        game.clear();
        animate(0);
      }

      // game win, restart
      else if (
        x < 76 &&
        x > -78 &&
        y > 49 &&
        y < 100 &&
        game.start &&
        game.gameOver === false &&
        game.score >= game.winningScore
      ) {
        // Call the restartGame function
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(game.id);
        game.clear();
        animate(0);
        return;
      }

      // Check if the "Restart" button after game over
      else if (x < 76 && x > -78 && y > 49 && y < 100 && game.gameOver) {
        // Call the restartGame function
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(game.id);
        game.clear();
        animate(0);
        return;
      }

      // game start
      else if (
        x < 76 &&
        x > -78 &&
        y > 49 &&
        y < 100 &&
        game.start === false &&
        game.gameOver === false
      ) {
        // Call the start function
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(game.id);
        game.start = true;
        animate(0);
      }
    });

    canvas.addEventListener("mousemove", (event) => {
      // Get the mouse coordinates relative to the canvas
      let x = event.clientX - canvas.offsetLeft;
      let y = event.clientY - canvas.offsetTop;

      // game continue, resume
      if (
        x > -161 &&
        x < -11 &&
        y > 49 &&
        y < 100 &&
        game.gameOver === false &&
        game.start &&
        game.score < game.winningScore
      ) {
        canvas.style.cursor = "pointer";
      }

      // game continue, restart
      else if (
        x < 160 &&
        x > 6 &&
        y > 49 &&
        y < 100 &&
        game.start &&
        game.gameOver === false
      ) {
        canvas.style.cursor = "pointer";
      }

      // game win, restart
      else if (
        x < 76 &&
        x > -78 &&
        y > 49 &&
        y < 100 &&
        game.start &&
        game.gameOver === false &&
        game.score >= game.winningScore
      ) {
        canvas.style.cursor = "pointer";
      }

      // gameOver, restart
      else if (
        x < 76 &&
        x > -78 &&
        y > 49 &&
        y < 100 &&
        game.start &&
        game.gameOver
      ) {
        canvas.style.cursor = "pointer";
      }

      // game start
      else if (
        x < 76 &&
        x > -78 &&
        y > 49 &&
        y < 100 &&
        game.start === false &&
        game.gameOver === false
      ) {
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "default";
      }
    });
  }
}
export default InputHandler;
