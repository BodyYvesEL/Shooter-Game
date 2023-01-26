import Enemy from "../index.js";

export default class Monster extends Enemy {
    constructor(game) {
        super(game);
        this.width = 133.15;
        this.height = 150;
        // this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.y = window.innerHeight - 135;
        this.image = document.getElementById('monster');
        this.frameY = 0;
        this.lives = game?.mode === "easy" ? 10 : game?.mode === "medium" ? 20 : 30;
        this.score = this.lives;
        this.speedX = Math.random() * -1.2 - 2;
        this.type = 'moon';
    }
}

