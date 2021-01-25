import { Container, Graphics } from 'pixi.js';
import { BaseController } from '../base-controller';
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

  constructor() {
    super();
    this.#view = new CanalView();
  }

  isBusy(): boolean {
    return false;
  }

  getView(): Container {
    return this.#view.getContainer();
  }
}
