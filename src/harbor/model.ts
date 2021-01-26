import { Canal } from '../canal';
import { Pier } from '../pier';
import { ShipType } from '../ship/model';

export class HarborModel {
  piers : Array<Pier> = [];

  canal : Canal = new Canal();

  constructor() {
    this.piers = Array.from({ length: 4 }).map(() => new Pier({ goods: 0 }));
  }

  getFreePierIndex(type: ShipType) : number {
    return this.piers.findIndex((el: Pier) => {
      if (el.isBusy()) {
        return false;
      }
      return (type === 'unloader' && el.isEmpty()) || (type === 'loader' && !el.isEmpty());
    });
  }

  isBusyCanal():boolean {
    return this.canal.isBusy();
  }
}
