<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
import TransitionMask from '@/components/TransitionMask.vue';
import { RouterLink, RouterView } from 'vue-router'

const instance = getCurrentInstance();
const bus = instance?.proxy?.$bus;

const transitionMask = ref<InstanceType<typeof TransitionMask>>();

bus?.on('transition-mask:on', (callback?: any) => transitionMask.value?.open(callback));
bus?.on('transition-mask:off', () => transitionMask.value?.close());
bus?.on('transition-mask:message:change', (message?: any) => transitionMask.value?.changeMessage(message));
</script>

<template>
  <div class="container">
    <RouterView />
  </div>
  <transition-mask ref="transitionMask" message="资源加载中..."></transition-mask>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  font-family: "zpix";
}
</style>
