import Notifications from './Notifications.vue'
import { events }    from './events'

export const notify = (params) => {
  if (typeof params === 'string') {
    params = { title: '', text: params }
  }

  if (typeof params === 'object') {
    events.emit('add', params)
  }
}

notify.close = function (id) {
  events.emit('close', id)
}

export default function Notification(args = {}) {
  Notification.params = args;
  return (app) => {

    app.component(args.componentName || 'notifications', Notifications);

    const name = args.name || 'notify'

    app.config.globalProperties['$' + name] = notify;
  };
}
