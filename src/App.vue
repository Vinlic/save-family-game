<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
import TransitionMask from '@/components/TransitionMask.vue';
import MessageBox from './components/MessageBox.vue';
import { RouterLink, RouterView } from 'vue-router'

const instance = getCurrentInstance();
const bus = instance?.proxy?.$bus;

const transitionMask = ref<InstanceType<typeof TransitionMask>>();
const messageBox = ref<InstanceType<typeof MessageBox>>();

bus?.on('transition-mask:on', ([message, callback]: any = []) => transitionMask.value?.open(message, callback));
bus?.on('transition-mask:off', () => transitionMask.value?.close());
bus?.on('transition-mask:message:change', ([message]: any = []) => transitionMask.value?.changeMessage(message));
bus?.on('message-box:show', ([message = '', duration]: any = []) => messageBox.value?.show(message || '', duration));
</script>

<template>
  <div class="container">
    <RouterView />
  </div>
  <message-box ref="messageBox"></message-box>
  <transition-mask ref="transitionMask" message="资源加载中..."></transition-mask>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  font-family: "zpix";
}
</style>
