import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'

const Mitt = mitt()

declare module 'vue' {
    export interface ComponentCustomProperties {
        $bus: typeof Mitt
    }
}

const app = createApp(App)
app.config.globalProperties.$bus = Mitt

app.use(router)

app.mount('#app')
