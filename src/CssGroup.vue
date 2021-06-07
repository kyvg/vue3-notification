<template>
  <transition-group
    tag="span"
    :name="name"
  >
    <slot />
  </transition-group>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'css-group',
  props: {
    name: { type: String, required: true },
  },
});
</script>
