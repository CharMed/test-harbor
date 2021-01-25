import { BaseView } from '../base-view';

export class ShipView extends BaseView {
  constructor(color = 0) {
    super({
      name: 'ship',
      color,
      width: 100,
      height: 25,
      strokeWidth: 2,
    });
  }
}
