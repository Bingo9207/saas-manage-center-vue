import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import * as echarts from 'echarts'
import moment from 'moment'
import App from './App.vue'
import router from './router'
import store from './store'
import { request } from './request'
import 'ant-design-vue/dist/antd.css'

const app = createApp(App)

app.config.globalProperties.$http = request;
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$moment = moment;

app.use(Antd).use(store).use(router).mount('#app')
