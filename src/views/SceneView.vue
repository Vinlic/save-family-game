<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from 'vue';
import Modal from '@/components/Modal.vue';

const instance = getCurrentInstance();
const bus = instance?.proxy?.$bus;

onMounted(() => {
    bus?.emit('page-loaded:scene-view');
});
</script>

<template>
    <div class="container">
        <div class="scene-list">
            <div>
                <div>
                    <span>？？？</span>
                </div>
                <div>
                    <img src="" />
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import '@/assets/styles/SceneView.less';
</style>