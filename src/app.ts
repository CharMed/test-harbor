import { Application, Point, Graphics } from 'pixi.js';
import { Harbor } from './harbor';

import './development';
import { Ship } from './ship';
import { Sea } from './sea';

class Game {
  private app: Application;

  private width = window.innerWidth - 100;

  private height = window.innerHeight - 100;

  #sea: Sea | undefined;

  private harbor: Harbor = new Harbor();

  private ships: Array<Ship> = [];

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

  onUpdateTicker(delta: number) {
    console.log(delta)
  }

  setup(): void {
    this.#sea = new Sea();
    this.app.stage.addChild(this.#sea.getView());
    // this.harbor.getView().width = Math.min(this.width / 4, 300);
    // this.harbor.getView().height = this.height;
    // this.harbor.positionPiers();
    // this.app.stage.addChild(this.harbor.getView());

    // const ships = [
    //   new Ship({ goods: 1, type: 'unloader' }),
    //   new Ship({ goods: 0, type: 'unloader' }),
    //   new Ship({ goods: 0, type: 'loader' }),
    //   new Ship({ goods: 1, type: 'loader' }),
    // ];

    // ships.forEach((ship: Ship, index: number) => {
    //   const view = ship.getView() as Graphics;
    //   const spaceX = this.width - 300;
    //   const spaceY = index * 100 + 100;
    //   view.width = 200;
    //   view.height = 50;
    //   view.position.set(spaceX, spaceY);
    //   this.app.stage.addChild(view);
    // });
  }
}

// eslint-disable-next-line no-new
new Game();
