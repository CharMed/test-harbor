import { Tween } from '@tweenjs/tween.js';
import { Graphics } from 'pixi.js';
import { BaseController } from '../base-controller';
import { IDownloadManager } from '../download-manager';
import { TweenPosition } from '../sea';
import { IShipModelConstructor, ShipModel, ShipType } from './model';
import { ShipView } from './view';

interface IShipConstructor extends IShipModelConstructor{
  goods: number,
  type: ShipType,
}

export class Ship extends BaseController implements IDownloadManager {
  #model: ShipModel;

  #view: ShipView;

  #colors = {
    loader: {
      stroke: 0x00aa00,
      fill: 0x00ff00,
    },
    unloader: {
      stroke: 0xaa0000,
      fill: 0xff0000,
    },
  }

  tween: Tween<TweenPosition> | undefined;

  constructor({ type = 'unloader', goods = 0 }: IShipConstructor) {
    super();
    this.#model = new ShipModel({ goods, type });
    this.#view = new ShipView(this.getColorByType('stroke'));
    this.checkView();
  }

  getView(): Graphics {
    return this.#view.getContainer() as Graphics;
  }

  getColorByType(fill : 'stroke' | 'fill' = 'fill'): number {
    return this.#colors[this.#model.type][fill];
  }

  checkView(): void {
    if (this.#model.hasGoods()) {
      this.#view.fillColor(this.getColorByType());
    } else {
      this.#view.fillColor();
    }
  }

  load(q?: number) : number {
    return this.#model.load(q);
  }

  upload(q? : number): number {
    return this.#model.upload(q);
  }

  destroy() : void {
    this.#view.destroy();
  }

  updatePosition(position: TweenPosition) {
    this.#view.getContainer().position.set(position.x, position.y);
  }
  navigate(position: TweenPosition): void {
    if (this.tween) {
      this.tween.onUpdate(this.updatePosition.bind(this));
    }
  }

  getModel(): ShipModel {
    return this.#model;
  }
}
