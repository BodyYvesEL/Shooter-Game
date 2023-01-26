export default class Projectile {
  constructor(game, x, y, offset, speedX) {
    this.game = game;
    this.x = x - offset;
    this.y = y;

    this.speed = Math.random() * 0.2 + 2.5 - speedX;
    this.markedForDeletion = false;
    this.image = document.getElementById("fireball");

    this.width = 48.76;
    this.height = 48;
    this.frameX = 0;
    this.maxFrame = 0;
    this.fps = 10;
    this.timer = 0;
    this.interval = 1000 / this.fps;
  }
  update(deltaTime) {
    this.x -= this.speed;
    if (this.timer > this.interval) {
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    if (this.x > this.game.width * 0.8) {
      this.markedForDeletion = true;
    }
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
