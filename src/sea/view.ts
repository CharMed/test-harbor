import { Container } from 'pixi.js';
import { SIZE } from '../utils/constant';

export class SeaView {
  #container: Container;

  constructor() {
    this.#container = new Container();
    this.#container.name = 'sea';
    this.#container.width = SIZE.SEA.width;
    this.#container.height = SIZE.SEA.height;
  }

  getContainer(): Container {
    return this.#container;
  }
}
