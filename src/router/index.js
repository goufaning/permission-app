import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Intro from '../views/Intro'
import User from '../views/system/User'
import Role from '../views/system/Role'
import Menu from '../views/system/Menu'
import Log from '../views/system/Log'
Vue.use(Router);

const router = new Router({
  routes : [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        { path: '', component: Intro, name: '系统介绍' },
        { path: '/user', component: User, name: '用户管理' },
        { path: '/role', component: Role, name: '角色管理' },
        { path: '/menu', component: Menu, name: '菜单管理' },
        { path: '/log', component: Log, name: '日志管理' }
      ]
    },
    {
      path: '/login',
      component: Login,
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 用户登录后，会把用户信息保存在会话中
  // 存在时间为会话生命周期，页面关闭即失效
  let user = sessionStorage.getItem('user');
  // 访问登录界面，用户信息存在，跳转到主页
  if (to.path == '/login') {
    if (user) {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    // 访问未登录界面，且用户信息不存在，则跳转登录页
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router

