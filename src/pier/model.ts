import { IDownloadManager } from '../download-manager';
import { Ship } from '../ship';

export class PierModel implements IDownloadManager {
  #ship: Ship | undefined;

  #goods: number;

  constructor(goods = 0) {
    this.#goods = goods;
  }

  isBusy(): boolean {
    return this.#ship !== undefined;
  }

  isEmpty(): boolean {
    return !this.#goods;
  }

  connectShip(ship : Ship): void {
    this.#ship = ship;
  }

  disconnectShip() : void {
    this.#ship = undefined;
  }

  /**
   * Load goods to pier
   * @returns the count of loaded
   */
  load(quantity = 1): number {
    if (this.#ship) {
      this.#goods += this.#ship.upload(quantity);
    }
    return quantity;
  }

  /**
   * Upload goods from pier
   * @returns The rest from goods on pier
   */
  upload(quantity = 1): number {
    if (this.#ship) {
      this.#goods -= this.#ship.load(quantity);
    }
    return this.#goods;
  }
}
