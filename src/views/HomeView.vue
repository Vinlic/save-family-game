<script setup lang="ts">
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import TransitionMask from '@/components/TransitionMask.vue';
import '@/assets/styles/HomeView.less';

const nameTipMap: Record<string, string> = {
  'vinlic': '有趣，加我微信 vinlickj 吧',
  'winily': '有趣，加我微信 li-winily 吧',
  'alexking': '有趣，加我微信 yy_ll_9 吧',
  'fuck': '这个名字。。。不太好听',
  'zjlian': '炸。。。。炸鸡柳？',
  'innoyiya': '抓住你了，杰哥',
  'yyc': '屌啊，卧槽',
  'cong': '屌啊，卧槽',
  '聪': '屌啊，屌啊',
  'mingmingv': '家明，是你！',
  'zhangcolder': '下午茶令人羡慕',
  'jiawei': '贾老师大驾光临！',
  '贾伟': '贾老师大驾光临！',
  'lao': '欢迎富有的 Lao！',
  'riddance': '欢迎架构师 Riddance！',
  'tao': '欢迎油桃大人！',
  '星河': '欢迎星河Agent！',
  'huangzg': '欢迎黄佬！',
  'zhipu': '去chatglm.cn看看？',
  'chatglm': '去chatglm.cn看看？',
  '俞小琳': '俞老板好！',
  '帛凡': '帛凡大佬大驾光临！',
  'helloworld': 'console.log("你好，世界");',
  'ai': '您就是AI？',
  'agent': '您就是AI？',
  'chatgpt': '您就是AI？',
  '<script>': '嗯？你想做什么？'
};
const disabledNames = [
  'fuck'
];

const nameModal = ref<InstanceType<typeof Modal>>();
const saveModal = ref<InstanceType<typeof Modal>>();
const achievementModal = ref<InstanceType<typeof Modal>>();
const messageModal = ref<InstanceType<typeof Modal>>();
const transitionMask = ref<InstanceType<typeof TransitionMask>>();

const name = ref('');
const messageText = ref('');

const saveList = ref([
  {
    name: '诈骗骗局',
    time: '2024/02/07 12:49:56'
  }
]);
const achievementList = ref([
  {
    name: '时间过去了？',
    time: '2024/02/07 12:49:56'
  }
]);

const startGame = () => {
  nameModal.value?.open();
}

const continueGame = () => {
  saveModal.value?.open();
}

const openAchievement = () => {
  achievementModal.value?.open();
}

const showMessage = (message: string) => {
  messageText.value = message;
  messageModal.value?.open();
}

const confirmName = () => {
  if(!verifyNameModal())
    return showMessage('名称不合法');
  transitionMask.value?.open();
}

const verifyNameModal = () => {
  const _name = name.value.trim();
  return _name && _name.length <= 20 && !disabledNames.includes(_name.toLowerCase());
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
      </div>
    </div>

    <!-- 名字卡片模态框 -->
    <modal ref="nameModal" title="名字卡片" width="85%" max-width="400px">
      <div class="nes-field">
        <label for="name-field">拯救者的名字</label>
        <input type="text" id="name-field" class="nes-input" v-model="name" maxlength="20" />
      </div>
      <span class="name-tip" v-if="nameTipMap[name.toLowerCase()]">{{ nameTipMap[name.toLowerCase()] }}</span>
      <button type="button" :class="'nes-btn submit-btn' + (!verifyNameModal() ? ' is-disabled' : ' is-success')" @click="confirmName">确认</button>
    </modal>

    <!-- 存档模态框 -->
    <modal ref="saveModal" title="我的回忆" width="85%" max-width="600px" min-height="300px" inner-max-height="400px">
      <div v-for="row in saveList.length % 3 + 1" class="save-row">
        <div v-for="save in saveList.slice((row - 1) * 3, (row - 1) * 3 + 3)" class="save-item">
          <div class="save-item-image">
            <img src="/scene_images/0de35832-43fc-599b-9e19-cc781315ab5d_0.jpg" />
          </div>
          <div class="save-item-info">
            <span>{{ save.name }}</span>
            <span>{{ save.time }}</span>
          </div>
        </div>
      </div>
    </modal>

    <!-- 成就模态框 -->
    <modal ref="achievementModal" title="我的成就" width="85%" max-width="600px" min-height="300px" inner-max-height="400px">
      <div v-for="row in achievementList.length % 3 + 1" class="achievement-row">
        <div v-for="achievement in achievementList.slice((row - 1) * 3, (row - 1) * 3 + 3)" class="achievement-item">
          <div class="achievement-item-image">
            <img src="/scene_images/0de35832-43fc-599b-9e19-cc781315ab5d_0.jpg" />
          </div>
          <div class="achievement-item-info">
            <span>{{ achievement.name }}</span>
            <span>{{ achievement.time }}</span>
          </div>
        </div>
      </div>
    </modal>

    <!-- 消息模态框 -->
    <modal ref="messageModal" title="系统提示" width="85%" max-width="300px" inner-max-height="300px">
      <span>{{ messageText }}</span>
    </modal>

    <transition-mask ref="transitionMask" message="资源加载中..."></transition-mask>
  </div>
</template>