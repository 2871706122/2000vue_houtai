<template>
  <div class="sqsh-table-content">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label width="50">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.wxPictureUrl"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="wxNickname" label="昵称"></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column prop="channelCode" label="工号"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">初始化</span>
          <span v-if="scope.row.status === 1">未审核</span>
          <span v-if="scope.row.status === 2">审核通过</span>
          <span v-if="scope.row.status === 9">审核不通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="applyTime" label="申请时间"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="approval({ id: scope.row.id, type: 2 })">批准</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="c-pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-sizes="[5, 10, 20]" :page-size="pageSize" layout="sizes, prev, pager, next,jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>
<script>
import getReq from '@/utils/getReq.js'
export default {
  name: 'SqshTable',
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
      pageNum: 1,
      pageSize: 5,
    }
  },
  methods: {
    init() {
      this.pageNum = 1
      this.pageSize = 5
    },
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
      this.$bus.$emit('tz_sqshTableUpdate', {
        businessType: 2,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        status: 1
      })
    },
    handleCurrentChange(val) {
      console.log(val)
      console.log(this.pageNum)
      this.$bus.$emit('tz_sqshTableUpdate', {
        businessType: 2,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        status: 1
      })
    },
    async approval(val) {
      let url = '/business/pass?'
      url += getReq(val)
      console.log(url)
      let res = await this.$axios.post(url)
      console.log(res)
      if (res.data.code === 200) {
        this.$message.success('操作成功')
        this.$bus.$emit('tz_sqshTableUpdate', {
          businessType: 2,
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          status: 1
        })
      } else {
        this.$message.error('操作失败')
      }

    }
  },
  mounted() {
    this.$bus.$on('tz_initsqshData', this.init)
  },
  beforeDestroy() {
    this.$bus.$off('tz_initsqshData')
  }
}
</script>
<style lang="scss" scoped>
.sqsh-table-content {
  .c-pagination {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>