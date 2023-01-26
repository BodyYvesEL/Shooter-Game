export default class LayerIslands {
    constructor(game, image, speedModifier) {
        this.game = game;
        this.image = image;
        this.speedModifier = speedModifier;
        this.width = window.innerWidth;
        this.height = this.width * (image.height / image.width);
        this.x = 0;
        this.y = window.innerHeight - image.height - 150;
    }
    update() {
        if (this.x <= -this.width) this.x = 0;
        this.x -= this.game.speed * this.speedModifier;
    }
    draw(context) {
        let xPos = this.x;
        while (xPos < this.width) {
            context.drawImage(this.image, xPos, this.y);
            xPos += this.image.width;
        }
    }

}