<script lang="ts">
import { scenesMap } from '@/scenes';
import saveManager from '@/lib/save-manager';

export default {
  beforeRouteEnter(to: any, from: any, next) {
    if (!saveManager.currentSave)
      next('/');
    else
      next();
  }
}
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
const scene = scenesMap[currentSave.currentSceneId];

onMounted(() => {
  bus?.emit('transition-mask:off');
  containerRef.value?.focus();
});

const inputText = (e: Event) => {
  if (!textareaRef.value || textareaRef.value?.scrollHeight <= 56)
    return;
  textareaRef.value.style.height = '56px';
  if (textareaRef.value?.scrollHeight > 300)
    textareaRef.value.style.overflowY = 'auto';
  else
    textareaRef.value.style.overflowY = 'hidden';
  textareaRef.value.style.height = `${textareaRef.value?.scrollHeight > 56 ? textareaRef.value?.scrollHeight : 56}px`;
};

</script>

<template>
  <div class="container" ref="containerRef" tabindex="-1">
    <div class="message-list">
      <div style="height:1px"></div>
      <div class="event-item">
        <div class="event-item-image">
          <img :src="loader.getResUrl(scenesMap[currentSave.currentSceneId]?.coverResId)" />
        </div>
        <div class="event-item-content">
          <span>{{ scene.name }}</span>
          <span>{{ scene.description }}</span>
        </div>
      </div>
      <template v-for="message in scene.initialMessages">
        <div v-if="message.type == 'self'" class="message-item message-item-right">
          <div class="message-container message-container-right">
            <span class="message-name message-name-right">{{ message.roleName }}</span>
            <div class="message-content message-content-right">
              <span>{{ message.content }}</span>
            </div>
          </div>
          <div class="message-avatar">
            <img :src="loader.getResUrl(message.roleAvatarResId)" />
          </div>
        </div>
        <div v-else class="message-item message-item-left">
          <div class="message-avatar">
            <img :src="loader.getResUrl(message.roleAvatarResId)" />
          </div>
          <div class="message-container message-container-left">
            <span class="message-name message-name-left">{{ message.roleName }}</span>
            <div class="message-content message-content-left">
              <span>{{ message.content }}</span>
            </div>
          </div>
        </div>
      </template>
      <div class="bottom-block"></div>
    </div>
    <div class="message-input-container">
      <textarea ref="textareaRef" class="textarea" placeholder="说点什么..." @input="inputText"></textarea>
      <div class="send-button-container nes-pointer">
        <div>
          <img src="@/assets/images/send.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/SceneView.less';
</style>