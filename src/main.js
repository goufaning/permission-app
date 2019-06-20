import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './http/index'

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(api)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
