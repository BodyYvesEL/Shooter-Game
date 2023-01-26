import Projectile from "./Projectile/index.js"

export default class Player {
    constructor(game) {
        this.game = game;
        // this.width = 120;
        // this.height = 190;
        this.width = 152.4;
        this.height = 175;
        this.x = 110;
        this.y = 100;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 9;
        this.speedY = 0;
        this.maxSpeed = 8;
        this.lives = 3;
        this.projectiles = [];
        this.image = document.getElementById('player');


        this.lastFireTime = Date.now();
        this.fireInterval = game.mode === "easy" ? 300 : game.mode === "medium" ? 200 : 50; // interval in milliseconds

    }
    update(deltaTime) {
        if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed;
        else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed;
        else this.speedY = 0;
        this.y += this.speedY;
        // vertical boundaries
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;

        else if (this.y <= 0) this.y = 0;
        // handle projectiles


        this.projectiles.forEach(projectile => {

            projectile.update(deltaTime);
        });
        this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion)
            ;
        // sprite animation
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }

    }
    draw(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        this.projectiles.forEach(projectile => {
            projectile.draw(context);
        });
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    shootTop() {

        if (this.game.ammo > 0) {
            // const offset = 20;
            // this.projectiles.push(new Projectile(this.game, this.x, this.y + 30, offset));

            const offset = 70;
            this.projectiles.push(new Projectile(this.game, this.x, this.y + 30, offset));
            this.game.ammo--;
            this.game.sound.shot();
        }
    }
}