import { HTMLAttributes, PropType, SetupContext, SlotsType, computed, defineComponent, onMounted, ref } from 'vue';
import { params } from '@/params';
import { Id, listToDirection, Timer, NotificationItemWithTimer, emitter, parse } from '@/utils';
import defaults from '@/defaults';
import { NotificationItem, NotificationsOptions } from '@/types';
import VelocityGroup from './group/VelocityGroup';
import CssGroup from './group/CssGroup';
import './Notifications.css';

const STATE = {
  IDLE: 0,
  DESTROYED: 2,
} as const;

type NotificationItemState = typeof STATE;

type NotificationItemExtended = NotificationItemWithTimer & {
  state: NotificationItemState[keyof NotificationItemState];
}

type Emit = {
  click: [item: NotificationItem],
  destroy: [item: NotificationItem],
  start: [item: NotificationItem],
}

type Slots = SlotsType<{
  body?: (props: { class: string, item: HTMLAttributes['class'], close: () => void }) => any;
}>

// defineSlots
export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'notifications',
  props: {
    group: {
      type: String,
      default: '',
    },

    width: {
      type: [Number, String],
      default: 300,
    },

    reverse: {
      type: Boolean,
      default: false,
    },

    position: {
      type: [String, Array] as PropType<string | string[]>,
      default: () => {
        return defaults.position;
      },
    },

    classes: {
      type: String,
      default: 'vue-notification',
    },

    animationType: {
      type: String as PropType<'css' | 'velocity'>,
      default: 'css',
      validator(value) {
        return value === 'css' || value === 'velocity';
      },
    },

    animation: {
      type: Object as PropType<Record<'enter' | 'leave', unknown>>,
      default() {
        return defaults.velocityAnimation;
      },
    },

    animationName: {
      type: String,
      default: defaults.cssAnimation,
    },

    speed: {
      type: Number,
      default: 300,
    },

    duration: {
      type: Number,
      default: 3000,
    },

    delay: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },

    ignoreDuplicates: {
      type: Boolean,
      default: false,
    },

    closeOnClick: {
      type: Boolean,
      default: true,
    },

    pauseOnHover: {
      type: Boolean,
      default: false,
    },

    dangerouslySetInnerHtml: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    click: (item: NotificationItem) => true,
    destroy: (item: NotificationItem) => true,
    start: (item: NotificationItem) => true,
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  setup: (props, { emit, slots, expose }: SetupContext<Emit, Slots>) => {
    const list = ref<NotificationItemExtended[]>([]);
    const timerControl = ref<Timer | null>(null);
    const velocity = ref(params.get('velocity'));

    const isVA = computed(() => {
      return props.animationType === 'velocity';
    });

    const Component = computed(() => {
      return isVA.value ? VelocityGroup : CssGroup;
    });

    const active = computed<NotificationItemExtended[]>(() => {
      return list.value.filter(v => v.state !== STATE.DESTROYED);
    });

    const actualWidth = computed(() => {
      return parse(props.width);
    });

    const styles = computed(() => {
      const { x, y } = listToDirection(props.position);
      const width = actualWidth.value.value;
      const suffix = actualWidth.value.type;

      // eslint-disable-next-line no-shadow
      const styles: Record<string, string> = {
        width: width + suffix,
      };

      if (y) {
        styles[y] = '0px';
      }

      if (x) {
        if (x === 'center') {
          styles['left'] = `calc(50% - ${+width / 2}${suffix})`;
        } else {
          styles[x] = '0px';
        }

      }

      return styles;
    });

    const botToTop = computed(() => {
      return 'bottom' in styles.value;
    });

    const destroyIfNecessary = (item: NotificationItemExtended) => {
      emit('click', item);
      if (props.closeOnClick) {
        destroy(item);
      }
    };

    const pauseTimeout = () => {
      if (props.pauseOnHover) {
        timerControl.value?.pause();
      }
    };
    const resumeTimeout = () => {
      if (props.pauseOnHover) {
        timerControl.value?.resume();
      }
    };
    const addItem = (event: NotificationsOptions = {}): void => {
      event.group ||= '';
      event.data ||= {};

      if (props.group !== event.group) {
        return;
      }

      if (event.clean || event.clear) {
        destroyAll();
        return;
      }

      const duration = typeof event.duration === 'number'
        ? event.duration
        : props.duration;

      const speed = typeof event.speed === 'number'
        ? event.speed
        : props.speed;

      const ignoreDuplicates = typeof event.ignoreDuplicates === 'boolean'
        ? event.ignoreDuplicates
        : props.ignoreDuplicates;

      const { title, text, type, data, id } = event;

      const item: NotificationItemExtended = {
        id: id || Id(),
        title,
        text,
        type,
        state: STATE.IDLE,
        speed,
        length: duration + 2 * speed,
        data,
      };

      if (duration >= 0) {
        timerControl.value = new Timer(() => destroy(item), item.length, item);
      }

      const direction = props.reverse
        ? !botToTop.value
        : botToTop.value;

      let indexToDestroy = -1;

      const isDuplicate = active.value.some(i => {
        return i.title === event.title && i.text === event.text;
      });

      const canAdd = ignoreDuplicates ? !isDuplicate : true;

      if (!canAdd) {
        return;
      }

      if (direction) {
        list.value.push(item);
        emit('start', item);

        if (active.value.length > props.max) {
          indexToDestroy = 0;
        }
      } else {
        list.value.unshift(item);
        emit('start', item);

        if (active.value.length > props.max) {
          indexToDestroy = active.value.length - 1;
        }
      }

      if (indexToDestroy !== -1) {
        destroy(active.value[indexToDestroy]);
      }
    };
 
    const closeItem = (id: unknown) => {
      destroyById(id);
    };

    const notifyClass = (item: NotificationItemExtended): string[] => {
      return [
        'vue-notification-template',
        props.classes,
        item.type || '',
      ];
    };

    const notifyWrapperStyle = (item: NotificationItemExtended) => {
      return isVA.value
        ? undefined
        : { transition: `all ${item.speed}ms` };
    };

    const destroy = (item: NotificationItemExtended): void => {
      clearTimeout(item.timer);
      item.state = STATE.DESTROYED;

      clean();

      emit('destroy', item);
    };

    const destroyById = (id: unknown): void=>{
      const item = list.value.find(i => i.id === id);

      if (item) {
        destroy(item);
      }
    };

    const destroyAll = (): void => {
      active.value.forEach(destroy);
    };

    const getAnimation = (index: 'enter' | 'leave', el: Element)=> {
      const animation = props.animation?.[index];

      return typeof animation === 'function'
        ? animation(el)
        : animation;
    };

    const enter = (el: Element, complete: () => void): void=> {
      if (!isVA.value) {
        return;
      }
      const animation = getAnimation('enter', el);

      velocity.value(el, animation, {
        duration: props.speed,
        complete,
      });
    };

    const leave = (el: Element, complete: () => void)=> {
      if (!isVA.value) {
        return;
      }
      const animation = getAnimation('leave', el);

      velocity.value(el, animation, {
        duration: props.speed,
        complete,
      });
    };

    function clean() {
      list.value = list.value.filter(item => item.state !== STATE.DESTROYED);
    }


    onMounted(() => {
      emitter.on('add', addItem);
      emitter.on('close', closeItem);
    });

    if (import.meta.env.DEV) {
      expose({
        list,
        addItem,
      });
    }


    return () => (
      <div
        class='vue-notification-group'
        style={styles.value}
      >
        <Component.value
          name={props.animationName}
          onEnter={enter}
          onLeave={leave}
          onAfter-leave={clean}
        >
          {
            active.value.map((item) => {
              return (
                <div
                  key={item.id}
                  class='vue-notification-wrapper'
                  style={notifyWrapperStyle(item)}
                  data-id={item.id}
                  onMouseenter={pauseTimeout}
                  onMouseleave={resumeTimeout}
                >
                  {
                    slots.body ? slots.body({
                      item,
                      class: [props.classes, item.type].join(''),
                      close: () => destroy(item),
                    }) : (
                      <div
                        class={notifyClass(item)}
                        onClick={() => destroyIfNecessary(item)}
                      >
                        {
                          props.dangerouslySetInnerHtml ? 
                            (
                              <>
                                {(item.title ? 
                                  <div
                                    class='notification-title'
                                    v-html={item.title} /> : null)}
                                <div class='notification-content' v-html={item.text} />
                              </>
                            )
                            : (
                              <>
                                {(item.title ? 
                                  <div class='notification-title'>
                                    { item.title }
                                  </div> : null)}
                                <div class='notification-content'>
                                  { item.text }
                                </div>
                              </>
                            )
                        }

                      </div>
                    )
                  }
                </div>
              );
            })
          }
      
        </Component.value>
      </div>
    );
  },
});
