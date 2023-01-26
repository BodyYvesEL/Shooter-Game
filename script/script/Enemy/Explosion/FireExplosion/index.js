import Explosion from "../index.js";

export default class FireExplosion extends Explosion {
    constructor(game, x, y) {
        super(game, x, y);
        this.image = document.getElementById('fireExplosion');
    }
}