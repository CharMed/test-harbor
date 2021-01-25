import { Easing, Group, Tween } from '@tweenjs/tween.js';
import { Container } from 'pixi.js';
import { BaseController } from '../base-controller';
import { SIZE } from '../constant';
import { Harbor } from '../harbor';
import { Pier } from '../pier';
import { Ship } from '../ship';
import { ShipType } from '../ship/model';
import { SeaView } from './view';

export interface TweenPosition {
  x: number,
  y: number,
}

export function getRandomInt(from = 0, to = 1): number {
  return Math.round(Math.random() * from + to);
}

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

    this.addShip();
  }

  addShip(): void {
    const ship = createShip();
    const startShip: TweenPosition = { x: SIZE.SEA.width, y: getRandomInt(SIZE.SEA.height) };
    ship.getView().position.set(startShip.x, startShip.y);
    const route = this.#harbor.routeShip(ship);
    ship.navigate(route.getPosition(), this.#tweenGroup, () => {
      if (route instanceof Pier) {
        route.connect(ship);
        if (ship.type === 'loader') {
          route.upload();
        } else {
          route.load();
        }

        route.disconnect();

        setTimeout(() => {
          ship.navigate(startShip, this.#tweenGroup, () => {
            ship.destroy();
            this.addShip();
          });
        }, 1000);
      }
    });
    this.#view.getContainer().addChild(ship.getView());
  }

  getView() : Container {
    return this.#view.getContainer();
  }

  updateTicker() : void {
    this.#tweenGroup.update();
  }
}
