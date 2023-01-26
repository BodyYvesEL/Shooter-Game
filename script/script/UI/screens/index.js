const StartScreen = (context, gameobj) => {
    if (gameobj.game.start === false) {
        context.textAlign = 'center';
        let message1 = 'Welcome Explorer!';
        let message2 = 'Start A New Adventure';

        context.font = '70px ' + gameobj.game.ui.fontFamily;
        context.fillText(message1, gameobj.game.width * 0.5, gameobj.game.height * 0.5 - 20);

        context.font = '25px ' + gameobj.game.ui.fontFamily;

        context.fillText(message2, gameobj.game.width * 0.5, gameobj.game.height * 0.5 + 20);
        // Draw "Start" button
        context.fillStyle = 'green';
        context.fillRect((gameobj.game.width - 150) * 0.5, (gameobj.game.height * 0.5) + 50, 150, 50);
        context.fillStyle = 'white';
        context.font = '30px ' + gameobj.game.ui.fontFamily;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Start Game!', gameobj.game.width * 0.5, gameobj.game.height * 0.5 + 75);
        context.restore();
    }
}

const PauseScreen = (context, gameobj) => {
    if (gameobj.game.pause && !gameobj.game.gameOver && gameobj.game.start) {

        context.textAlign = 'center';
        let message1 = 'Game Paused!';
        let message2 = 'Press Escape Key to Continue...';
        context.font = '70px ' + gameobj.game.ui.fontFamily;
        context.fillText(message1, gameobj.game.width * 0.5, gameobj.game.height * 0.5 - 50);
        context.font = '25px ' + gameobj.game.ui.fontFamily;
        context.fillText(message2, gameobj.game.width * 0.5, gameobj.game.height * 0.5);

        // Draw "Resume" button
        context.fillStyle = 'green';
        context.fillRect(gameobj.game.width * 0.5 - 160, gameobj.game.height * 0.5 + 50, 150, 50);
        context.fillStyle = 'white';
        context.font = '30px ' + gameobj.game.ui.fontFamily;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Resume', gameobj.game.width * 0.5 - 85, gameobj.game.height * 0.5 + 76);

        // Draw "Restart" button
        context.fillStyle = 'red';
        context.fillRect(gameobj.game.width * 0.5 + 10, gameobj.game.height * 0.5 + 50, 150, 50);
        context.fillStyle = 'white';
        context.font = '30px ' + gameobj.game.ui.fontFamily;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        context.fillText('Restart', gameobj.game.width * 0.5 + 85, gameobj.game.height * 0.5 + 75);


        context.restore();
    }
}

const GameOverScreen = (context, gameobj) => {
    if (gameobj.game.gameOver) {
        context.textAlign = 'center';
        let message1;
        let message2;
        message1 = 'Loser!';
        message2 = 'Game Ended. Go Home and Keep being Mad.';
        context.font = '70px ' + gameobj.game.ui.fontFamily;

        context.fillText(message1, gameobj.game.width * 0.5, gameobj.game.height * 0.5 - 20);
        context.font = '25px ' + gameobj.game.ui.fontFamily;

        context.fillText(message2, gameobj.game.width * 0.5, gameobj.game.height * 0.5 + 20);
        // Draw "Restart" button
        context.fillStyle = 'red';
        context.fillRect((gameobj.game.width - 150) * 0.5, (gameobj.game.height * 0.5) + 50, 150, 50);
        context.fillStyle = 'white';
        context.font = '30px ' + gameobj.game.ui.fontFamily;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Restart', gameobj.game.width * 0.5, gameobj.game.height * 0.5 + 75);


        context.restore();
    }
}

const WinnerScreen = (context, gameobj) => {
    if (gameobj.game.score >= gameobj.game.winningScore) {
        context.textAlign = 'center';
        let message1;
        let message2;
        message1 = 'Hooray!';
        message2 = 'Game Won. That´s Wassup. True Explorer';

        context.font = '70px ' + gameobj.game.ui.fontFamily;

        context.fillText(message1, gameobj.game.width * 0.5, gameobj.game.height * 0.5 - 20);
        context.font = '25px ' + gameobj.game.ui.fontFamily;

        context.fillText(message2, gameobj.game.width * 0.5, gameobj.game.height * 0.5 + 20);
        // Draw "Restart" button
        context.fillStyle = 'green';
        context.fillRect((gameobj.game.width - 150) * 0.5, (gameobj.game.height * 0.5) + 50, 150, 50);
        context.fillStyle = 'white';
        context.font = '30px ' + gameobj.game.ui.fontFamily;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('Restart', gameobj.game.width * 0.5, gameobj.game.height * 0.5 + 75);
        context.restore();
    }
}

const ScoreAndTimer = (context, gameobj) => {
    // score
    context.fillText('Score: ' + gameobj.game.score, 20, 40);

    //time
    const formattedTime = (gameobj.game.gameTime * 0.001).toFixed(1);
    context.fillText('Timer: ' + formattedTime, 20, 100);
    context.fillText('Lives: ' + gameobj.game.player.lives, 20, 130);
}

const Ammo = (context, gameobj) => {
    // ammo
    for (let i = 0; i < gameobj.game.ammo; i++) {
        context.fillRect(20 + 5 * i, 50, 3, 20);
    }
}

export {
    Ammo,
    StartScreen,
    PauseScreen,
    WinnerScreen,
    ScoreAndTimer,
    GameOverScreen,
}
