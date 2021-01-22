import { Application } from 'pixi.js';

class Game {
  private app: Application;

  constructor() {
    // instantiate app
    this.app = new Application({
      width: 512,
      height: 512,
      backgroundColor: 0x1099bb, // light blue
    });

    // create view in DOM
    document.body.appendChild(this.app.view);

  
  }

  setup(): void {
  }
}

// eslint-disable-next-line no-new
new Game();
