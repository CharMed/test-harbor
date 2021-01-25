import { Container, filters, Graphics } from 'pixi.js';
import { SIZE } from '../constant';

export class HarborView {
  #container: Container;

  constructor() {
    this.#container = new Container();
    this.#container.name = 'harbor';
    this.#container.width = SIZE.HARBOR.width;
    this.#container.height = SIZE.HARBOR.height;
    const area = new Graphics();
    area.name = 'harbor-area';
    area.beginFill(0, 0.1).drawRect(0, 0, SIZE.HARBOR.width,  SIZE.HARBOR.height).endFill();
    this.#container.addChild(area);
  }

  getContainer(): Container {
    return this.#container;
  }
}
