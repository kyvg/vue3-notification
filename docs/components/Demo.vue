<template>
  <!-- CSS animation example -->
  <Notifications
    group="foo-css"
    position="bottom left"
    dangerously-set-inner-html
    :speed="500"
  />

  <!-- Custom style example -->
  <notifications
    group="custom-style"
    position="top right"
    classes="n-light"
    dangerously-set-inner-html
    :max="3"
    :width="400"
  />

  <!-- Custom template example -->
  <notifications
    group="custom-template"
    :duration="5000"
    :width="500"
    animation-name="v-fade-left"
    position="top left"
    dangerously-set-inner-html
  >
    <template #body="{ item, close }">
      <div class="custom-template">
        <div class="custom-template-icon">
          <ion-icon name="checkmark-circle-outline" />
        </div>
        <div class="custom-template-content">
          <div class="custom-template-title">
            {{ item.title }}

            <p>
              Random number: {{ item.data.randomNumber }}
            </p>
          </div>
          <div
            class="custom-template-text"
            v-html="item.text"
          />
        </div>
        <div
          class="custom-template-close"
          @click="close"
        >
          <ion-icon name="close-outline" />
        </div>
      </div>
    </template>
  </notifications>

  <!-- Full width example -->
  <notifications
    group="full-width"
    position="bottom center"
    width="100%"
    dangerously-set-inner-html
  />

  <div class="content">
    <p>
      CSS animation:
    </p>
    <div class="block">
      <button
        class="success"
        @click="show('foo-css', 'success')"
      >
        <ion-icon name="information-circle-outline" />
        SUCCESS
      </button>
      <button
        class="warn"
        @click="show('foo-css', 'warn')"
      >
        <ion-icon name="alert-circle-outline" />
        WARNING
      </button>
      <button
        class="error"
        @click="show('foo-css', 'error')"
      >
        <ion-icon name="close-circle-outline" />
        ERROR
      </button>
    </div>

    <div>
      <p>Custom style:</p>
      <button @click="show('custom-style')">
        top right (max=3)
      </button>
      <p>Custom template:</p>
      <button @click="show('custom-template')">
        show top left
      </button>
      <p />
      <button @click="clean('custom-template')">
        <u>clean all</u> top left
      </button>
      <p />
      <button @click="show('full-width')">
        show bottom (full width)
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'demo',
  data() {
    return {
      id: 0,
    };
  },
  methods: {
    show(group, type = '') {
      const text = `
        This is notification text!
        <br>
        Date: ${new Date()}
      `;

      this.$notify({
        group,
        title: `Test ${type} notification #${this.id++}`,
        text,
        type,
        data: {
          randomNumber: Math.random(),
        },
      });
    },

    clean(group) {
      this.$notify({ group, clean: true });
    },
  },
});
</script>

<style lang="scss">
.content {
  button {
    display: flex;
    gap: 8px;
    align-items: center;
    border: none;
    border-radius: 2000px;
    padding: 10px 20px 10px 16px;
    color: #FFFFFF;
    background-color: var(--vp-c-text-2);

    &.success {
      background: var(--vp-c-success-3);
    }

    &.warn {
      background: var( --vp-c-warning-1);
    }


    &.error {
      background: var(--vp-c-danger-1);
    }
  }


  .block {
    display: flex;
    gap: 10px;
    align-items: center;
    width: 100%;
  }
}
/*
  EXAMPLES
*/

.vue-notification-template.n-light {
  margin: 10px;
  margin-bottom: 0;

  border-radius: 3px;
  font-size: 13px;

  padding: 10px 20px;

  color: #495061;
  background: #EAF4FE;

  border: 1px solid #D4E8FD;

  .notification-title {
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 10px;
    color: #2589F3;
  }
}

.custom-template {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  text-align: left;
  font-size: 13px;
  margin: 5px;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-default-1);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
  box-shadow: var(--vp-shadow-2);

  &, & > div {
    box-sizing: border-box;
  }

  .custom-template-icon {
    flex: 1 1 auto;
    color: var(--vp-c-success-3);
    font-size: 32px;
    padding: 0 10px;
  }

  .custom-template-close {
    flex: 1 1 auto;
    padding: 0 20px;
    font-size: 16px;
    opacity: 0.2;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  .custom-template-content {
    padding: 10px;
    flex: 1 1 auto;
    margin-bottom: auto;

    .custom-template-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 600;
    }
  }
}

.block {
  display: flex;
}

.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all .5s;
}

.v-fade-left-enter,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateX(-500px) scale(0.2);
}

</style>
