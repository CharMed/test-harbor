import { Container, Graphics } from 'pixi.js';

export interface IBaseViewConstructor {
  color?: number,
  bg?: number,
  alpha?: number,
  strokeWidth?: number,
  pivotX?: number,
  pivotY?: number,
  width?: number,
  height?: number,
  name: string | undefined,
}

const BaseViewDefaultConstructor : IBaseViewConstructor = {
  color: 0,
  strokeWidth: 0,
  pivotX: 0,
  pivotY: 0,
  width: 1,
  height: 1,
  name: undefined,
};

export class BaseView {
  protected graphics: Graphics = new Graphics();

  #width = 1;

  #height = 1;

  #strokeWidth = 0;

  #strokeColor = 0;

  constructor({
    strokeWidth, pivotY, pivotX, color, width, height,
    name,
  } = BaseViewDefaultConstructor) {
    // this.graphics.lineStyle(strokeWidth, color);
    this.graphics.pivot.set(pivotX, pivotY);

    this.#strokeWidth = strokeWidth || this.#strokeWidth;
    this.#strokeColor = color || this.#strokeColor;
    this.#width = width || this.#width;
    this.#height = height || this.#height;

    this.graphics.name = name || this.graphics.name;
  }

  getContainer() : Graphics | Container {
    return this.graphics;
  }

  draw(color = 0, alpha = 1): void {
    this.graphics.clear();
    this.graphics.lineStyle(this.#strokeWidth, this.#strokeColor);
    this.graphics.beginFill(color, alpha);
    this.graphics.drawRect(0, 0, this.#width, this.#height);
    this.graphics.endFill();
  }

  fillColor(color?: number): void {
    if (color) {
      this.draw(color, 1);
    } else {
      this.draw(0, 0);
    }
  }

  destroy(): void {
    this.graphics.destroy();
  }
}
