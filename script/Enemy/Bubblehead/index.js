import Enemy from "../index.js";

export default class Bubblehead extends Enemy {
    constructor(game) {
        super(game);
        this.width = 165.76;
        this.height = 150;
        this.y = window.innerHeight - 152;
        this.image = document.getElementById('Bubblehead');
        this.frameY = 0;
        this.lives = game?.mode === "easy" ? 6 : game?.mode === "medium" ? 12 : 18;
        this.score = this.lives;
    }
}

