import { Application } from 'pixi.js';
import { Harbor } from './harbor';

import './development';

class Game {
  private app: Application;

  private width = window.innerWidth - 100;

  private height = window.innerHeight - 100;

  private harbor: Harbor = new Harbor();

  constructor() {
    // instantiate app
    this.app = new Application({
      width: this.width,
      height: this.height,
      backgroundColor: 0x1099bb,
    });

    // create view in DOM
    document.body.appendChild(this.app.view);
    this.setup();
  }

  setup(): void {
    this.harbor.getContainer().width = Math.min(this.width / 3, 300);
    this.harbor.getContainer().height = this.height;
    this.app.stage.addChild(this.harbor.getContainer());
  }
}

// eslint-disable-next-line no-new
new Game();
