<script lang="ts">
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
import scenes from '@/scenes';
import router from '@/router';
import loader from '@/lib/loader';

const instance = getCurrentInstance();
const bus = instance?.proxy?.$bus;

const containerRef = ref<HTMLDivElement>();
const currentIndex = ref(0);
const slideSize = ref(4);
const currentSave = saveManager.currentSave as Save;

onMounted(() => {
    resize();
    bus?.emit('transition-mask:off');
    containerRef.value?.focus();
    const sceneIndex = scenes.findIndex(scene => scene.id == currentSave.currentSceneId);
    if(sceneIndex == -1)
        return;
    setTimeout(() => {
        currentIndex.value = Math.floor(sceneIndex / slideSize.value);
    }, 500);
});

const calcSlideStyle = () => {
    return {
        transform: `translateX(${-currentIndex.value * 100}%)`
    };
};

const switchLeft = () => {
    if (currentIndex.value < 1)
        return;
    currentIndex.value--;
};

const switchRight = () => {
    if (currentIndex.value >= Math.ceil(scenes.length / slideSize.value) - 1)
        return;
    currentIndex.value++;
};

const openScene = (sceneId: string) => {
    currentSave.currentSceneId = sceneId;
    saveManager.save(currentSave.id, currentSave);
    bus?.emit('transition-mask:on', ['开启骗局中...', () => router.push('scene')]);
}

const showLockTip = () => {
    bus?.emit('message-box:show', ['场景还未解锁']);
}

const resize = () => {
    const windowWidth = window.innerWidth;
    currentIndex.value = 0;
    let size = 4;
    if (windowWidth < 1200)
        size = 3;
    if (windowWidth < 1000)
        size = 2;
    if (windowWidth < 720)
        size = 1;
    slideSize.value = size;
}

const getScoreStyleClass = (score: number = 0, index: number, p: any) => {
    switch (index) {
        case 0:
            if (score < 16.66)
                return ' is-transparent';
            if (score < 33.33)
                return ' is-half';
            return '';
        case 1:
            if (score < 50)
                return ' is-transparent';
            if (score < 66.66)
                return ' is-half';
            return '';
        case 2:
            if (score < 83.33)
                return ' is-transparent';
            if (score < 100)
                return ' is-half';
            return '';
    }
};

window.addEventListener('resize', resize);
</script>

<template>
    <div class="container" ref="containerRef" tabindex="-1" @keyup.left="switchLeft" @keyup.right="switchRight">
        <div class="swiper">
            <template v-for="slide in Math.ceil(scenes.length / slideSize)">
                <div class="slide" :style="calcSlideStyle()">
                    <div class="scene-group">
                        <div v-for="scene in scenes.slice((slide - 1) * slideSize, (slide - 1) * slideSize + slideSize)"
                            :key="scene.id" class="scene-item nes-pointer"
                            @click="currentSave.scenesResultMap[scene.id] ? openScene(scene.id) : showLockTip()">
                            <div class="scene-info">
                                <span>{{ currentSave.scenesResultMap[scene.id] ? scene.name : '？？？' }}</span>
                            </div>
                            <div v-if="!currentSave.scenesResultMap[scene.id]" class="scene-lock">
                                <img src="@/assets/images/lock.png" />
                            </div>
                            <div class="scene-image">
                                <img :src="loader.getResUrl(scene.coverResId)" />
                            </div>
                            <div class="scene-star-group">
                                <i v-for="num in 3"
                                    :class="'nes-icon is-medium star' + getScoreStyleClass(currentSave.scenesResultMap[scene.id] ? currentSave.scenesResultMap[scene.id].score : 0, num - 1, currentSave.scenesResultMap[scene.id])"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div v-show="currentIndex != 0" class="arrow arrow-left nes-pointer" @click="switchLeft">
            <img src="@/assets/images/triangle.png" />
        </div>
        <div v-show="currentIndex != Math.ceil(scenes.length / slideSize) - 1" class="arrow arrow-right nes-pointer"
            @click="switchRight">
            <img src="@/assets/images/triangle.png" />
        </div>
    </div>
</template>

<style scoped>
@import '@/assets/styles/SceneSelectorView.less';
</style>