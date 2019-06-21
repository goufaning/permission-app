import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

import AppStore from './modules/AppStore.js';
import menu from './modules/menu'

const store = new vuex.Store({
    modules: {
        app: AppStore,
        menu: menu   
        // 其他
    }
})

export default store