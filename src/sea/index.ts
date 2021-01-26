import { Group } from '@tweenjs/tween.js';
import { Container } from 'pixi.js';
import { BaseController } from '../base/base-controller';
import { SIZE, TIME } from '../utils/constant';
import { Harbor } from '../harbor';
import { TweenPosition } from '../utils/i-tween-position';
import { Ship } from '../ship';
import { ShipType } from '../ship/model';
import { getRandomInt } from '../utils/get-random-int';
import { SeaView } from './view';

// TODO: better set each 4 different as previous
export function createShip(): Ship {
  const goods = Math.random() >= 0.5 ? 1 : 0;
  const type = ['loader', 'unloader'][goods] as ShipType;
  return new Ship({ goods, type });
}

export class Sea implements BaseController {
  #view : SeaView;

  #harbor: Harbor;

  #tweenGroup: Group = new Group();

  constructor() {
    this.#view = new SeaView();

    this.#harbor = new Harbor();
    this.#view.getContainer().addChild(this.#harbor.getView());
    this.startShipFabric();
  }

  private startShipFabric() {
    // TODO: will be more stable if use `requestAnimationFrame` on better `app.ticker`
    //       but it is faster implementation of creation ship each `n` msec
    this.addShip();
    setInterval(() => this.addShip(), TIME.CREATE_SHIP);
  }

  private async navigateShip(ship: Ship) : Promise<unknown> {
    const result = await ship.navigate(this.#harbor.getEnterPosition(), this.#tweenGroup);
    this.#harbor.goToEnter(ship);
    return result;
  }

  private addShip(): void {
    const ship = createShip();
    const startShip: TweenPosition = { x: SIZE.SEA.width, y: getRandomInt(SIZE.SEA.height) };
    ship.getView().position.set(startShip.x, startShip.y);
    this.navigateShip(ship);
    this.#view.getContainer().addChild(ship.getView());
  }

  getView() : Container {
    return this.#view.getContainer();
  }

  updateTicker(time?: number) : void {
    this.#harbor.queryWorker(this.#tweenGroup);
    this.#tweenGroup.update(time);
  }
}
