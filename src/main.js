import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
// 导入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'
import './index.less'
import Store from '@/store/index.js'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  Store,
  render: (h) => h(App)
}).$mount('#app')
