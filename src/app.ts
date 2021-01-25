import { Application, Point, Graphics } from 'pixi.js';

import { Sea } from './sea';
import './development';

class Game {
  private app: Application;

  private width = window.innerWidth - 100;

  private height = window.innerHeight - 100;

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

  onUpdateTicker(delta?: number) {
    if (this.#sea) {
      this.#sea.updateTicker();
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
