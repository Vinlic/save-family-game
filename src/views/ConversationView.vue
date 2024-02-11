<script setup lang="ts">
import { ref, getCurrentInstance, onMounted, nextTick } from 'vue';
import router from '@/router';
import Save from '@/lib/Save';
import saveManager from '@/lib/save-manager';
import loader from '@/lib/loader';
import util from '@/lib/util';

const instance = getCurrentInstance();
const bus = instance?.proxy?.$bus;

if (!saveManager.currentSave)
    router.replace('/');
else {
    onMounted(() => {
        bus?.emit('transition-mask:off');
    });
}

</script>

<template>
  <div class="container">
    <h1>对话</h1>
  </div>
</template>

<style scoped>
@import '@/assets/styles/ConversationView.less';
</style>