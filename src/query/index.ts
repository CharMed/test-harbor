import { TweenPosition } from '../utils/i-tween-position';
import { Ship } from '../ship';

export class Query {
  #map: Map<Ship, Ship>;

  #position: TweenPosition;

  #space = 0;

  constructor(position?: TweenPosition) {
    this.#map = new Map();
    this.#position = position || { x: 0, y: 0 };
  }

  setSpace(space = 0): void {
    this.#space = space;
  }

  get query() : Map<Ship, Ship> {
    return this.#map;
  }

  addShip(ship: Ship) : void {
    this.#map.set(ship, ship);
  }

  deleteShip(ship: Ship): void {
    this.#map.delete(ship);
  }

  // FIXME: fix position of query items
  getPosition(): TweenPosition {
    const x = this.#position.x + this.#space * this.#map.size;
    const { y } = this.#position;
    return { x, y };
  }

  getFirstItem() : Ship {
    return this.#map.keys().next().value;
  }
}
