<template>
  <transition-group
    tag="span"
    :name="name"
  >
    <slot />
  </transition-group>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

defineProps<{
  name: string
}>();
</script>
