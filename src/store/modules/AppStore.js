export default {
    state: {
        appName: "I like Kitty",  // 应用名称
        collapse:false,  // 导航栏收缩状态
        menuTree:[]
    },
    getters: {
        collapse(state) {// 对应着上面state
            return collapse;
        }
    },
    mutations: {
        collapse(state){  // 改变收缩状态
            state.collapse = !state.collapse;
        },
        setMenuTree(state) {
            state.menuTree = menuTree;
        }
    },
    actions: {

    }
}