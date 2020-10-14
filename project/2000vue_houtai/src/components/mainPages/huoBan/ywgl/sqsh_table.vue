<template>
  <div class="sqsh-table-content">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label width="50">
        <template slot-scope="scope">
           <el-avatar :src="scope.row.userImg"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="workNumber" label="工号"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="timeOfApplication" label="申请时间"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="c-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next,jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SqshTable',
  props: {
    tableData: {
      default() {
        return []
      }
    },
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 10
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
      this.$bus.$emit('yjcjTableUpdate', {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        searchCondition: this.searchCondition,
        searchValue: this.searchValue
      })
    },
    handleCurrentChange(val) {
      console.log(val)
      console.log(this.currentPage)
      this.$bus.$emit('sqshTableUpdate', {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      })
    },
  },
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