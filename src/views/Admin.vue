<template>
 <div class="page">
   <h2>Home</h2>
   <el-button @click="testAxios">测试axios</el-button>
 </div>
</template>

<script>
import axios from 'axios'
import mock from '../mock/mock.js'
export default {
  name: 'Home',
  methods: {
    testAxios() {
      axios.get("http://localhost:8080/user")
      .then(function(res) {
        alert(JSON.stringify(res));
      }).catch(function(res) {
        alert(res);
      })
    }
  }
}
</script>


<style scoped>
 
</style>
