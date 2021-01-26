import { DisplayObject } from 'pixi.js';

export abstract class BaseController {
   abstract getView(): DisplayObject;
}
