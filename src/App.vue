<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
import TransitionMask from '@/components/TransitionMask.vue';
import MessageBox from './components/MessageBox.vue';
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';

const instance = getCurrentInstance();
const bus = instance?.proxy?.$bus;

const transitionMaskRef = ref<InstanceType<typeof TransitionMask>>();
const messageBoxRef = ref<InstanceType<typeof MessageBox>>();

bus?.on('transition-mask:on', ([message, callback]: any = []) => transitionMaskRef.value?.open(message, callback));
bus?.on('transition-mask:off', () => transitionMaskRef.value?.close());
bus?.on('transition-mask:message:change', ([message]: any = []) => transitionMaskRef.value?.changeMessage(message));
bus?.on('message-box:show', ([message = '', duration]: any = []) => messageBoxRef.value?.show(message || '', duration));

</script>

<template>
  <div ref="containerRef" class="container">
    <RouterView />
  </div>
  <message-box ref="messageBoxRef"></message-box>
  <transition-mask ref="transitionMaskRef" message="资源加载中..."></transition-mask>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  font-family: "zpix";
}
</style>
