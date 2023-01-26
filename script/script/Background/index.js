import LayerBackgroundGround from "./Layer/LayerBackground.js";
import LayerClouds from "./Layer/LayerClouds.js";
import LayerGrass from "./Layer/Layergrass.js";
import LayerGround from "./Layer/LayerGround.js";
import LayerIslands from "./Layer/LayerIslands.js";

export default class Background {
  constructor(game) {
    this.game = game;
    this.imggrass = document.getElementById("grass");
    this.imgground = document.getElementById("ground");
    this.imgcloud = document.getElementById("cloud");
    this.imgislands = document.getElementById("islands");
    this.imgbg = document.getElementById("background");

    this.layer1 = new LayerGrass(this.game, this.imggrass, 0.1);
    this.layer2 = new LayerGround(this.game, this.imgground, 0.5);
    this.layer4 = new LayerClouds(this.game, this.imgcloud, 0.5);
    this.layer4_2 = new LayerClouds(this.game, this.imgcloud, 0.5);
    this.layer5 = new LayerIslands(this.game, this.imgislands, 0.5);
    this.layer6 = new LayerBackgroundGround(this.game, this.imgbg, 0.5);

    this.layers = [
      this.layer6,
      this.layer4,
      this.layer5,
      this.layer2,
      this.layer1,
    ];
  }
  update() {
    this.layers.forEach((layer) => layer.update());
  }
  draw(context) {
    this.layers.forEach((layer) => layer.draw(context));
  }
}
