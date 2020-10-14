<template>
  <div class="yjck-table-content">
    <header class="yjck-table-header">
      <div class="yjck-header-left">
        <span style="marginRight:8px">用户搜索:</span>
        <el-select v-model="searchCondition" placeholder="请选择">
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input v-model="searchValue" placeholder="请输入内容" style="width:200px;marginRight:16px"></el-input>
        <el-button type="primary" @click="query">查询</el-button>
      </div>
      <div class="yjck-header-right">
        <span>业务员总数：123</span>
      </div>
    </header>
    <div class="yjck-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column width="50">
          <template slot-scope="scope">
           <el-avatar :src="scope.row.userImg"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="昵称"></el-table-column>
        <el-table-column label="手机号/工号">
          <template slot-scope="scope">
            <p>{{scope.row.phone}}</p>
            <p>{{scope.row.workNumber}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格表">
          <template slot-scope="scope">
            <el-dropdown trigger="click" @command="a => handleCommand(a,scope.row.id)">
              <span style="cursor: pointer;" class="el-dropdown-link">
                {{getPriceLabel(scope.row.price)}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item.value"
                  v-for="(item,index) in priceList"
                  :key="index"
                >{{item.label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>

        <el-table-column label="时间" width="200">
          <template slot-scope="scope">
            <p>注册时间: {{scope.row.time.start}}</p>
            <p>审核时间: {{scope.row.time.end}}</p>
          </template>
        </el-table-column>
        <el-table-column sortable prop="people" label="客户数量"></el-table-column>
        <el-table-column sortable prop="thisMonthGet" label="本月收益"></el-table-column>
        <el-table-column sortable prop="lastMonthGet" label="上月收益"></el-table-column>
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
  },
  data() {
    return {
      searchCondition: 1,
      currentPage: 1,
      pageSize: 5,
      total: 10,
      searchValue: '',
      // data
      selectOptions: [
        {
          value: 1,
          label: '姓名/昵称'
        },
        {
          value: 2,
          label: '工号'
        },
        {
          value: 3,
          label: '手机号'
        }
      ],
      priceList: [
        {
          value: 0,
          label: '默认'
        }
      ]
    }
  },
  methods: {
    getPriceLabel(val) {
      let label
      this.priceList.forEach(item => {
        if (item.value === val) {
          label = item.label
        }
      })
      return label
    },
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
      this.updateTable()
    },
    handleCurrentChange(val) {
      console.log(val)
      console.log(this.currentPage)
      this.updateTable()
    },
    query() {
      if (!this.searchValue) {
        return
      }
      this.updateTable()
    },
    handleCommand(val, id) {
      console.log(val)
      console.log(id)
      //  根据id去修改这个用户的价格表,修改成功之后 更新table
    },
    updateTable() {
      this.$bus.$emit('yjcjTableUpdate', {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        searchCondition: this.searchCondition,
        searchValue: this.searchValue
      })
    },
  },
  created() {
    // 请求价格表
    this.priceList = [
      {
        value: 0,
        label: '默认'
      },
      {
        value: 1,
        label: '小明专用'
      }, {
        value: 2,
        label: '价格表2'
      }
    ]
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