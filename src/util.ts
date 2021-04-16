import type { NotificationItem } from './types';
interface Direction {
  x: null | string;
  y: null | string;
}

const directions = {
  x: ['left', 'center', 'right'],
  y: ['top', 'bottom'],
};

/**
  * Sequential ID generator
  */
export const Id = (i => () => i++)(0);

/**
  * Splits space/tab separated string into array and cleans empty string items.
  */
export const split = (value: unknown): string[] => {
  if (typeof value !== 'string') {
    return [];
  }

  return value.split(/\s+/gi).filter(v => v);
};

/**
  * Cleanes and transforms string of format "x y" into object {x, y}.
  * Possible combinations:
  *   x - left, center, right
  *   y - top, bottom
  */
export const listToDirection = (value: string | string[]): Direction => {
  if (typeof value === 'string') {
    value = split(value);
  }

  let x = null;
  let y = null;

  value.forEach(v => {
    if (directions.y.indexOf(v) !== -1) {
      y = v;
    }
    if (directions.x.indexOf(v) !== -1) {
      x = v;
    }
  });

  return { x, y };
};

export type NotificationItemWithTimer = NotificationItem & {
  timer?: number;
}

export class Timer {
  private start!: number;
  private remaining: number;
  private notifyItem: NotificationItemWithTimer;
  private callback: () => void

  constructor(callback: () => void, delay: number, notifItem: NotificationItemWithTimer) {
    this.remaining = delay;
    this.callback = callback;
    this.notifyItem = notifItem;
    this.resume();
  }

  pause(): void {
    clearTimeout(this.notifyItem.timer);
    this.remaining -= Date.now() - this.start;
  }

  resume(): void {
    this.start = Date.now();
    clearTimeout(this.notifyItem.timer);
    // @ts-ignore FIXME Node.js timer type
    this.notifyItem.timer = setTimeout(this.callback, this.remaining);
  }
}
