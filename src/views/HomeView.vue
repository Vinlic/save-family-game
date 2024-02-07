<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import '@/assets/styles/HomeView.less';

const nameModal = ref<InstanceType<typeof Modal>>();
const saveModal = ref<InstanceType<typeof Modal>>();
const achievementModal = ref<InstanceType<typeof Modal>>();

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
  nameModal.value?.open();
}

const continueGame = () => {
  saveModal.value?.open();
}

const openAchievement = () => {
  achievementModal.value?.open();
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
          <button type="button" class="nes-btn" @click="continueGame">不忘初心</button>
          <button type="button" class="nes-btn" @click="openAchievement">我的成就</button>
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

    <!-- 名字卡片模态框 -->
    <modal ref="nameModal" title="名字卡片" width="80%" max-width="400px">
      <div class="nes-field">
        <label for="name_field">拯救者的名字</label>
        <input type="text" id="name_field" class="nes-input">
      </div>
      <button type="button" class="nes-btn is-success submit-btn">确认</button>
    </modal>

    <modal ref="saveModal" title="我的回忆" width="80%" min-height="300px">
      <div class="save-item">
        <div>
          <img src="" />
        </div>
        <div>
          <span>诈骗骗局</span>
          <span>2024/02/07 12:49:56</span>
        </div>
      </div>
    </modal>

    <modal ref="achievementModal" title="我的成就" width="80%" min-height="300px">
      
    </modal>

    <div :class="'transition-mask' + (transitionActive ? ' transition-mask-active' : '')"></div>
  </div>
</template>