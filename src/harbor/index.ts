import { Group } from '@tweenjs/tween.js';
import { Container } from 'pixi.js';
import { BaseController } from '../base-controller';
import { Canal } from '../canal';
import { SIZE } from '../constant';
import { Pier } from '../pier';
import { Query } from '../query';
import { TweenPosition } from '../sea';
import { Ship } from '../ship';
import { ShipType } from '../ship/model';
import { HarborView } from './view';

export class Harbor extends BaseController {
  #view: HarborView;

  #piers : Array<Pier> = [];

  #canal : Canal = new Canal();

  #queryExit: Query;

  #queryEnter: Query;

  constructor() {
    super();
    this.#view = new HarborView();
    this.#piers = Array.from({ length: 4 }).map(() => new Pier({ goods: 0 }));
    this.positionPiers();

    this.#canal.getView().x = SIZE.HARBOR.width - SIZE.CANAL.width;
    this.#canal.getView().y = 0;
    this.#canal.getView().width = SIZE.CANAL.width;
    this.#canal.getView().height = SIZE.HARBOR.height;
    this.#view.getContainer().addChild(this.#canal.getView());

    const { height } = this.#canal.getView();
    this.#queryExit = new Query({ x: SIZE.HARBOR.width - SIZE.CANAL.width - SIZE.SHIP.width, y: height / 2 });
    this.#queryEnter = new Query({ x: SIZE.HARBOR.width + SIZE.SHIP.width, y: height / 3 });
    this.#queryEnter.setSpace(SIZE.SHIP.width);
    this.#queryExit.setSpace(-SIZE.SHIP.width);
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

  getFreePierIndex(type: ShipType) : number {
    return this.#piers.findIndex((el: Pier) => {
      if (el.isBusy()) {
        return false;
      }
      return (type === 'unloader' && el.isEmpty()) || (type === 'loader' && !el.isEmpty());
    });
  }

  getEnterPosition(): TweenPosition {
    // this.#queryEnter.addShip(ship);
    return this.#queryEnter.getPosition();
  }

  goToEnter(ship: Ship): void {
    this.#queryEnter.setSpace(ship.getView().width);
    this.#queryEnter.addShip(ship);
  }

  queryWorker(group: Group) : void {
    if (!this.isBusyCanal()) {
      if (this.#queryExit.query.size > 0) {
        const first = this.#queryExit.query.keys().next().value as Ship;
        this.#queryExit.deleteShip(first);
        this.#canal.toggleBusy();
        first.navigate(this.#queryExit.getPosition(), group, () => {
          first.navigate(this.#queryEnter.getPosition(), group, () => {
            this.#canal.toggleBusy();
            const x = SIZE.SEA.width;
            const y = Math.random() * SIZE.SEA.height;
            first.navigate({ x, y }, group, () => {
              first.destroy();
            });
          });
        });
      } else if (this.#queryEnter.query.size > 0) {
        // eslint-disable-next-line no-restricted-syntax
        for (const ship of this.#queryEnter.query.keys()) {
          const pierIndex = this.getFreePierIndex(ship.type);
          if (pierIndex > -1) {
            const pier = this.#piers[pierIndex];
            pier.connect(ship);
            this.#canal.toggleBusy();
            this.deleteFromQuery(ship, group);
            ship.navigate(this.#queryExit.getPosition(), group, () => {
              ship.navigate(pier.getPosition(), group, () => {
                this.#canal.toggleBusy();

                if (ship.type === 'loader') {
                  pier.upload();
                } else {
                  pier.load();
                }
              });
              // FIXME: better use some subscription or unload animation
              setTimeout(() => {
                pier.disconnect();
                this.#queryExit.addShip(ship);
              }, 2500);
            });
            break;
          }
        }

      }
    }
  }

  deleteFromQuery(ship: Ship, group: Group) : void {
    this.#queryEnter.deleteShip(ship);

    this.#queryEnter.query.forEach((s: Ship, key: Ship) => {
      // s.navigate({ x: s.getView().x - 100, y: s.getView().y }, group, () => {
      //   console.log('End');
      // });
    });
  }

  isBusyCanal():boolean {
    return this.#canal.isBusy();
  }
}
