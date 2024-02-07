<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  message?: string
}>()

const show = ref(false);
const hide = ref(false);
const hideAnimationEnd = ref(() => { });

const open = () => {
  show.value = true;
}

const close = () => {
  hide.value = true;
  hideAnimationEnd.value = (() => {
    hideAnimationEnd.value = () => { };
    hide.value = false;
    show.value = false;
  });
}

defineExpose({
  open,
  close
});
</script>

<template>
  <div v-show="show" :class="'transition-mask' + (hide ? ' transition-mask-closing' : '')" @animationend="hideAnimationEnd">
    <div v-if="message">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<style scoped>
.transition-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  z-index: 999;
  animation: show-animate 500ms ease;
  justify-content: center;
  align-items: center;
  display: flex;
}

.transition-mask-closing {
  animation: hide-animate 500ms ease;
}

.transition-mask>div {
  color: #fff;
  font-size: 20px;
  letter-spacing: 8px;
  text-align: center;
}

.transition-mask>div>i {
  display: block;
}

@keyframes show-animate {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hide-animate {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>