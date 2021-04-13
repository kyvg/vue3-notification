import Notifications from './Notifications.vue'
import { events }    from './events'

function Notify(args = {}) {
  Notify.params = args
  return (app) => {

    app.component(args.componentName || 'notifications', Notifications)

    const notify = (params) => {
      if (typeof params === 'string') {
        params = { title: '', text: params }
      }

      if (typeof params === 'object') {
        events.$emit('add', params)
      }
    }

    notify.close = function (id) {
      events.$emit('close', id)
    }

    const name = args.name || 'notify'

    app.config.globalProperties['$' + name] = notify;
  }
}

export default Notify;
