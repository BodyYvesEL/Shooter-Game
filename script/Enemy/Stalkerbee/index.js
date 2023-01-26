import Enemy from "../index.js";

export default class Stalkerbee extends Enemy {
    constructor(game) {
        super(game);
        this.width = 169.38;
        this.height = 175;
        this.y = Math.random() * (this.game.height * 0.95 - this.height - this.height);
        this.image = document.getElementById('Stalkerbee');
        this.frameY = 0;
        this.lives = game?.mode === "easy" ? 5 : game?.mode === "medium" ? 10 : 15;
        this.score = this.lives;
        this.speedX = Math.random() * -1 - 6;
        // this.type = "plane"
    }
}