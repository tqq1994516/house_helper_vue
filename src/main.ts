import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import api from './api/api';
import locale from 'element-plus/lib/locale/lang/zh-cn'


const app = createApp(App)
app.config.globalProperties.$api = api;
app.use(ElementPlus, { locale })
app.use(store)
app.use(router)
app.mount('#app')
