<template>
  <div class="jvm-info">
    <div class="alert">
      <el-button type="success" @click="create">点击刷新</el-button>
    </div>
    <table>
      <tr>
        <th>参数</th>
        <th>描述</th>
        <th>当前值</th>
      </tr>
      <tr>
        <td><el-tag effect="plain" color="purple">jvm.memory.max</el-tag></td>
        <td>JVM 最大内存</td>
        <td>{{jvm.memory.max}} MB</td>
      </tr>
      <tr>
        <td><el-tag color="purple">jvm.memory.committed</el-tag></td>
        <td>JVM 可用内存</td>
        <td>{{jvm.memory.committed}} MB</td>
      </tr>
      <tr>
        <td><el-tag color="purple">jvm.memory.used</el-tag></td>
        <td>JVM 已用内存</td>
        <td>{{jvm.memory.used}} MB</td>
      </tr>
      <tr>
        <td><el-tag color="cyan">jvm.buffer.memory.used</el-tag></td>
        <td>JVM 缓冲区已用内存</td>
        <td>{{jvm.buffer.memory.used}} MB</td>
      </tr>
      <tr>
        <td><el-tag color="cyan">jvm.buffer.count</el-tag></td>
        <td>当前缓冲区数量</td>
        <td>{{jvm.buffer.count}} 个</td>
      </tr>
      <tr>
        <td><el-tag color="green">jvm.threads.daemon</el-tag></td>
        <td>JVM 守护线程数量</td>
        <td>{{jvm.threads.daemon}} 个</td>
      </tr>
      <tr>
        <td><el-tag color="green">jvm.threads.live</el-tag></td>
        <td>JVM 当前活跃线程数量</td>
        <td>{{jvm.threads.live}} 个</td>
      </tr>
      <tr>
        <td><el-tag color="green">jvm.threads.peak</el-tag></td>
        <td>JVM 峰值线程数量</td>
        <td>{{jvm.threads.peak}} 个</td>
      </tr>
      <tr>
        <td><el-tag color="orange">jvm.classes.loaded</el-tag></td>
        <td>JVM 已加载 Class 数量</td>
        <td>{{jvm.classes.loaded}} 个</td>
      </tr>
      <tr>
        <td><el-tag color="orange">jvm.classes.unloaded</el-tag></td>
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
        <td><el-tag color="blue">jvm.gc.pause.count</el-tag></td>
        <td>系统启动以来GC 次数</td>
        <td>{{jvm.gc.pause.count}} 次</td>
      </tr>
      <tr>
        <td><el-tag color="blue">jvm.gc.pause.totalTime</el-tag></td>
        <td>系统启动以来GC 总耗时</td>
        <td>{{jvm.gc.pause.totalTime}} 秒</td>
      </tr>
    </table>
  </div>
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
      }
    }
  },
  methods: {
    create () {
      axios.all([
        axios.get('actuator/metrics/jvm.memory.max'),
        axios.get('actuator/metrics/jvm.memory.committed'),
        axios.get('actuator/metrics/jvm.memory.used'),
        axios.get('actuator/metrics/jvm.buffer.memory.used'),
        axios.get('actuator/metrics/jvm.buffer.count'),
        axios.get('actuator/metrics/jvm.threads.daemon'),
        axios.get('actuator/metrics/jvm.threads.live'),
        axios.get('actuator/metrics/jvm.threads.peak'),
        axios.get('actuator/metrics/jvm.classes.loaded'),
        axios.get('actuator/metrics/jvm.classes.unloaded'),
        axios.get('actuator/metrics/jvm.gc.memory.allocated'),
        axios.get('actuator/metrics/jvm.gc.memory.promoted'),
        axios.get('actuator/metrics/jvm.gc.max.data.size'),
        axios.get('actuator/metrics/jvm.gc.live.data.size'),
        axios.get('actuator/metrics/jvm.gc.pause')
      ]).then((r) => {
        jvm.memory.max = convert(r[0].data.measurements[0].value)
        jvm.memory.committed = convert(r[1].data.measurements[0].value)
        jvm.memory.used = convert(r[2].data.measurements[0].value)
        jvm.buffer.memory.used = convert(r[3].data.measurements[0].value)
        jvm.buffer.count = r[4].data.measurements[0].value
        jvm.threads.daemon = r[5].data.measurements[0].value
        jvm.threads.live = r[6].data.measurements[0].value
        jvm.threads.peak = r[7].data.measurements[0].value
        jvm.classes.loaded = r[8].data.measurements[0].value
        jvm.classes.unloaded = r[9].data.measurements[0].value
        jvm.gc.memory.allocated = convert(r[10].data.measurements[0].value)
        jvm.gc.memory.promoted = convert(r[11].data.measurements[0].value)
        jvm.gc.maxDataSize = convert(r[12].data.measurements[0].value)
        jvm.gc.liveDataSize = convert(r[13].data.measurements[0].value)
        jvm.gc.pause.count = r[14].data.measurements[0].value
        jvm.gc.pause.totalTime = r[14].data.measurements[1].value
        loading = false
      }).catch((r) => {
        console.error(r)
        $message.error('获取JVM信息失败')
      })
    },
    convert (value) {
      return Number(value / 1048576).toFixed(3)
    }
  }
}
</script>
<style lang="scss">
  .jvm-info {
    width: 100%;
    table {
      width: 100%;
      tr {
        line-height: 1.5rem;
        border-bottom: 1px solid #f1f1f1;
        th {
          background: #fafafa;
          padding: .5rem;
        }
        td {
          padding: .5rem;
          .ant-tag {
            font-size: .8rem !important;
          }
        }
      }
    }
    .alert {
      margin-bottom: .5rem;
    }
  }
</style>