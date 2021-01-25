import { Container, Graphics } from 'pixi.js';
import { BaseController } from '../base-controller';
import { TweenPosition } from '../sea';
// import { IDownloadManager } from '../download-manager';
// import { Ship } from '../ship';
// import { PierModel } from './model';
import { CanalView } from './view';

export interface IPierConstructor {
  goods?: number,
  color? : number,
}

export class Canal extends BaseController {
  // #model: PierModel;

  #view: CanalView;

  #busy = false;

  constructor() {
    super();
    this.#view = new CanalView();
  }

  toggleBusy() : void {
    this.#busy = !this.#busy;
  }

  isBusy(): boolean {
    return this.#busy;
  }

  getView(): Container {
    return this.#view.getContainer();
  }

  getPosition() : TweenPosition {
    const x = this.getView().x + this.getView().width;
    const y = this.getView().height / 2;
    return { x, y };
  }
}
