import { events } from './events';
import { NotificationsOptions } from './types';

export const notify = (args: NotificationsOptions | string): void => {
  if (typeof args === 'string') {
    args = { title: '', text: args };
  }

  if (typeof args === 'object') {
    events.emit('add', args);
  }
};

notify.close = function(id: unknown): void {
  events.emit('close', id);
};
