import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import Main from '../views/Main'
import User from '../views/User'
import Menu from '../views/Menu'
Vue.use(Router);

const router = new Router({
  routes : [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        {path: '/main', component: Main, mame: '系统介绍'},
        {path: '/user', component: User, mame: '用户管理'},
        {path: '/menu', component: Menu, mame: '菜单管理'}
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

