<template>
  <transition-group
    tag="span"
    :css="false"
    @enter="enter"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'velocity-group',
  emits: ['after-leave', 'leave', 'enter'],
  methods: {
    enter(el: Element, complete: () => void) {
      this.$emit('enter', el, complete);
    },
    leave(el: Element, complete: () => void) {
      this.$emit('leave', el, complete);
    },
    afterLeave() {
      this.$emit('after-leave');
    },
  },
});
</script>
