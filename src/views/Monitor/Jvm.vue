<template>
<table>
      <tr>
        <th>参数</th>
        <th>描述</th>
        <th>当前值</th>
      </tr>
      <tr>
        <td><el-tag type="success">jvm.memory.max</el-tag></td>
        <td>JVM 最大内存</td>
        <td>{{jvm.memory.max}} MB</td>
      </tr>
      <tr>
        <td><el-tag type="success">jvm.memory.committed</el-tag></td>
        <td>JVM 可用内存</td>
        <td>{{jvm.memory.committed}} MB</td>
      </tr>
      <tr>
        <td><el-tag type="success">jvm.memory.used</el-tag></td>
        <td>JVM 已用内存</td>
        <td>{{jvm.memory.used}} MB</td>
      </tr>
      <tr>
        <td><el-tag type="info">jvm.buffer.memory.used</el-tag></td>
        <td>JVM 缓冲区已用内存</td>
        <td>{{jvm.buffer.memory.used}} MB</td>
      </tr>
      <tr>
        <td><el-tag type="info">jvm.buffer.count</el-tag></td>
        <td>当前缓冲区数量</td>
        <td>{{jvm.buffer.count}} 个</td>
      </tr>
      <tr>
        <td><el-tag type="warning">jvm.threads.daemon</el-tag></td>
        <td>JVM 守护线程数量</td>
        <td>{{jvm.threads.daemon}} 个</td>
      </tr>
      <tr>
        <td><el-tag type="warning">jvm.threads.live</el-tag></td>
        <td>JVM 当前活跃线程数量</td>
        <td>{{jvm.threads.live}} 个</td>
      </tr>
      <tr>
        <td><el-tag type="warning">jvm.threads.peak</el-tag></td>
        <td>JVM 峰值线程数量</td>
        <td>{{jvm.threads.peak}} 个</td>
      </tr>
      <tr>
        <td><el-tag>jvm.classes.loaded</el-tag></td>
        <td>JVM 已加载 Class 数量</td>
        <td>{{jvm.classes.loaded}} 个</td>
      </tr>
      <tr>
        <td><el-tag>jvm.classes.unloaded</el-tag></td>
        <td>JVM 未加载 Class 数量</td>
        <td>{{jvm.classes.unloaded}} 个</td>
      </tr>
      <tr>
        <td><el-tag color="pink">jvm.gc.memory.allocated</el-tag></td>
        <td>GC 时, 年轻代分配的内存空间</td>
        <td>{{jvm.gc.memory.allocated}} MB</td>
      </tr>
      <tr>
        <td><el-tag color="pink">jvm.gc.memory.promoted</el-tag></td>
        <td>GC 时, 老年代分配的内存空间</td>
        <td>{{jvm.gc.memory.promoted}} MB</td>
      </tr>
      <tr>
        <td><el-tag color="pink">jvm.gc.max.data.size</el-tag></td>
        <td>GC 时, 老年代的最大内存空间</td>
        <td>{{jvm.gc.maxDataSize}} MB</td>
      </tr>
      <tr>
        <td><el-tag color="pink">jvm.gc.live.data.size</el-tag></td>
        <td>FullGC 时, 老年代的内存空间</td>
        <td>{{jvm.gc.liveDataSize}} MB</td>
      </tr>
      <tr>
        <td><el-tag type="danger">jvm.gc.pause.count</el-tag></td>
        <td>系统启动以来GC 次数</td>
        <td>{{jvm.gc.pause.count}} 次</td>
      </tr>
      <tr>
        <td><el-tag type="danger">jvm.gc.pause.totalTime</el-tag></td>
        <td>系统启动以来GC 总耗时</td>
        <td>{{jvm.gc.pause.totalTime}} 秒</td>
      </tr>
    </table>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      time: '',
      loading: true,
      jvm: {
        memory: {
          max: 0,
          committed: 0,
          used: 0
        },
        buffer: {
          memory: {
            used: 0
          },
          count: 0
        },
        threads: {
          daemon: 0,
          live: 0,
          peak: 0
        },
        classes: {
          loaded: 0,
          unloaded: 0
        },
        gc: {
          memory: {
            allocated: 0,
            promoted: 0
          },
          maxDataSize: 0,
          liveDataSize: 0,
          pause: {
            totalTime: 0,
            count: 0
          }
        }
      },
    }
  },
  mounted () {
    this.create()
  },
  methods: {
    create () {
      axios.all([
        this.$api.sys.query('jvm.memory.max'),
        this.$api.sys.query('jvm.memory.committed'),
        this.$api.sys.query('jvm.memory.used'),
        this.$api.sys.query('jvm.buffer.memory.used'),
        this.$api.sys.query('jvm.buffer.count'),
        this.$api.sys.query('jvm.threads.daemon'),
        this.$api.sys.query('jvm.threads.live'),
        this.$api.sys.query('jvm.threads.peak'),
        this.$api.sys.query('jvm.classes.loaded'),
        this.$api.sys.query('jvm.classes.unloaded'),
        this.$api.sys.query('jvm.gc.memory.allocated'),
        this.$api.sys.query('jvm.gc.memory.promoted'),
        this.$api.sys.query('jvm.gc.max.data.size'),
        this.$api.sys.query('jvm.gc.live.data.size'),
        this.$api.sys.query('jvm.gc.pause')
      ]).then(axios.spread((r0,r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,r13,r14) => {
        this.jvm.memory.max = this.convert(r0.measurements[0].value)
        this.jvm.memory.committed = this.convert(r1.measurements[0].value)
        this.jvm.memory.used = this.convert(r2.measurements[0].value)
        this.jvm.buffer.memory.used = this.convert(r3.measurements[0].value)
        this.jvm.buffer.count = r4.measurements[0].value
        this.jvm.threads.daemon = r5.measurements[0].value
        this.jvm.threads.live = r6.measurements[0].value
        this.jvm.threads.peak = r7.measurements[0].value
        this.jvm.classes.loaded = r8.measurements[0].value
        this.jvm.classes.unloaded = r9.measurements[0].value
        this.jvm.gc.memory.allocated = this.convert(r10.measurements[0].value)
        this.jvm.gc.memory.promoted = this.convert(r11.measurements[0].value)
        this.jvm.gc.maxDataSize = this.convert(r12.measurements[0].value)
        this.jvm.gc.liveDataSize = this.convert(r13.measurements[0].value)
        this.jvm.gc.pause.count = r14.measurements[0].value
        this.jvm.gc.pause.totalTime = r14.measurements[1].value
        this.loading = false
      })).catch((r) => {
        console.error(r);
        this.$message({
              message: '获取JVM信息失败',
              type: 'error'
            })
      })
    },
    convert (value) {
      return Number(value / 1048576).toFixed(3)
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