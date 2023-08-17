<template>
  <transition-group
    tag="span"
    :css="false"
    @enter="handleEnter"
    @leave="handleLeave"
    @after-leave="handleAfterLeave"
  >
    <slot />
  </transition-group>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: 'enter', element: Element, done: () => void): void,
  (event: 'leave', element: Element, done: () => void): void,
  (event: 'after-leave'): void
}>();

const handleEnter = (element: Element, done: () => void) => {
  emit('enter', element, done);
};

const handleLeave = (element: Element, done: () => void) => {
  emit('leave', element, done);
};

const handleAfterLeave = () => {
  emit('after-leave');
};
</script>
