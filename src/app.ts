/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from 'pixi.js';

class Game {
  private app: Application;

  private width = window.innerWidth - 100;

  private height = window.innerHeight - 100;

  constructor() {
    // instantiate app
    this.app = new Application({
      width: this.width,

      height: this.height,

      backgroundColor: 0x1099bb,
    });

    // create view in DOM
    document.body.appendChild(this.app.view);
  }

  // eslint-disable-next-line class-methods-use-this
  setup(): void {
  }
}

// eslint-disable-next-line no-new
new Game();
