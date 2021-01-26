import { BaseView } from '../base/base-view';
import { SIZE } from '../utils/constant';

export class PierView extends BaseView {
  constructor(color = 0) {
    super({
      name: 'pier',
      color,
      width: SIZE.PIER.width,
      height: SIZE.PIER.height,
      strokeWidth: 2,
      pivotX: SIZE.PIER.width / 2,
      pivotY: SIZE.PIER.height / 2,
    });
  }
}
