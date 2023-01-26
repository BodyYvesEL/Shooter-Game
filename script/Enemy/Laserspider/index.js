import Enemy from "../index.js";

export default class Laserspider extends Enemy {
    constructor(game) {
        super(game);
        this.width = 192.48;
        this.height = 120;
        // this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.y = window.innerHeight - 117;
        this.image = document.getElementById('Laserspider');
        this.frameY = 0;
        this.lives = game?.mode === "easy" ? 7 : game?.mode === "medium" ? 14 : 21;
        this.score = this.lives;
        this.speedX = Math.random() * -1 - 1;
    }
}
