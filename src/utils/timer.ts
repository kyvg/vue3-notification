import { NotificationItem } from '@/types';

export type NotificationItemWithTimer = NotificationItem & {
  timer?: number;
}

export class Timer {
  private start!: number;
  private remaining: number;
  private notifyItem: NotificationItemWithTimer;
  private callback: () => void;

  constructor(callback: () => void, delay: number, notifyItem: NotificationItemWithTimer) {
    this.remaining = delay;
    this.callback = callback;
    this.notifyItem = notifyItem;
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
