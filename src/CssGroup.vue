<template>
  <transition-group :name="name">
    <slot />
  </transition-group>
</template>
<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: 'CssGroup',
  props: {
    name: { type: String, required: true },
  }
})
</script>
