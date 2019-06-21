<template>
    <div class="menu-bar-container">
    <!-- logo -->
    <div class="logo" :class="this.$store.state.app.collapse?'menu-bar-collapse-width':'menu-bar-width'">
        <img :src="this.logo" /> <div>{{$store.state.collapse?'':sysName}}</div>
    </div>
    <!-- 导航菜单 -->
    <el-menu default-active="1-1" :class="$store.state.collapse?'menu-bar-collapse-width':'menu-bar-width'" 
    @open="handleopen" @close="handleclose" @select="handleselect" :collapse="isCollapse">
      <menu-tree v-for="item in navTree" :key="item.menuId" :menu="item"></menu-tree>
    </el-menu>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import MenuTree from './MenuTree'
export default {
  data() {
    return {
      isCollapse: false,
      sysName: "",
      logo: "",
    };
  },
  components: {
    "menu-tree":MenuTree
  },
  methods: {
    handleopen() {
      console.log('handleopen');
    },
    handleclose() {
      console.log('handleclose');
    },
    handleselect(a, b) {
      console.log('handleselect');
    },
    // 加载菜单
    findMenuTree() {
      this.$api.menu.findMenuTree()
      .then((res) => {
        this.$store.commit('setNavTree', res.data)
      })
      .catch(function(res) {
        alert(res);
      })
    }
  },
  computed: {
    ...mapState({
      appName: state=>state.app.name,
      collapse: state=>state.app.collapse,
      navTree: state=>state.menu.navTree
    })
  },
  mounted() {
    this.sysName = "I like Kitty";
    this.logo = require("../assets/logo.png");
    this.findMenuTree()
  }
};
</script>

<style scoped lang="scss">
.menu-bar-container {
  .el-menu {
    position:absolute;
    top: 60px;
    bottom: 0px;
    text-align: left;
  }
  .logo {
    position:absolute;
    top: 0px;
    height: 60px;   
    line-height: 60px;
    background: #4b5f6e;
    img {
        width: 40px;
        height: 40px;
        border-radius: 0px;
        margin: 10px 10px 10px 10px;
        float: left;
    }
    div {
      font-size: 22px;
      color: white;
      text-align: left;
    }
  }
  .menu-bar-width {
    width: 200px;
  }
  .menu-bar-collapse-width {
    width: 65px;
  }
}
</style>