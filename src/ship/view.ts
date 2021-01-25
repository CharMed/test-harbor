import { BaseView } from '../base-view';
import { SIZE } from '../constant';

export class ShipView extends BaseView {
  constructor(color = 0) {
    super({
      name: 'ship',
      color,
      width: SIZE.SHIP.width,
      height: SIZE.SHIP.height,
      strokeWidth: 2,
      pivotY: SIZE.SHIP.height / 2,
    });
  }
}
