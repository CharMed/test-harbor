import { Container } from 'pixi.js';
import { BaseController } from '../base-controller';
import { Canal } from '../canal';
import { SIZE } from '../constant';
import { Pier } from '../pier';
import { TweenPosition } from '../sea';
import { Ship } from '../ship';
import { ShipType } from '../ship/model';
import { HarborView } from './view';

export class Harbor extends BaseController {
  #view: HarborView;

  #piers : Array<Pier> = [];

  #canal : Canal = new Canal();

  #queryExit: Map<Ship, Ship> = new Map();

  #queryLoaders: Map<Ship, Ship> = new Map();

  #queryUnloaders: Map<Ship, Ship> = new Map();

  constructor() {
    super();
    this.#view = new HarborView();
    this.#piers = Array.from({ length: 4 }).map((el, index) => new Pier({ goods: index % 2 }));
    this.positionPiers();

    this.#canal.getView().x = SIZE.HARBOR.width - SIZE.CANAL.width;
    this.#canal.getView().y = 0;
    this.#canal.getView().width = SIZE.CANAL.width;
    // this.#canal.getView().height = SIZE.HARBOR.height;
    this.#view.getContainer().addChild(this.#canal.getView());
  }

  positionPiers() : void {
    this.#piers.forEach((pier: Pier, index: number) => {
      const view = pier.getView();
      const spaceX = SIZE.PIER.x;
      const h = SIZE.PIER.height;
      const spaceH = SIZE.PIER.y;
      const spaceY = spaceH + index * (h + spaceH);

      view.position.set(spaceX, spaceY);
      this.#view.getContainer().addChild(view);
    });
  }

  getView(): Container {
    return this.#view.getContainer();
  }

  getRouteObject(type: ShipType) : Harbor|Pier {
    const pierIndex = this.#piers.findIndex((el: Pier) => !el.isBusy() && ((type === 'unloader' && el.isEmpty()) || (type === 'loader' && !el.isEmpty())));

    if (pierIndex > -1) {
      return this.#piers[pierIndex];
    }

    return this;
  }

  getPosition(): TweenPosition {
    return { x: this.#view.getContainer().width, y: this.#view.getContainer().height / 2 };
  }

  routeShip(ship: Ship): Harbor|Pier {
    const route = this.getRouteObject(ship.type);
    return route;
  }
}
