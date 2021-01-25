import { Container, Graphics } from 'pixi.js';
import { BaseView } from '../base-view';
import { SIZE } from '../constant';

export class CanalView extends BaseView {
  #container: Container = new Container();
  #bottom: Graphics = new Graphics();

  constructor() {
    super({
      name: 'canal',
      color: 0xff0000,
      width: SIZE.CANAL.width,
      height: SIZE.CANAL.height,
      strokeWidth: 0,
    });
    this.draw(0xff0000);
    this.#bottom.beginFill(0xff0000);
    this.#bottom.drawRect(0, 0, SIZE.CANAL.width, SIZE.CANAL.height);
    this.#bottom.endFill();

    this.init();
  }

  private init(): void {
    this.#bottom.position.y = SIZE.HARBOR.height - SIZE.CANAL.height;

    this.#container.addChild(this.graphics);
    this.#container.addChild(this.#bottom);
  }

  getContainer(): Container {
    return this.#container;
  }
}
