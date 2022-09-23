<template>
  <transition name="notification">
    <div class="notify" v-show="showNotification">
      <div
        class="alert d-flex gap-2"
        :class="{
          'alert-danger': theme === 'error',
          'alert-success': theme === 'success',
        }"
      >
        <i
          class="fa-regular fa-circle-check mt-1"
          v-if="theme === 'success'"
        ></i>
        <i class="fa-regular fa-circle-xmark mt-1" v-if="theme === 'error'"></i>
        <div>
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  showNotification: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.notify {
  position: absolute;
  top: 30px;
  right: 20px;
  min-width: 10%;
  z-index: 1000;
  cursor: pointer;
  .alert {
    height: 50px;
    font-size: 20px;
    padding-top: 10px;
    font-weight: 600;
  }
}
.notification-enter-active,
.notification-leave-active {
  transition: all 0.8s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.notification-enter-from,
.notification-leave-to {
  transform: translateX(600px);
}
</style>
