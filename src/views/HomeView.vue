<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import '@/assets/styles/HomeView.less';

const modal = ref<InstanceType<typeof Modal>>();

const transitionActive = ref(false);

const transition = (trigger?: Function) => {
  transitionActive.value = true;
  trigger && setTimeout(() => trigger(), 1000);
  setTimeout(() => {
    transitionActive.value = false;
  }, 2000);
};

const startGame = () => {
  // transition();
  modal.value?.open();
}

const continueGame = () => {

}

</script>

<template>
  <div class="container">
    <div class="welcome-container">
      <div class="center-group">
        <div class="title">
          <span class="tip">[内测版]</span>
          <span>救救家人</span>
        </div>
        <div class="menu">
          <button type="button" class="nes-btn" @click="startGame">新的开始</button>
          <button type="button" class="nes-btn">不忘初心</button>
          <button type="button" class="nes-btn">我的成就</button>
        </div>
        <!-- <div class="nes-field">
        <label for="name_field">Your name</label>
        <input type="text" id="name_field" class="nes-input">
      </div>

      <button type="button" class="nes-btn is-primary">开始游戏</button> -->
      </div>
    </div>
    <!-- <div class="user-info-enter">
      <input type="text" id="name_field" class="nes-input" placeholder="拯救者的名字">
    </div> -->
    <modal ref="modal" title="名字卡片" :width="400">
      <div class="nes-field">
        <label for="name_field">拯救者的名字</label>
        <input type="text" id="name_field" class="nes-input">
      </div>
      <button type="button" class="nes-btn is-success submit-btn">确认</button>
    </modal>
    <div :class="'transition-mask' + (transitionActive ? ' transition-mask-active' : '')"></div>
  </div>
</template>