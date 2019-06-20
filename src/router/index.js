import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Admin from '../views/Admin'

Vue.use(Router);

const Routes = [
  {
    path: '/login',
    component: Login,
  },
  {
  	path: '*',
  	component: Admin,
  }
]
const router = new Router({
  mode: 'history',
  routes: Routes
})

export default router

