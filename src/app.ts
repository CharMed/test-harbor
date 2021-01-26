import { Application } from 'pixi.js';

import { Sea } from './sea';
import './development';

class Game {
  private app: Application;

  #sea: Sea | undefined;

  constructor() {
    // instantiate app
    this.app = new Application({
      width: 480,
      height: 270,
      backgroundColor: 0x1099bb,
    });

    // create view in DOM
    document.body.appendChild(this.app.view);
    this.setup();
  }

  onUpdateTicker() {
    if (this.#sea) {
      this.#sea.updateTicker(this.app.ticker.lastTime);
    }
  }

  setup(): void {
    this.#sea = new Sea();
    this.app.stage.addChild(this.#sea.getView());
    this.app.ticker.add(this.onUpdateTicker.bind(this));
  }
}

// eslint-disable-next-line no-new
new Game();
