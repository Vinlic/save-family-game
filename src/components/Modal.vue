<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  title: string
  width?: string
  height?: string
  maxWidth?: string
  maxHeight?: string
  innerMinHeight?: string
  innerMaxHeight?: string
  minWidth?: string
  minHeight?: string
  disableClose?: boolean
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

const stop = () => {};

defineExpose({
  open,
  close
})
</script>

<template>
  <div v-show="show" class="modal-mask" @click="disableClose ? stop() : close()">
    <div :class="'modal' + (hide ? ' modal-closing' : '')" :style="{
      width,
      height,
      'max-width': maxWidth,
      'max-height': maxHeight,
      'min-width': minWidth,
      'min-height': minHeight
    }" @animationend="hideAnimationEnd" @click.stop="stop">
      <div class="modal-header">
        <div>
          <span>{{ title }}</span>
        </div>
        <div v-if="!disableClose" @click="close">
          <i class="nes-icon close is-small"></i>
        </div>
      </div>
      <div class="modal-container" :style="{ 'min-height': innerMinHeight, 'max-height': innerMaxHeight }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  display: flex;
  background: rgba(0, 0, 0, .7);
  animation: fade-animate 500ms ease;
}

.modal {
  background: #fff;
  animation: show-animate 500ms ease;
  position: relative;
  border-style: solid;
  border-width: 4px;
  border-image-slice: 2;
  border-image-width: 2;
  border-image-outset: 2;
  border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>');
  border-image-repeat: space;
  letter-spacing: 2px;

  &::after {
    position: absolute;
    top: -4px;
    right: -4px;
    bottom: -4px;
    left: -4px;
    content: "";
    box-shadow: inset -4px -4px #adafbc;
    pointer-events: none;
  }

  .modal-header {
    padding: 3px 11px 6px 11px;
    font-size: 18px;
    border-bottom: 3px #888 solid;
    justify-content: space-between;
    align-items: center;
    display: flex;
  }

  .modal-header>div {
    align-items: center;
    display: flex;
  }

  .modal-header>div:last-child {
    cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAzElEQVRYR+2X0Q6AIAhF5f8/2jYXZkwEjNSVvVUjDpcrGgT7FUkI2D9xRfQETwNIiWO85wfINfQUEyxBG2ArsLwC0jioGt5zFcwF4OYDPi/mBYKm4t0U8ATgRm3ThFoAqkhNgWkA0jJLvaOVSs7j3qMnSgXWBMiWPXe94QqMBMBc1VZIvaTu5u5pQewq0EqNZvIEMCmxAawK0DNkay9QmfFNAJUXfgGgUkLaE7j/h8fnASkxHTz0DGIBMCnBeeM7AArpUd3mz2x3C7wADglA8BcWMZhZAAAAAElFTkSuQmCC) 14 0, pointer;
  }

  .modal-container {
    padding: 10px 10px 20px 10px;
    font-size: 16px;
    overflow-y: auto;
  }

  .modal-container::-webkit-scrollbar {
    display: none;
  }

}

.modal-closing {
  animation: hide-animate 300ms ease;
}

@keyframes fade-animate {
  from {
    background: rgba(0, 0, 0, 0);
  }

  to {
    background: rgba(0, 0, 0, 0.7);
  }
}

@keyframes show-animate {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

@keyframes hide-animate {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(0);
  }
}
</style>