export default class Enemy {
    constructor(game,) {
        this.game = game;
        this.x = this.game.width;
        this.speedX = Math.random() * -1.5 - 0.5;
        this.markedForDeletion = false;
        this.frameX = 0;
        this.frameY = 0;
        this.projectiles = []
        this.maxFrame = 9;

    }
    update(deltaTime, mode) {
        this.x += this.speedX - this.game.speed;
        if (this.x + this.width < 0) this.markedForDeletion = true;
        if (this.type === 'plane') {
            this.projectiles.forEach(projectile => {

                projectile.update(deltaTime);
            });

        }



        // sprite animation
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else this.frameX = 0;
    }
    draw(context) {
        if (this.type === 'plane') {
            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });

        }
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        if (this.game.debug) {
            context.font = '20px Helvetica';
            context.fillText(this.lives, this.x, this.y);
        }
    }
}

