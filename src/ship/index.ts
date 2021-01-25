import { Easing, Group, Tween } from '@tweenjs/tween.js';
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

  #tween: Tween<TweenPosition> | undefined;

  constructor({ type = 'unloader', goods = 0 }: IShipConstructor) {
    super();
    this.#model = new ShipModel({ goods, type });
    this.#view = new ShipView(this.getColorByType('stroke'));
    this.checkView();
  }

  get type() : ShipType {
    return this.#model.type;
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
    const result = this.#model.load(q);
    this.checkView();
    return result;
  }

  upload(q? : number): number {
    const result = this.#model.upload(q);
    this.checkView();
    return result;
  }

  destroy() : void {
    this.#view.destroy();
  }

  updatePosition(position: TweenPosition) : void {
    this.#view.getContainer().position.set(position.x, position.y);
  }

  onStopTween() : void {
    this.#tween = undefined;
  }

  navigate(position: TweenPosition, group: Group, callback:(p?: TweenPosition) => void): void {
    const start: TweenPosition = { x: this.#view.getContainer().x, y: this.#view.getContainer().y };
    this.#tween = new Tween<TweenPosition>(start, group).easing(Easing.Linear.None);
    this.#tween.to(position, 1000);
    this.#tween.onUpdate(this.updatePosition.bind(this));
    this.#tween.onComplete((pos : TweenPosition) => {
      this.onStopTween();
      callback(pos);
    });
    this.#tween.start();
  }

  getModel(): ShipModel {
    return this.#model;
  }
}
