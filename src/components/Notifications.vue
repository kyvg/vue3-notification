<template>
  <div
    class="vue-notification-group"
    :style="styles"
  >
    <component
      :is="component"
      :name="animationName"
      @enter="enter"
      @leave="leave"
      @after-leave="clean"
    >
      <div
        v-for="item in active"
        :key="item.id"
        class="vue-notification-wrapper"
        :style="notifyWrapperStyle(item)"
        :data-id="item.id"
        @mouseenter="pauseTimeout"
        @mouseleave="resumeTimeout"
      >
        <slot
          name="body"
          :class="[classes, item.type]"
          :item="item"
          :close="() => destroy(item)"
        >
          <!-- Default slot template -->
          <div
            :class="notifyClass(item)"
            @click="destroyIfNecessary(item)"
          >
            <template v-if="dangerouslySetInnerHtml">
              <div
                v-if="item.title"
                class="notification-title"
                v-html="item.title"
              />
              <div class="notification-content" v-html="item.text" />
            </template>

            <template v-else>
              <div v-if="item.title" class="notification-title">
                {{ item.title }}
              </div>
              <div class="notification-content">
                {{ item.text }}
              </div>
            </template>
          </div>
        </slot>
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { params } from '@/params';
import { Id, listToDirection, Timer, NotificationItemWithTimer, emitter, parse } from '@/utils';
import defaults from '@/defaults';
import { NotificationItem, NotificationsOptions } from '@/types';
import VelocityGroup from './group/VelocityGroup.vue';
import CssGroup from './group/CssGroup.vue';

const STATE = {
  IDLE: 0,
  DESTROYED: 2,
} as const;

type NotificationItemState = typeof STATE;

type NotificationItemExtended = NotificationItemWithTimer & {
  state: NotificationItemState[keyof NotificationItemState];
}

const props = withDefaults(defineProps<{
  group?: string;
  width?: string | number;
  reverse?: boolean;
  position?: string | string[];
  classes?: string;
  animationType?: 'css' | 'velocity'
  animation?: Record<'enter' | 'leave', unknown>
  animationName?: string,
  speed?: number
  duration?: number
  delay?: number
  max?: number
  ignoreDuplicates?: boolean
  closeOnClick?: boolean
  pauseOnHover?: boolean
  dangerouslySetInnerHtml?: boolean
}>(), {
  group: '',
  width: 300,
  reverse: false,
  position: defaults.position,
  classes: 'vue-notification',
  animationType: 'css',
  animation: defaults.velocityAnimation,
  animationName: defaults.cssAnimation,
  speed: 300,
  duration: 3000,
  delay: 0,
  max: Infinity,
  ignoreDuplicates: false,
  closeOnClick: true,
  pauseOnHover: false,
  dangerouslySetInnerHtml: false,
});

const emit = defineEmits<{
  click: [item: NotificationItem],
  destroy: [item: NotificationItem],
  start: [item: NotificationItem],
}>();

const list = ref<NotificationItemExtended[]>([]);
const timerControl = ref<Timer | null>(null);
const velocity = ref(params.get('velocity'));

const isVA = computed(() => {
  return props.animationType === 'velocity';
});

const component = computed(() => {
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
</script>
<style>
.vue-notification-group {
  display: block;
  position: fixed;
  z-index: 5000;
}

.vue-notification-wrapper {
  display: block;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
}

.notification-title {
  font-weight: 600;
}

.vue-notification-template {
  display: block;
  box-sizing: border-box;
  background: white;
  text-align: left;
}

.vue-notification {
  display: block;
  box-sizing: border-box;
  text-align: left;
  font-size: 12px;
  padding: 10px;
  margin: 0 5px 5px;

  color: white;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
}

.vue-notification.warn {
  background: #ffb648;
  border-left-color: #f48a06;
}

.vue-notification.error {
  background: #E54D42;
  border-left-color: #B82E24;
}

.vue-notification.success {
  background: #68CD86;
  border-left-color: #42A85F;
}

.vn-fade-enter-active, .vn-fade-leave-active, .vn-fade-move  {
  transition: all .5s;
}

.vn-fade-enter-from, .vn-fade-leave-to {
  opacity: 0;
}

</style>
