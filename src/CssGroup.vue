<template>
  <transition-group
    tag="span"
    :name="name"
  >
    <slot />
  </transition-group>
</template>
<script lang="ts">
import { defineComponent, TransitionGroup } from 'vue';

export default defineComponent({
  name: 'css-group',
  components: {
    TransitionGroup,
  },
  props: {
    name: { type: String, required: true },
  },
});
</script>
