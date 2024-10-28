import { NotificationItem } from '@/types';

interface Timer {
  start: () => void;
  stop: () => void;
}


export type NotificationItemWithTimer = NotificationItem & {
  timer?: Timer;
}

export const createTimer = (callback: () => void, delay: number): Timer => {
  let timer: number;
  let startTime: number;
  let remainingTime = delay;

  const start = () => {
    startTime = Date.now();
    timer = setTimeout(callback, remainingTime);
  };

  const stop = () => {
    clearTimeout(timer);
    remainingTime -= Date.now() - startTime;
  };

  start();

  return {
    start,
    stop,
  };
};
