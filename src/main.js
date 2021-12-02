import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { request } from './request'
import * as echarts from 'echarts'
import moment from 'moment'
import naive from 'naive-ui'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

const app = createApp(App)

app.config.globalProperties.$http = request;
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$moment = moment;

app.use(naive).use(store).use(router).mount('#app')