import { Graphics } from 'pixi.js';
import { BaseController } from '../base-controller';
import { IDownloadManager } from '../download-manager';
import { Ship } from '../ship';
import { PierModel } from './model';
import { PierView } from './view';

export interface IPierConstructor {
  goods?: number,
  color? : number,
}

export class Pier extends BaseController implements IDownloadManager {
  #model: PierModel;

  #view: PierView;

  #colors = {
    full: 0xffff00,
    empty: undefined,
    stroke: 0xbbbb00,
  }

  constructor(data?: IPierConstructor) {
    super();
    this.#model = (data && data.goods)
      ? new PierModel(data.goods)
      : new PierModel();
    this.#view = (data && data.color)
      ? new PierView(data.color)
      : new PierView(this.#colors.stroke);
    this.checkView();
  }

  private checkView() {
    if (this.#model.isEmpty()) {
      this.#view.fillColor();
    } else {
      this.#view.fillColor(this.#colors.full);
    }
  }

  isBusy(): boolean {
    return this.#model.isBusy();
  }

  connect(ship: Ship) : void {
    this.#model.connectShip(ship);
  }

  disconnect() : void {
    this.#model.disconnectShip();
  }

  load() : number {
    this.#model.load();
    this.checkView();
    return 0;
  }

  upload() : number {
    this.#model.upload();
    this.checkView();
    return 0;
  }

  getView(): Graphics {
    return this.#view.getContainer() as Graphics;
  }
}
