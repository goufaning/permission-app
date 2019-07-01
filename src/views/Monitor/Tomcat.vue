<template>
    <div class="jvm-info">
      <table>
        <tr>
          <th>参数</th>
          <th>描述</th>
          <th>当前值</th>
        </tr>
        <tr>
          <td><el-tag type="success">tomcat.sessions.created</el-tag></td>
          <td>tomcat 已创建 session 数</td>
          <td>{{tomcat.sessions.created}} 个</td>
        </tr>
        <tr>
          <td><el-tag type="success">tomcat.sessions.expired</el-tag></td>
          <td>tomcat 已过期 session 数</td>
          <td>{{tomcat.sessions.expired}} 个</td>
        </tr>
        <tr>
          <td><el-tag type="success">tomcat.sessions.active.current</el-tag></td>
          <td>tomcat 当前活跃 session 数</td>
          <td>{{tomcat.sessions.active.current}} 个</td>
        </tr>
        <tr>
          <td><el-tag type="success">tomcat.sessions.active.max</el-tag></td>
          <td>tomcat 活跃 session 数峰值</td>
          <td>{{tomcat.sessions.active.max}} 个</td>
        </tr>
        <tr>
          <td><el-tag type="success">tomcat.sessions.rejected</el-tag></td>
          <td>超过session 最大配置后，拒绝的 session 个数</td>
          <td>{{tomcat.sessions.rejected}} 个</td>
        </tr>
        <tr>
          <td><el-tag type="warning">tomcat.global.sent</el-tag></td>
          <td>发送的字节数</td>
          <td>{{tomcat.global.sent}} bytes</td>
        </tr>
        <tr>
          <td><el-tag type="warning">tomcat.global.request.max</el-tag></td>
          <td>request 请求最长耗时</td>
          <td>{{tomcat.global.request.max}} 秒</td>
        </tr>
        <tr>
          <td><el-tag type="warning">tomcat.global.request.count</el-tag></td>
          <td>全局 request 请求次数</td>
          <td>{{tomcat.global.request.count}} 次</td>
        </tr>
        <tr>
          <td><el-tag type="warning">tomcat.global.request.totalTime</el-tag></td>
          <td>全局 request 请求总耗时</td>
          <td>{{tomcat.global.request.totalTime}} 秒</td>
        </tr>
        <tr>
          <td><el-tag type="info">tomcat.servlet.request.max</el-tag></td>
          <td>servlet 请求最长耗时</td>
          <td>{{tomcat.servlet.request.max}} 秒</td>
        </tr>
        <tr>
          <td><el-tag type="info">tomcat.servlet.request.count</el-tag></td>
          <td>servlet 总请求次数</td>
          <td>{{tomcat.servlet.request.count}} 次</td>
        </tr>
        <tr>
          <td><el-tag type="info">tomcat.servlet.request.totalTime</el-tag></td>
          <td>servlet 请求总耗时</td>
          <td>{{tomcat.servlet.request.totalTime}} 秒</td>
        </tr>
        <tr>
          <td><el-tag type="danger">tomcat.threads.current</el-tag></td>
          <td>tomcat 当前线程数（包括守护线程）</td>
          <td>{{tomcat.threads.current}} 个</td>
        </tr>
        <tr>
          <td><el-tag type="danger">tomcat.threads.configMax</el-tag></td>
          <td>tomcat 配置的线程最大数</td>
          <td>{{tomcat.threads.configMax}} 个</td>
        </tr>
      </table>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      loading: true,
      tomcat: {
        sessions: {
          created: 0,
          expired: 0,
          active: {
            current: 0,
            max: 0
          },
          rejected: 0
        },
        global: {
          sent: 0,
          request: {
            count: 0,
            max: 0,
            totalTime: 0
          }
        },
        servlet: {
          request: {
            count: 0,
            totalTime: 0,
            max: 0
          }
        },
        threads: {
          current: 0,
          configMax: 0
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
        this.$api.sys.query('tomcat.sessions.created'),
        this.$api.sys.query('tomcat.sessions.expired'),
        this.$api.sys.query('tomcat.sessions.active.current'),
        this.$api.sys.query('tomcat.sessions.active.max'),
        this.$api.sys.query('tomcat.sessions.rejected'),
        this.$api.sys.query('tomcat.global.sent'),
        this.$api.sys.query('tomcat.global.request.max'),
        this.$api.sys.query('tomcat.global.request'),
        this.$api.sys.query('tomcat.servlet.request'),
        this.$api.sys.query('tomcat.servlet.request.max'),
        this.$api.sys.query('tomcat.threads.current'),
        this.$api.sys.query('tomcat.threads.config.max')
      ]).then((r) => {
        this.tomcat.sessions.created = r[0].measurements[0].value
        this.tomcat.sessions.expired = r[1].measurements[0].value
        this.tomcat.sessions.active.current = r[2].measurements[0].value
        this.tomcat.sessions.active.max = r[3].measurements[0].value
        this.tomcat.sessions.rejected = r[4].measurements[0].value
        this.tomcat.global.sent = r[5].measurements[0].value
        this.tomcat.global.request.max = r[6].measurements[0].value
        this.tomcat.global.request.count = r[7].measurements[0].value
        this.tomcat.global.request.totalTime = r[7].measurements[1].value
        this.tomcat.servlet.request.count = r[8].measurements[0].value
        this.tomcat.servlet.request.totalTime = r[8].measurements[1].value
        this.tomcat.servlet.request.max = r[9].measurements[0].value
        this.tomcat.threads.current = r[10].measurements[0].value
        this.tomcat.threads.configMax = r[11].measurements[0].value
        this.loading = false
      }).catch((r) => {
        console.error(r)
        this.$message.error('获取Tomcat信息失败')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
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