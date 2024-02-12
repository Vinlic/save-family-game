<script lang="ts">
import saveManager from '@/lib/save-manager';

// export default {
//   beforeRouteEnter(to: any, from: any, next) {
//     if (!saveManager.currentSave)
//       next('/');
//     else
//       next();
//   }
// }
</script>
<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue';
import Save from '@/lib/Save';
import loader from '@/lib/loader';

const instance = getCurrentInstance();
const bus = instance?.proxy?.$bus;

const containerRef = ref<HTMLDivElement>();
const textareaRef = ref<HTMLTextAreaElement>();
const currentSave = saveManager.currentSave as Save;

onMounted(() => {
  bus?.emit('transition-mask:off');
  containerRef.value?.focus();
});

const inputText = (e: Event) => {
  if(!textareaRef.value || textareaRef.value?.scrollHeight <= 60)
    return;
  textareaRef.value.style.height = '60px';
  if(textareaRef.value?.scrollHeight > 300)
    textareaRef.value.style.overflowY = 'auto';
  else
    textareaRef.value.style.overflowY = 'hidden';
  textareaRef.value.style.height = `${textareaRef.value?.scrollHeight + 8}px`;
};

</script>

<template>
  <div class="container" ref="containerRef" tabindex="-1">
    <div class="message-list">
      
    </div>
    <div class="message-input-container">
      <textarea ref="textareaRef" class="textarea" placeholder="说点什么..." @input="inputText"></textarea>
      <div class="send-button-container">
        <img src="@/assets/images/send.png" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/SceneView.less';
</style>