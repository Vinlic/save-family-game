<script setup lang="ts">
import { ref } from 'vue';

const overrideMessage = ref<string>();

defineProps<{
  message?: string
}>()

const show = ref(false);
const hide = ref(false);
const animationEnd = ref<any>(() => { });

const open = ({ message, callback }: { message?: string, callback?: Function }) => {
  show.value = true;
  if(message)
    overrideMessage.value = message;
  if(callback)
    animationEnd.value = callback;
}

const close = () => {
  hide.value = true;
  animationEnd.value = (() => {
    animationEnd.value = () => { };
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
  <div v-show="show" :class="'transition-mask' + (hide ? ' transition-mask-closing' : '')" @animationend="animationEnd">
    <div v-if="overrideMessage || message">
      <span>{{ overrideMessage || message }}</span>
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
  animation: show-animate 500ms linear;
  justify-content: center;
  align-items: center;
  display: flex;
}

.transition-mask-closing {
  animation: hide-animate 500ms linear;
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