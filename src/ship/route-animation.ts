import { Easing, Tween } from '@tweenjs/tween.js';
import { DisplayObject, Point } from 'pixi.js';

export class RouteAnimation {
  private dObj: DisplayObject;

  private tween: Tween<Point>;

  constructor(obj: DisplayObject) {
    this.dObj = obj;
    this.tween = this.createTween(obj.position);
  }

  createTween(point: Point) {
    return new Tween(point).easing(Easing.Linear.None);
  }

  setObj(obj: DisplayObject) {
    this.dObj = obj;
  }

  isStoped() {
    return !this.tween.isPlaying();
  }

  onUpdate(point: Point) {
    this.dObj.position = point;
  }

  onStop(data : any) {
    console.log(data);
  }

  move(point : Point) {
    this.tween.to(point)
      .onUpdate(this.onUpdate.bind(this))
      .onStop(this.onStop);
    this.tween.start();
  }

  update() {
    this.tween.update();
  }
}

export default RouteAnimation;
