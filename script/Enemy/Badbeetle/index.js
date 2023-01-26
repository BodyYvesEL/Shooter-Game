import Enemy from "../index.js";

export default class Badbeetle extends Enemy {
    constructor(game) {
        super(game);
        this.width = 339.38;
        this.height = 220;
        // this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.y = window.innerHeight - 192;
        this.image = document.getElementById('Badbeetle');
        // this.frameY = Math.floor(Math.random() * 2);
        this.frameY = 0;
        this.lives = game?.mode === "easy" ? 20 : game?.mode === "medium" ? 30 : 40;
        this.score = this.lives;
        this.speedX = Math.random() * -1.2 - 0.2;
        this.type = "e6"
    }
}