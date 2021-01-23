import { Container, filters, Graphics } from 'pixi.js';

export class Harbor {
  private container: Container;

  constructor() {
    this.container = new Container();
    const canal = new Graphics();
    canal.beginFill();
    canal.drawRect(0, 0, 100, 100);
    canal.endFill();
    canal.filters = [new filters.AlphaFilter(0.2)];
    this.container.addChild(canal);
  }

  getContainer(): Container {
    return this.container;
  }
}

export default Harbor;
