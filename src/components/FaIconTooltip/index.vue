  
<template>
  <el-tooltip class="tooltip" placement="top" effect="light">
    <div slot="content">
      <p>推荐使用 ElementUI 图标</p>
      <p>使用步骤：</p>
      <p>1.进入icon图标页面</p>
      <p>2.查找到需要的图标,点击会自动复制</p>
      <p>3.粘贴到此输入框</p>
      <p>示例：el-icon-warning</p></div>
    <i class="el-icon-warning"></i>
  </el-tooltip>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {

  },
  mounted() {

  }
};
</script>

<style scoped lang="scss">
.tooltip {
  padding: 10px;
}
</style>