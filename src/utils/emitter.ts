import mitt from 'mitt';

type EventType = {
  add: NotificationOptions;
  close: unknown;
}

export const emitter = mitt<EventType>();
