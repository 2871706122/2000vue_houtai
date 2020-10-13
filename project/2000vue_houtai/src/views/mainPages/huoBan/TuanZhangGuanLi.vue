<template>
  <!-- 团长管理 -->
  <div class="tuan-zhang-guan-li">
    <header class="tzgl-header">团长管理</header>
    <div class="table-outer">
      <div class="c-table">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="申请审核" name="first">
            <SqshTable :tableData="sqshTableData" />
          </el-tab-pane>
          <el-tab-pane label="业绩查看" name="second">
            <YjckTale :tableData="yjckTableData" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import SqshTable from '@/components/mainPages/huoBan/tzgl/sqsh_table'
import YjckTale from '@/components/mainPages/huoBan/tzgl/yjck_table'
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
      sqshTableData: [{
        id: 1,
        userImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
        name: '王小虎',
        phone: '13912341234',
        workNumber: 'a0001',
        status: '1',
        timeOfApplication: '2020.9.27 8:01',
      },],
      yjckTableData: [
        {
          id: 1,
          userImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '王小虎',
          phone: '13912341234',
          workNumber: 'a0001',
          time: {
            start: '2020.9.27 8:01',
            end: '2020.9.27 8:01'
          },
          people: 276,
          thisMonthGet: 900.89,
          lastMonthGet: 2001.22
        },
      ],
      currentPage1: 1
    }
  },
  methods: {
    handleClick() {
      console.log(this.activeName)
      if (this.activeName === 'second' && !this.yjckTableData.length) {
        this.getyjcxTableData({
          currentPage: 1,
          pageSize: 5,
          searchCondition: 1,
          searchValue: '查询条件'
        })
      }
    },
    getsqshTableData(val) {
      console.log('>>>>', val)
    },
    getyjcxTableData(val) {
      console.log('>>>>', val)
    },
  },
  created() {
    // 获取申请审核的数据
    this.getsqshTableData({
      currentPage: 1,
      pageSize: 5
    })
  },
  mounted() {
    this.$bus.$on('sqshTableUpdate', this.getsqshTableData)
    this.$bus.$on('yjcjTableUpdate', this.getyjcxTableData)
  },
  beforeDestroy() {
    this.$bus.$off('sqshTableUpdate')
    this.$bus.$on('yjcjTableUpdate')
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
