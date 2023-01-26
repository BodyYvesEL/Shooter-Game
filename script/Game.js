import InputHandler from "./InputHandler/index.js";
import SoundController from "./SoundController/index.js";
import Background from "./Background/index.js";
import Shield from "./Shield/index.js";
import Player from "./Player/index.js";
import { FireExplosion, SmokeExplosion } from "./Enemy/Explosion/subclasses.js";

import {
  Badbeetle,
  Monster,
  Laserspider,
  Stalkerbee,
  Bubblehead,
  BadBat,
  EnemyProjectile,
} from "./Enemy/subclasses.js";
import UI from "./UI/index.js";

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.keys = [];
    this.enemies = [];
    this.explosions = [];

    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.sound = new SoundController();
    this.shield = new Shield(this);
    this.ui = new UI(this);

    this.mode = "easy";

    this.enemyTimer = 0;
    this.enemyInterval = 2000;
    this.ammo = 30;
    this.maxAmmo =
      this.mode === "easy" ? 50 : this.mode === "medium" ? 80 : 100;
    this.ammoTimer = 0;
    this.ammoInterval =
      this.mode === "easy" ? 200 : this.mode === "medium" ? 120 : 50;
    this.gameOver = false;
    this.pause = false;
    this.start = false;
    this.score = 0;
    this.winningScore = 500;
    this.gameTime = 0;
    this.timeLimit = 1000000;
    this.templimit = 0;
    this.speed = 1;
    this.debug = false;
    this.id = null;
    this.lastFireTime = Date.now();
    this.fireInterval = 100; // interval in milliseconds
    this.count = 0;
  }
  update(deltaTime) {
    if (!this.gameOver) this.gameTime += deltaTime;

    if (this.score > 150 && this.mode === "easy") {
      this.mode = "medium";
    }
    if (this.score >= 300 && this.mode === "medium") {
      this.mode = "hard";
    }
    if (
      this.player.lives === 0 ||
      this.gameTime > this.timeLimit ||
      this.score === -1
    ) {
      return (this.gameOver = true);
    }
    this.background.update();
    this.player.update(deltaTime);

    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }

    this.shield.update(deltaTime);
    this.explosions.forEach((explosion) => explosion.update(deltaTime));
    this.explosions = this.explosions.filter(
      (explosion) => !explosion.markedForDeletion
    );

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);

      if (enemy?.type === "plane") {
        this.shootTop();
      }

      // enemeies collision
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true;
        this.addExplosion(enemy);
        this.sound.hit();
        this.shield.reset();
        this.player.lives--;

        if (!this.gameOver) this.score--;
      }

      // projectiles

      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives--;
          projectile.markedForDeletion = true;

          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true;
            this.addExplosion(enemy);
            this.sound.explosion();
            if (enemy?.type === "e6" && this.player.lives < 6) {
              this.player.lives++;
            }
            if (enemy.type === "hive") {
              for (let i = 0; i < 5; i++) {
                this.enemies.push(
                  new Drone(
                    this,
                    enemy.x + Math.random() * enemy.width,
                    enemy.y + Math.random() * enemy.height * 0.5
                  )
                );
              }
            }
            if (!this.gameOver) this.score += enemy.score;
            //
            if (this.score > this.winningScore) this.gameOver = true;
          }
        }
      });

      let c = 0;
      this.enemies.forEach((e) => {
        if (this.count > 0 || c > 0) {
          return;
        }

        e?.projectiles?.forEach((a) => {
          if (
            this.checkCollision(a, this.player) &&
            c === 0 &&
            e.type === "plane"
          ) {
            c += 1;
            this.player.lives -= 1;
            this.addExplosion(this.player);

            return;
          }
        });
      });
      this.count = 0;
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }

  checkwin() {
    if (this.score >= this.winningScore) {
      cancelAnimationFrame(this.id);
      this.clearwin();
    }
  }

  draw(context) {
    this.checkwin();
    this.background.draw(context);
    this.player.draw(context);
    this.shield.draw(context);
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.explosions.forEach((explosion) => {
      explosion.draw(context);
    });
    this.checkwin();
    this.ui.draw(context);
  }
  addEnemy() {
    const randomize = Math.random();

    if (randomize < 0.1) this.enemies.push(new BadBat(this));
    else if (randomize < 0.3) {
      this.enemies.push(new Stalkerbee(this));
      this.enemies.push(new Monster(this));
    } else if (randomize < 0.5) {
      this.enemies.push(new Laserspider(this));
    } else if (randomize < 0.6) this.enemies.push(new Bubblehead(this));
    else if (randomize < 0.8) {
      this.enemies.push(new Badbeetle(this));
    }
  }
  addExplosion(enemy) {
    const randomize = Math.random();
    if (randomize < 0.5) {
      this.explosions.push(
        new SmokeExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
    } else {
      this.explosions.push(
        new FireExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5
        )
      );
    }
  }

  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y
    );
  }

  shootTop() {
    this.enemies.forEach((e) => {
      if (
        e?.type === "plane" &&
        Date.now() - this.lastFireTime > this.fireInterval * 9
      ) {
        const offset = 20;
        e.projectiles.push(
          new EnemyProjectile(this, e.x - 10, e.y + 30, offset, e?.speedX)
        );
        this.sound.shot();
        this.lastFireTime = Date.now();
      }
    });
  }

  clear() {
    this.keys = [];
    this.enemies = [];
    this.explosions = [];

    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.sound = new SoundController();
    this.shield = new Shield(this);
    this.ui = new UI(this);

    this.enemyTimer = 0;
    this.enemyInterval = 2000;
    this.ammo = 30;
    this.maxAmmo =
      this.mode === "easy" ? 50 : this.mode === "medium" ? 80 : 100;
    this.ammoInterval =
      this.mode === "easy" ? 200 : this.mode === "medium" ? 120 : 50;

    this.ammoTimer = 0;
    this.gameOver = false;
    this.pause = false;
    this.start = false;
    this.score = 0;
    this.gameTime = 0;
  }
  clearwin() {
    this.keys = [];
    this.enemies = [];
    this.explosions = [];

    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.sound = new SoundController();
    this.shield = new Shield(this);
    this.ui = new UI(this);

    this.enemyTimer = 0;
    this.ammo = 30;
    this.maxAmmo =
      this.mode === "easy" ? 50 : this.mode === "medium" ? 80 : 100;
    this.ammoTimer = 0;
    this.ammoInterval =
      this.mode === "easy" ? 200 : this.mode === "medium" ? 120 : 50;

    this.gameOver = false;
    this.pause = false;
    this.start = true;
    this.gameTime = 0;
  }
}
