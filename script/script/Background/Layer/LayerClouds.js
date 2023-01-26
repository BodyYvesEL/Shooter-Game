export default class LayerClouds {
    constructor(game, image, speedModifier) {
        this.game = game;
        this.image = image;
        this.speedModifier = speedModifier;
        this.width = window.innerWidth;
        this.height = this.width * (image.height / image.width);
        this.x = 0;
        this.y = window.innerHeight - image.height - 100;
    }
    update() {
        if (this.x <= -this.width) this.x = 0;
        this.x -= this.game.speed * this.speedModifier;
    }
    draw(context) {
        let yPos = this.y;
        while (yPos < this.height) {
            let xPos = this.x;
            while (xPos < this.width) {
                context.drawImage(this.image, xPos, yPos);
                xPos += this.image.width;
            }
            yPos += this.image.height;
        }
    }

}