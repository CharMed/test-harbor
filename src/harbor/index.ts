import { Group } from '@tweenjs/tween.js';
import { Container } from 'pixi.js';
import { BaseController } from '../base/base-controller';
import { Canal } from '../canal';
import { SIZE } from '../utils/constant';
import { Pier } from '../pier';
import { Query } from '../query';
import { TweenPosition } from '../utils/i-tween-position';
import { Ship } from '../ship';
import { HarborView } from './view';
import { HarborModel } from './model';

export class Harbor extends BaseController {
  #view: HarborView;

  #model : HarborModel;

  #piers : Array<Pier> ;

  #canal : Canal ;

  #queryExit: Query;

  #queryEnter: Query;

  constructor() {
    super();
    this.#view = new HarborView();
    this.#model = new HarborModel();

    this.#piers = this.#model.piers;
    this.#canal = this.#model.canal;

    const { width: canalWidth } = SIZE.CANAL;
    const { width: harborWidth, height: harborHeight } = SIZE.HARBOR;
    const { width: shipWidth } = SIZE.SHIP;
    // NOTE: `y` - center
    this.#queryExit = new Query({ x: harborWidth - canalWidth - shipWidth, y: harborHeight / 2 });
    // NOTE: `y` - top of enter
    this.#queryEnter = new Query({ x: harborWidth + shipWidth, y: harborHeight / 3 });

    this.positionPiers();
    this.positionCanal();
    this.positionQueries(shipWidth);
  }

  private positionQueries(width: number) : void {
    this.#queryEnter.setSpace(width);
    this.#queryExit.setSpace(-width);
  }

  private positionCanal() : void {
    this.#canal.getView().x = SIZE.HARBOR.width - SIZE.CANAL.width;
    this.#canal.getView().y = 0;
    this.#canal.getView().width = SIZE.CANAL.width;
    this.#canal.getView().height = SIZE.HARBOR.height;
    this.#view.getContainer().addChild(this.#canal.getView());
  }

  private positionPiers() : void {
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

  getEnterPosition(): TweenPosition {
    return this.#queryEnter.getPosition();
  }

  goToEnter(ship: Ship): void {
    this.#queryEnter.addShip(ship);
  }

  queryWorker(group: Group) : void {
    if (this.isBusyCanal()) {
      return;
    }

    if (this.#queryExit.query.size > 0) {
      const first = this.#queryExit.getFirstItem();
      this.#queryExit.deleteShip(first);
      this.#canal.toggleBusy();

      const goToStartPositionCallback = () => first.destroy();
      const goToEnterFromExitCallback = async () => {
        this.#canal.toggleBusy();
        const x = SIZE.SEA.width;
        const y = (Math.random() * (SIZE.SEA.height / 2)) + SIZE.SEA.height / 2;
        await first.navigate({ x, y }, group);
        goToStartPositionCallback();
      };

      const goToExitFromPierCallback = async () => {
        await first.navigate(this.#queryEnter.getPosition(), group);
        goToEnterFromExitCallback();
      };

      first.navigate(this.#queryExit.getPosition(), group).then(goToExitFromPierCallback);
      return;
    }

    if (this.#queryEnter.query.size > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const ship of this.#queryEnter.query.values()) {
        const pierIndex = this.#model.getFreePierIndex(ship.type);
        if (pierIndex > -1) {
          const pier = this.#piers[pierIndex];
          pier.connect(ship);
          this.#canal.toggleBusy();
          this.deleteFromQuery(ship);

          const goToPierCallback = () => {
            this.#canal.toggleBusy();
            if (ship.type === 'loader') {
              pier.upload();
            } else {
              pier.load();
            }
          };

          const goToPier = async () => {
            await ship.navigate(pier.getPosition(), group);
            goToPierCallback();
          };

          ship.navigate(this.#queryExit.getPosition(), group)
            .then(() => {
              goToPier();
              // TODO: better use unload animation callback
              const LoadingCallback = () => {
                pier.disconnect();
                this.#queryExit.addShip(ship);
              };
              setTimeout(LoadingCallback, 2500);
            });
          break;
        }
      }
    }
  }

  private deleteFromQuery(ship: Ship) : void {
    this.#queryEnter.deleteShip(ship);
  }

  isBusyCanal():boolean {
    return this.#model.canal.isBusy();
  }
}
