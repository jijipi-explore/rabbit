import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入初始化样式文件
import '@/styles/common.scss'

// 引用懒加载插件，并且注册
import { lasyPlugin } from '@/directives/index'
// 引入全局组件插件
import { componentPlugin } from '@/components/index'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lasyPlugin)
app.use(componentPlugin)
app.mount('#app')

