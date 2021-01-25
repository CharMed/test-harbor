/* eslint-disable */
import * as PIXI from 'pixi.js';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
    }
  }
}

if (process.env.NODE_ENV === 'development') {
  (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ && (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI });
}
