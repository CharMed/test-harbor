import { IDownloadManager } from '../download-manager';

export type ShipType = 'loader'| 'unloader';

export interface IShipModelConstructor {
  goods: number,
  type: ShipType,
}

export class ShipModel implements IDownloadManager {
    #goods = 0;

    #type : ShipType = 'unloader';

    constructor({ goods, type } : IShipModelConstructor) {
      this.#goods = goods || this.#goods;
      this.#type = (type as ShipType) || this.#type;
    }

    get type(): ShipType {
      return this.#type;
    }

    /**
     * Check if ship gave goods.
     */
    hasGoods() : boolean {
      return this.#goods > 0;
    }

    /**
     * Load goods to ship
     * @param quantity the count of goods for load
     * @returns The count of loaded to ship goods
     */
    load(quantity = 1) : number {
      this.#goods += quantity;
      return quantity;
    }

    /**
     * Upload goods from ship
     * @param quantity the count of goods for upload
     * @returns The rest of goods
     */
    upload(quantity = 1): number {
      this.#goods -= quantity;
      return quantity;
    }
}
