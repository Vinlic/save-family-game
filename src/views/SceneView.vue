<script lang="ts">
import { nextTick } from 'vue';
import { scenesMap } from '@/scenes';
import type { Message } from '@/lib/Scene';
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

const textareaRef = ref<HTMLTextAreaElement>();
const messageListContainerRef = ref<HTMLDivElement>();
const inputHiddenRef = ref<boolean>(true);
const currentSave = saveManager.currentSave as Save;
const scene = scenesMap[currentSave.currentSceneId];
const messageListRef = ref<Message[]>([]);

onMounted(() => {
  bus?.emit('transition-mask:off');
});

const loadInitialMessages = () => {
  scene.initialMessages.forEach((message, index) => {
    setTimeout(() => {
      messageListRef.value.push(message);
      if (index == scene.initialMessages.length - 1)
        setTimeout(() => {
          inputHiddenRef.value = false;
          nextTick(() => textareaRef.value?.focus());
        }, 500);
    }, (index + 1) * 1000);
  });
}

const inputText = () => {
  const textarea = textareaRef.value;
  if (!textarea || textarea?.scrollHeight <= 56)
    return;
  textarea.style.height = '56px';
  if (textarea?.scrollHeight > 300)
    textarea.style.overflowY = 'auto';
  else
    textarea.style.overflowY = 'hidden';
  textarea.style.height = `${textarea?.scrollHeight > 56 ? textarea?.scrollHeight + 8 : 56}px`;
};

const pushMessage = (message: Message) => {
  messageListRef.value.push(message);
  nextTick(() => {
    const container = messageListContainerRef.value;
    if (!container)
      return;
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  });
}

const sendMessage = (e: KeyboardEvent) => {
  const textarea = textareaRef.value;
  if (e.shiftKey && textarea) {
    textarea.value += '\n';
    inputText();
    return;
  }
  const content = textarea?.value || '';
  if(!content)
    return;
  pushMessage({
    type: 'self',
    roleName: '我',
    roleAvatarResId: 'images.avatar_self',
    content
  });
  if(textarea)
    textarea.value = '';
}

loadInitialMessages();
</script>

<template>
  <div class="container">
    <div ref="messageListContainerRef" class="message-list">
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
      <template v-for="message in messageListRef">
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
    <div v-show="!inputHiddenRef" class="message-input-container">
      <textarea ref="textareaRef" class="textarea" placeholder="说点什么..." @input="inputText"
        @keydown.enter.prevent="sendMessage" autofocus tabindex="-1"></textarea>
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