import { Container } from 'pixi.js';
import { BaseController } from '../base/base-controller';
import { TweenPosition } from '../utils/i-tween-position';
import { CanalView } from './view';

export interface IPierConstructor {
  goods?: number,
  color? : number,
}

// TODO: can divide to 2 class model and controller
//       but currently  model is to simply
export class Canal extends BaseController {
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
