<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue';
import Modal from '@/components/Modal.vue';
import scenes from '@/scenes';
import saveManager from '@/lib/save-manager';
import loader from '@/lib/loader';
import router from '@/router';

const instance = getCurrentInstance();
const bus = instance?.proxy?.$bus;

const containerRef = ref<HTMLDivElement>();
const currentIndex = ref(0);
const slideSize = ref(4);

if (!saveManager.currentSave)
    router.replace('/');
else {
    onMounted(() => {
        resize();
        bus?.emit('transition-mask:off');
    });
}    

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

window.addEventListener('resize', resize);
</script>

<template>
    <div class="container" ref="containerRef" tabindex="-1" @keyup.left="switchLeft" @keyup.right="switchRight">
        <div class="swiper">
            <template v-for="slide, slideIndex in Math.ceil(scenes.length / slideSize)">
                <div class="slide" :style="calcSlideStyle()">
                    <div class="scene-group">
                        <div v-for="scene in scenes.slice((slide - 1) * slideSize, (slide - 1) * slideSize + slideSize)"
                            :key="scene.id" class="scene-item nes-pointer">
                            <div class="scene-info">
                                <span>{{ scene.name }}</span>
                            </div>
                            <div class="scene-image">
                                <img :src="loader.getResUrl(scene.coverResId)" />
                            </div>
                            <div class="scene-star-group">
                                <i class="nes-icon is-medium star"></i>
                                <i class="nes-icon is-medium star"></i>
                                <i class="nes-icon is-medium star"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div v-show="currentIndex != 0" class="arrow arrow-left nes-pointer" @click="switchLeft">
            <img src="@/assets/arrow.png" />
        </div>
        <div v-show="currentIndex != Math.ceil(scenes.length / slideSize) - 1" class="arrow arrow-right nes-pointer"
            @click="switchRight">
            <img src="@/assets/arrow.png" />
        </div>
    </div>
</template>

<style scoped>@import '@/assets/styles/SceneView.less';</style>