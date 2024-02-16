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
      <div class="message-item message-item-right">
        <div class="message-container message-container-right">
          <span class="message-name message-name-right">我</span>
          <div class="message-content message-content-right">
            <span>奶奶！那些都是假的，我查了这个所谓的院士并不存在，就是骗老年人买保健品，那些药其实都是没有作用的淀粉丸子！</span>
          </div>
        </div>
        <div class="message-avatar">
          <img :src="loader.getResUrl('images.avatar_2')" />
        </div>
      </div>
      <div class="message-item message-item-left">
        <div class="message-avatar">
          <img :src="loader.getResUrl('images.avatar_1')" />
        </div>
        <div class="message-container message-container-left">
          <span class="message-name message-name-left">奶奶</span>
          <div class="message-content message-content-left">
            <span>哎，你这孩子，奶奶吃的盐比你吃的米还多，我知道自己在做什么。现在的年轻人啊，总觉得自己懂得多，其实社会经验还是太少。那些院士可能你不知道，但并不代表他们不存在。再说了，我买的这些保健品，都是经过国家认证的，怎么可能是假的呢？奶奶我虽然年纪大了，但还不至于被骗。</span>
          </div>
        </div>
      </div>
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