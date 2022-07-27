<template>
  <div
    class="vue-notification-group"
    :style="styles"
  >
    <component
      :is="componentName"
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
            <div
              v-if="item.title"
              class="notification-title"
              v-html="item.title"
            />
            <div
              class="notification-content"
              v-html="item.text"
            />
          </div>
        </slot>
      </div>
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { emitter } from './events';
import { params } from './params';
import { Id, listToDirection, Timer, NotificationItemWithTimer } from './util';
import defaults from './defaults';
import VelocityGroup from './VelocityGroup.vue';
import CssGroup from './CssGroup.vue';
import parseNumericValue, { ValueType } from './parser';
import { NotificationsOptions } from './types';

const STATE = {
  IDLE: 0,
  DESTROYED: 2,
} as const;

type NotificationItemState = typeof STATE;

type NotificationItemExtended = NotificationItemWithTimer & {
  state: NotificationItemState[keyof NotificationItemState];
}

interface Data {
  list: NotificationItemExtended[];
  timerControl: Timer | null;
  velocity: any;
}

export default defineComponent({
  name: 'notifications',
  components: {
    VelocityGroup,
    CssGroup,
  },
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
      type: [String, Array] as PropType<string| string[]>,
      default: defaults.position,
    },

    classes: {
      type: String,
      default: 'vue-notification',
    },

    animationType: {
      type: String as PropType<'css' | 'velocity'>,
      default: 'css',
    },

    animation: {
      type: Object,
      default: defaults.velocityAnimation,
    },

    animationName: {
      type: String,
      default: defaults.cssAnimation,
    },

    speed: {
      type: Number,
      default: 300,
    },
    /* Todo */
    cooldown: {
      type: Number,
      default: 0,
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
  },
  emits: ['click', 'destroy'],
  data(): Data {
    return {
      list: [],
      velocity: params.get('velocity'),
      timerControl: null,
    };
  },
  computed: {
    actualWidth(): ValueType {
      return parseNumericValue(this.width);
    },
    isVA(): boolean {
      return this.animationType === 'velocity';
    },

    componentName(): string {
      return this.isVA ? 'velocity-group' : 'css-group';
    },

    styles() {
      const { x, y } = listToDirection(this.position);
      const width = this.actualWidth.value;
      const suffix = this.actualWidth.type;

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
    },

    active(): NotificationItemExtended[] {
      return this.list.filter(v => v.state !== STATE.DESTROYED);
    },

    botToTop(): boolean {
      // eslint-disable-next-line no-prototype-builtins
      return this.styles.hasOwnProperty('bottom');
    },
  },
  mounted() {
    emitter.on('add', this.addItem);
    emitter.on('close', this.closeItem);
  },
  methods: {
    destroyIfNecessary(item: NotificationItemExtended) {
      this.$emit('click', item);
      if (this.closeOnClick) {
        this.destroy(item);
      }
    },
    pauseTimeout() {
      if (this.pauseOnHover) {
        this.timerControl?.pause();
      }
    },
    resumeTimeout() {
      if (this.pauseOnHover) {
        this.timerControl?.resume();
      }
    },
    addItem(event: NotificationsOptions = {}): void {
      event.group ||= '';
      event.data ||= {};

      if (this.group !== event.group) {
        return;
      }

      if (event.clean || event.clear) {
        this.destroyAll();
        return;
      }

      const duration = typeof event.duration === 'number'
        ? event.duration
        : this.duration;

      const speed = typeof event.speed === 'number'
        ? event.speed
        : this.speed;

      const ignoreDuplicates = typeof event.ignoreDuplicates === 'boolean'
        ? event.ignoreDuplicates
        : this.ignoreDuplicates;

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
        this.timerControl = new Timer(() => this.destroy(item), item.length, item);
      }

      const direction = this.reverse
        ? !this.botToTop
        : this.botToTop;

      let indexToDestroy = -1;

      const isDuplicate = this.active.some(i => {
        return i.title === event.title && i.text === event.text;
      });

      const canAdd = ignoreDuplicates ? !isDuplicate : true;

      if (!canAdd) {
        return;
      }

      if (direction) {
        this.list.push(item);

        if (this.active.length > this.max) {
          indexToDestroy = 0;
        }
      } else {
        this.list.unshift(item);

        if (this.active.length > this.max) {
          indexToDestroy = this.active.length - 1;
        }
      }

      if (indexToDestroy !== -1) {
        this.destroy(this.active[indexToDestroy]);
      }
    },

    closeItem(id: unknown) {
      this.destroyById(id);
    },

    notifyClass(item: NotificationItemExtended): string[] {
      return [
        'vue-notification-template',
        this.classes,
        item.type ?? '',
      ];
    },

    notifyWrapperStyle(item: NotificationItemExtended) {
      return this.isVA
        ? undefined
        : { transition: `all ${item.speed}ms` };
    },

    destroy(item: NotificationItemExtended): void {
      clearTimeout(item.timer);
      item.state = STATE.DESTROYED;

      this.clean();

      this.$emit('destroy', item);
    },

    destroyById(id: unknown): void {
      const item = this.list.find(v => v.id === id);

      if (item) {
        this.destroy(item);
      }
    },

    destroyAll(): void {
      this.active.forEach(this.destroy);
    },

    getAnimation(index: string, el: Element) {
      const animation = this.animation?.[index];

      return typeof animation === 'function'
        ? animation.call(this, el)
        : animation;
    },

    enter(el: Element, complete: () => void): void {
      if (!this.isVA) {
        return;
      }
      const animation = this.getAnimation('enter', el);

      this.velocity(el, animation, {
        duration: this.speed,
        complete,
      });
    },

    leave(el: Element, complete: () => void) {
      if (!this.isVA) {
        return;
      }
      const animation = this.getAnimation('leave', el);

      this.velocity(el, animation, {
        duration: this.speed,
        complete,
      });
    },

    clean() {
      this.list = this.list.filter(v => v.state !== STATE.DESTROYED);
    },
  },
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
