import { Application } from 'pixi.js';

import { Sea } from './sea';
import './development';
import { SIZE } from './utils/constant';

class Game {
  private app: Application;

  #sea: Sea | undefined;

  #scale = 1;

  constructor() {
    const width = (window.innerWidth - 100) / 2;
    const height = (width * 9) / 16;
    const view = document.getElementById('view') as HTMLCanvasElement;

    // instantiate app
    this.app = new Application({
      view,
      width,
      height,
      backgroundColor: 0x1099bb,
    });
    this.#scale = width / SIZE.SEA.width;
    // create view in DOM
    if (!view) {
      document.body.appendChild(this.app.view);
    }
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
    this.app.stage.scale.set(this.#scale, this.#scale);
    this.app.ticker.add(this.onUpdateTicker.bind(this));
  }
}

// eslint-disable-next-line no-new
new Game();
