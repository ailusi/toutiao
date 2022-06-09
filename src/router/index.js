import vue from 'vue'
import VueRouter from 'vue-router'

// 导入Login
import Login from '@/views/Login/Login.vue'

vue.use(VueRouter)
// 路由规则
const routes = [
  // 带有 name 名称的路由规则，叫做“命名路由”
  { path: '/login', component: Login, name: 'login' }
]

const router = new VueRouter({
  routes
})

export default router
