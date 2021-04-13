<template>
  <transition-group
    :css="false"
    @enter="enter"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition-group>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
  name: 'VelocityGroup',
  emits: ['afterLeave', 'leave', 'enter'],
  methods: {
    enter (el, complete) {
      this.$emit('enter', { el, complete })
    },
    leave (el, complete) {
      this.$emit('leave', { el, complete })
    },
    afterLeave () {
      this.$emit('afterLeave')
    }
  }
})
</script>
