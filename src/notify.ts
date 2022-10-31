import { emitter } from './events';
import { NotificationsOptions } from './types';

export const notify = (args: NotificationsOptions | string): void => {
  if (typeof args === 'string') {
    args = { title: '', text: args };
  }

  if (typeof args === 'object') {
    emitter.emit('add', args);
  }
};

notify.close = (id: unknown): void => {
  emitter.emit('close', id);
};

export const useNotification = () => {
  return { notify };
};

