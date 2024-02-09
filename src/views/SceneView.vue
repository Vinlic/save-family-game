<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue';
import Modal from '@/components/Modal.vue';

const instance = getCurrentInstance();
const bus = instance?.proxy?.$bus;

const currentIndex = ref(0);
const sceneList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

onMounted(() => {
    bus?.emit('page-loaded:scene-view');
});

const calcSlideStyle = () => {
    return {
        transform: `translateX(${-currentIndex.value * 100}%)`
    };
};

const switchLeft = () => {
    currentIndex.value--;
};

const switchRight = () => {
    currentIndex.value++;
};

</script>

<template>
    <div class="container">
        <div class="swiper">
            <template v-for="slide, slideIndex in sceneList.length % 4 + 1">
                <div class="slide" :style="calcSlideStyle()">
                    <div class="scene-group">
                        <div v-for="index in sceneList.slice((slide - 1) * 4, (slide - 1) * 4 + 4)" class="scene-item nes-pointer">
                            <div class="scene-info">
                                <span>何以养老</span>
                            </div>
                            <div class="scene-image">
                                <img src="/scene_images/a9bde1ee-8764-5fea-9e86-1d5f27d6182e_0.jpg" />
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
        <div v-show="currentIndex != sceneList.length % 4" class="arrow arrow-right nes-pointer" @click="switchRight">
            <img src="@/assets/arrow.png" />
        </div>
    </div>
</template>

<style scoped>
@import '@/assets/styles/SceneView.less';
</style>