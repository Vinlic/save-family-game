<script setup lang="ts">
import { ref, onMounted } from 'vue';
import _ from 'lodash-es';

const overrideMessage = ref<string>();

defineProps<{
  message?: string
}>();

let inited = false;
const show = ref(false);
const opening = ref(false);
const closing = ref(false);
const animationEnd = ref<any>(() => { });

const open = (message?: string, callback?: Function) => {
  if(_.isString(message))
    overrideMessage.value = message;
  show.value = true;
  if(inited)
    opening.value = true;
  else
    inited = true;
  animationEnd.value = () => {
    callback && callback();
    opening.value = false;
  }
}

const close = () => {
  if(!show.value)
    return;
  closing.value = true;
  animationEnd.value = (() => {
    animationEnd.value = () => { };
    closing.value = false;
    show.value = false;
  });
}

const changeMessage = (message: string) => {
  overrideMessage.value = message;
}

defineExpose({
  open,
  close,
  changeMessage
});
</script>

<template>
  <div v-show="show" :class="'transition-mask' + (opening ? ' transition-mask-opening' : '') + (closing ? ' transition-mask-closing' : '')" @animationend="animationEnd">
    <div>
      <span>{{ _.isString(overrideMessage) ? overrideMessage : message }}</span>
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
  background: #25252f;
  z-index: 999;
  justify-content: center;
  align-items: center;
  display: flex;
}

.transition-mask-opening {
  animation: show-animate 500ms linear;
}

.transition-mask-closing {
  animation: hide-animate 500ms linear;
}

.transition-mask>div {
  color: #fff;
  font-size: 20px;
  letter-spacing: 8px;
  text-align: center;
  user-select: none;
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