<template>
  <div class="yjck-table-content">
    <header class="yjck-table-header">
      <div class="yjck-header-left">
        <span style='margin: 0 10px 0 0'>姓名:</span><el-input style="width: 200px;" placeholder="请输入内容"></el-input>
        <span style='margin: 0px 10px 0 16px'>工号:</span><el-input style="width: 200px;" placeholder="请输入内容"></el-input>
        <span style='margin: 16px 10px 0 16px'>手机号:</span><el-input style="width: 200px;" placeholder="请输入内容"></el-input>
      </div>
      <div class="yjck-header-right">
        <span>团长总数：123</span>
      </div>
    </header>
    <div style="margin: 10px 0 10px 0">
      <span>时间段:</span>&nbsp;&nbsp;
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <span style="margin: 0 0 0 10px">
        <el-button type="primary" @click="query">查询</el-button></span
      >
    </div>
    <div class="yjck-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column width="50">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.wxPictureUrl"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="wxNickname" label="昵称"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="channelCode" label="工号"></el-table-column>
        <el-table-column label="时间" width="200">
          <template slot-scope="scope">
            <p>注册时间: {{ scope.row.applyTime }}</p>
            <p>审核时间: {{ scope.row.passTime }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="fansCount"
          sortable
          label="下级人数"
        ></el-table-column>
        <el-table-column
          prop="caAmount"
          sortable
          label="本月收益"
        ></el-table-column>
      </el-table>
      <div class="c-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'YjckTale',
  props: {
    tableData: {
      default() {
        return []
      }
    },
    total: {
      default: 1
    }
  },
  data() {
    return {
      time: '',
      pageNum: 1,
      pageSize: 5,
      // data
    }
  },
  watch: {
    time: {
      handler (val) {
        console.log(val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
      this.updateTable()
    },
    handleCurrentChange(val) {
      console.log(val)
      console.log(this.pageNum)
      this.updateTable()
    },
    query() {
      this.updateTable()
    },
    updateTable() {
      this.$bus.$emit('tz_yjckTableUpdate', {
        businessType: 1,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        startTime: '',
        endTime: ''
      })
    },
  },

}
</script>
<style lang="scss" scoped>
.yjck-table-content {
  .yjck-table-header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-top: 10px;
    .yjck-header-left {
      /deep/ .el-select {
        width: 110px;
        margin-right: 8px;
      }
    }
    .yjck-header-right {
      line-height: 50px;
    }
  }
  .yjck-table {
    .c-pagination {
      margin-top: 30px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>