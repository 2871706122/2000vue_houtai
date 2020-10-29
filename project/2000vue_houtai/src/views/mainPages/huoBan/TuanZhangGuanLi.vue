<template>
  <!-- 团长管理 -->
  <div class="tuan-zhang-guan-li">
    <header class="tzgl-header">团长管理</header>
    <div class="table-outer">
      <div class="c-table">
        <el-tabs v-model="activeName">
          <el-tab-pane label="申请审核" name="first">
            <SqshTable :tableData="sqshTableData" :total='total1'/>
          </el-tab-pane>
          <el-tab-pane label="业绩查看" name="second">
            <YjckTale :tableData="yjckTableData" :total='total2'/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import SqshTable from '@/components/mainPages/huoBan/tzgl/sqsh_table'
import YjckTale from '@/components/mainPages/huoBan/tzgl/yjck_table'
import getReq from '@/utils/getReq.js'
export default {
  name: "tuanZhangGuanLi",
  props: [],
  components: {
    SqshTable,
    YjckTale
  },
  computed: {},
  watch: {},
  data() {
    return {
      // 变量
      activeName: 'first',
      // data
      sqshTableData: [],
      yjckTableData: [],
      total1: 1,
      total2: 1
    }
  },
  watch: {
    activeName: {
      handler(val) {
        console.log(val)
        if (val === 'first') {
          this.getsqshTableData({
            businessType: 2,
            pageNum: 1,
            pageSize: 5,
            status: 1
          })
          this.$bus.$emit('tz_initSqshData')
        } else if (val === 'second') {
          this.$bus.$emit('tz_initYjckData')
          this.getyjckTableData({
            businessType: 2,
            pageNum: 1,
            pageSize: 5
          })
        }
      }
    }
  },
  methods: {
    async getsqshTableData(val) {
      let url = '/business/list?'
      url += getReq(val)
      console.log(url)
      let res = await this.$axios.get(url)
      console.log(res)
      this.sqshTableData = res.data.data.resultList
      this.total1 = res.data.data.count
    },
  async  getyjckTableData(val) {
      console.log('>>>>', val)
      let url = '/business/perfor/list?'
      url += getReq(val)
      let res = await this.$axios.post(url)
            console.log(res)
      this.yjckTableData = res.data.data.resultList
      this.total2 = res.data.data.count

    },
  },
  created() {
    // 获取申请审核的数据
    this.getsqshTableData({
      businessType: 2,
      pageNum: 1,
      pageSize: 5,
      status: 1
    })
  },
  mounted() {
    this.$bus.$on('tz_sqshTableUpdate', this.getsqshTableData)
    this.$bus.$on('tz_yjckTableUpdate', this.getyjckTableData)
  },
  beforeDestroy() {
    this.$bus.$off('tz_sqshTableUpdate')
    this.$bus.$off('tz_yjckTableUpdate')
  }
}
</script>

<style scoped lang="scss">
.tuan-zhang-guan-li {
  height: 100%;
  .tzgl-header {
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
  }
  .table-outer {
    background-color: rgb(245, 247, 240);
    height: calc(100% - 60px);
    display: flex;
    justify-content: center;
    padding: 10px;
    .c-table {
      width: 100%;
      height: calc(100% - 60px);
      background-color: #fff;
      padding: 30px;
      overflow-y: auto;
    }
  }
}
</style>
