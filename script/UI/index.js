import {
    Ammo,
    PauseScreen,
    StartScreen,
    WinnerScreen,
    ScoreAndTimer,
    GameOverScreen,
} from "./screens/index.js";

export default class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 25;
        this.fontFamily = 'Bangers';
        this.color = 'white';
    }

    draw(context) {
        context.save();
        context.fillStyle = this.color;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black';
        context.font = this.fontSize + 'px ' + this.fontFamily;

        WinnerScreen(context, this)
        ScoreAndTimer(context, this)
        Ammo(context, this)
        PauseScreen(context, this)
        StartScreen(context, this)
        GameOverScreen(context, this)
    }
}



