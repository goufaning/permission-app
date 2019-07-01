<template>
<table>
<tr>
    <th>参数</th>
    <th>描述</th>
    <th>当前值</th>
</tr>
<tr>
    <td><el-tag type="success">system.cpu.count</el-tag></td>
    <td>CPU 数量</td>
    <td>{{system.cpu.count}} 核</td>
</tr>
<tr>
    <td><el-tag type="success">system.cpu.usage</el-tag></td>
    <td>系统 CPU 使用率</td>
    <td>{{system.cpu.usage}} %</td>
</tr>
<tr>
    <td><el-tag type="warning">process.start.time</el-tag></td>
    <td>应用启动时间点</td>
    <td>{{system.process.startTime}}</td>
</tr>
<tr>
    <td><el-tag type="warning">process.uptime</el-tag></td>
    <td>应用已运行时间</td>
    <td>{{system.process.uptime}} 秒</td>
</tr>
<tr>
    <td><el-tag type="warning">process.cpu.usage</el-tag></td>
    <td>当前应用 CPU 使用率</td>
    <td>{{system.process.cpuUsage}} %</td>
</tr>
</table>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
moment.locale('zh-cn')
export default {
  data () {
    return {
      loading: true,
      system: {
        cpu: {
          count: 0,
          usage: 0
        },
        process: {
          cpuUsage: 0,
          uptime: 0,
          startTime: 0
        }
      }
    }
  },
  mounted () {
    this.create()
  },
  methods: {
    create () {
      axios.all([
        this.$api.sys.query('system.cpu.count'),
        this.$api.sys.query('system.cpu.usage'),
        this.$api.sys.query('process.uptime'),
        this.$api.sys.query('process.start.time'),
        this.$api.sys.query('process.cpu.usage')
      ]).then((r) => {
        this.system.cpu.count = r[0].measurements[0].value
        this.system.cpu.usage = this.convert(r[1].measurements[0].value)
        this.system.process.uptime = r[2].measurements[0].value
        this.system.process.startTime = moment(r[3].measurements[0].value * 1000).format('YYYY-MM-DD HH:mm:ss')
        this.system.process.cpuUsage = this.convert(r[4].measurements[0].value)
        this.loading = false
      }).catch((r) => {
        console.error(r)
        this.$message.error('获取服务器信息失败')
      })
    },
    convert (value) {
      return Number(value * 100).toFixed(2)
    }
  }
}
</script>
<style scoped>
table {
  border-left:#C8B9AE solid 1px;
    border-top:#C8B9AE solid 1px;
    border-collapse:collapse;
  width: 100%;
  margin:0;
  padding:0;
  border-spacing: 0;
}

table tr {
  border: 1px solid #ddd;
  padding: 5px;
}

table th, table td {
  padding: 10px;
  text-align: center;
}

table th {
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
}
</style>