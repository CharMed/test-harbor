import { TweenPosition } from '../utils/i-tween-position';
import { Ship } from '../ship';

export class Query {
  #map: Map<Ship, number>;

  #position: TweenPosition;

  #space = 0;

  constructor(position?: TweenPosition) {
    this.#map = new Map();
    this.#position = position || { x: 0, y: 0 };
  }

  setSpace(space = 0): void {
    this.#space = space;
  }

  get query() : Map<Ship, number> {
    return this.#map;
  }

  addShip(ship: Ship) : void {
    this.#map.set(ship, this.#map.size);
  }

  deleteShip(ship: Ship): number {
    const value = this.#map.get(ship) || this.#map.size;
    this.#map.delete(ship);
    return value;
  }

  getPosition(): TweenPosition {
    const x = this.#position.x + this.#space * this.#map.size;
    const { y } = this.#position;
    return { x, y };
  }

  getPositionByNumber(count = 0): TweenPosition {
    const x = this.#position.x + this.#space * count;
    const { y } = this.#position;
    return { x, y };
  }

  getFirstItemPosition(): TweenPosition {
    const x = this.#position.x + this.#space;
    const { y } = this.#position;
    return { x, y };
  }

  getFirstItem() : Ship {
    return this.#map.keys().next().value;
  }
}
