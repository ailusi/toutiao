import vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main/Main.vue'
import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'

// 导入Login
import Login from '@/views/Login/Login.vue'

vue.use(VueRouter)
// 路由规则
const routes = [
  // 带有 name 名称的路由规则，叫做“命名路由”
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/',
    component: Main,
    name: 'main',
    children: [
      { path: '', component: Home, name: 'home' },
      { path: '/user', component: User, name: 'user' }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
