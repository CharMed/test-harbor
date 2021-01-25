import { Easing, Group, Tween } from '@tweenjs/tween.js';
import { Container } from 'pixi.js';
import { BaseController } from '../base-controller';
import { Harbor } from '../harbor';
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
  const goods = getRandomInt();
  const type = ['loader', 'unloader'][getRandomInt()] as ShipType;
  return new Ship({ goods, type });
}

export function createTween(position: TweenPosition, group: Group): Tween<TweenPosition> {
  return new Tween(position, group).easing(Easing.Linear.None);
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
    const position: TweenPosition = {
      x: ship.getView().x,
      y: ship.getView().y,
    };
    ship.tween = createTween(position, this.#tweenGroup);
    ship.navigate({ x: 50, y: 200 });
    ship.tween.onStop(() => {
      console.log('stop');
      ship.tween = undefined;
      this.#harbor.addShip(ship);
    });
  }

  getView() : Container {
    return this.#view.getContainer();
  }
}
