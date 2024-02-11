<script setup lang="ts">
import { ref } from 'vue';

let lock = false;
let timer: number;
const message = ref<string>('');
const show = ref(false);
const showing = ref(false);
const hiding = ref(false);
const animationEnd = ref<any>(() => { });

const _show = (_message: string, duration: number = 2000) => {
  message.value = _message;
  if(showing.value)
    showing.value = false;
  show.value = true;
  showing.value = true;
  animationEnd.value = () => {
    showing.value = false;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if(hiding.value)
        hiding.value = false;
      animationEnd.value = () => {
        hiding.value = false;
        show.value = false;
      };
      hiding.value = true;
    }, duration);
  };
}

defineExpose({
  show: _show
})
</script>

<template>
  <div v-show="show"
    :class="'message-fixed' + (showing ? ' message-showing' : '') + (hiding ? ' message-hiding' : '')"
    @animationend="animationEnd">
    <div class="message-box">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<style scoped>
.message-fixed {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 15px;
  text-align: right;
}

.message-showing {
  animation: show-animate 500ms ease;
}

.message-hiding {
  animation: hide-animate 500ms ease;
}

.message-box {
  padding: 8px 12px;
  margin: 0 auto;
  background: #fff;
  display: inline-block;
  font-size: 16px;
  border: 4px rgb(33, 37, 41) solid;
  letter-spacing: 2px;
  box-shadow: inset -4px -4px #adafbc;
  word-break: break-all;
  pointer-events: none;
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