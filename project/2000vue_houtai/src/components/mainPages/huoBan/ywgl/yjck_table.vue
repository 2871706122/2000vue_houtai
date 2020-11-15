<template>
  <div class="yjck-table-content">
    <header class="yjck-table-header">
      <div class="yjck-header-left">
        <span style="margin: 0 10px 0 0">姓名:</span>
        <el-input
          @change="inputChange"
          v-model="wxNickname"
          style="width: 200px"
          placeholder="请输入内容"
        ></el-input>
        <span style="margin: 0px 10px 0 16px">工号:</span>
        <el-input
          @change="inputChange"
          v-model="channelCode"
          style="width: 200px"
          placeholder="请输入内容"
        ></el-input>
        <span style="margin: 16px 10px 0 16px">手机号:</span>
        <el-input
          @change="inputChange"
          v-model="mobile"
          style="width: 200px"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="yjck-header-right">
        <span>业务员总数：{{ total }}</span>
      </div>
    </header>
    <div style="margin: 10px 0 10px 0">
      <div>
        <span>时间段:</span>&nbsp;&nbsp;
        <el-date-picker
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <span style="margin: 0 0 0 10px">
          <el-button type="primary" @click="query">查询</el-button>
        </span>
        <!-- <span style="margin: 0 0px 0 10px">
          <el-button type='primary' @click='downLoad'>导出</el-button>
        </span> -->
      </div>
    </div>
    <div class="yjck-table">
      <el-table
        ref="yw_yjck_table"
        @sort-change="sortChange"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column width="50">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.wxPictureUrl"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="wxNickname" label="昵称"></el-table-column>
        <el-table-column label="手机号/工号">
          <template slot-scope="scope">
            <p>{{ scope.row.mobile }}</p>
            <p>{{ scope.row.channelCode }}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格表">
          <template slot-scope="scope">
            <el-select
              @change="
                (val) => {
                  priceChange(val, scope.row.id, scope.$index);
                }
              "
              :value="scope.row.priceName"
              placeholder="请选择"
            >
              <el-option
                v-for="item in priceList"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="250">
          <template slot-scope="scope" >
            <p>注册时间: {{ scope.row.applyTime }}</p>
            <p>审核时间: {{ scope.row.passTime }}</p>
          </template>
        </el-table-column>
        <el-table-column
          sortable="custom"
          prop="fansCount"
          label="客户数量"
        ></el-table-column>
        <el-table-column
          sortable="custom"
          prop="caAmount"
          label="本月收益"
        ></el-table-column>
      </el-table>
      <div class="c-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-sizes="[10, 15, 20]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import getReq from '@/utils/getReq.js'
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
      pageSize: 10,
      wxNickname: '',
      mobile: '',
      channelCode: '',
      desc: '',
      orderBy: '',
      inQuery: false,
      // data
      priceList: []
    }
  },
  watch: {
    time: {
      handler(val) {
        console.log(val[0].getTime())

      }
    }
  },
  methods: {
    async downLoad() {
      let val = {
        businessType: 1,
        channelCode: this.channelCode,
        desc: this.desc,
        startTime: this.time ? this.time[0].getTime() : '',
        endTime: this.time ? this.time[1].getTime() : '',
        mobile: this.mobile,
        orderBy: this.orderBy,
        wxNickname: this.wxNickname
      }
      let url = '/business/perfor/exportExcel?'
      url += getReq(val)
      console.log(url)
      let res = await this.$axios.get(url)
      console.log(res)
    },
    inputChange() {
      // if (!this.wxNickname && !this.channelCode && !this.mobile) {
      //   this.inQuery = false
      // }
    },
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
    sortChange(column, prop, order) {
      if (column.prop == "fansCount") {
        this.orderBy = "count"
      } else if (column.prop == "caAmount") {
        this.orderBy = "amount"
      }
      // 
      if (column.order == "ascending") {//升序
        this.desc = true
      } else if (column.order == "descending") {//降序
        this.desc = false
      } else {//默认
        this.desc = ''
        this.orderBy = ""
      }
      this.updateTable()
    },
    async priceChange(val, id, index) {
      console.log(val, id, index)

      let url = '/business/price?'
      let obj = {}
      obj.id = id
      this.priceList.forEach(item => {
        if (item.label === val) {
          obj.priceType = item.value
        }
      })
      console.log(obj)
      url += getReq(obj)
      let res = await this.$axios.post(url)
      console.log(res)
      if(res.data.code==200) {
        this.$message.success('修改成功')
        this.updateTable()
      } else {
        this.$message.danger(res.data.message)
      }
    },
    query() {
      this.inQuery = true
      this.pageNum = 1
      this.pageSize = 10
      this.updateTable()
    },
    updateTable() {
      if (this.inQuery) {
        this.$bus.$emit('yw_yjckTableUpdate', {
          businessType: 1,
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          desc: this.desc,
          orderBy: this.orderBy,
          wxNickname: this.wxNickname,
          mobile: this.mobile,
          channelCode: this.channelCode,
          startTime: this.time ? this.time[0].getTime() : '',
          endTime: this.time ? this.time[1].getTime() : ''
        })
      } else {
        this.$bus.$emit('yw_yjckTableUpdate', {
          businessType: 1,
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          desc: this.desc,
          orderBy: this.orderBy
        })
      }
    },
    init() {
      this.$refs.yw_yjck_table.clearSort()
      // 
      this.time = ''
      this.pageNum = 1
      this.pageSize = 10
      this.wxNickname = ''
      this.mobile = ''
      this.channelCode = ''
      this.desc = ''
      this.orderBy = ''
      this.inQuery = false
      // 
      this.time = []
      //获取月初和当前的日期
      let day = new Date();
      let y = day.getFullYear()
      let m = day.getMonth() + 1
      m = (m <= 9 ? ("0" + m) : m)
      let d = day.getDate()
      d = (d <= 9 ? ("0" + d) : d)

      let time1 = y + "-" + m + "-01" + " 00:00:00"
      time1 = new Date(time1)
      this.time.push(time1)

      let h = day.getHours()
      h = (h <= 9 ? ("0" + h) : h)
      let m2 = day.getMinutes()
      m2 = (m2 <= 9 ? ("0" + m2) : m2)
      let s = day.getSeconds()
      s = (s <= 9 ? ("0" + s) : s)

      let time2 = y + "-" + m + "-" + d + " " + h + ":" + m2 + ":" + s
      time2 = new Date(time2)
      this.time.push(time2)
    }
  },
  async mounted() {
    this.init()
    this.$bus.$on('yw_initYjckData', this.init)
    let res = await this.$axios.get('/price/list?pageNum=1&pageSize=1000')
    console.log(res)
    res.data.data.resultList.forEach(item => {
      let obj = {}
      obj.label = item.priceCategoryName
      obj.value = item.priceType
      this.priceList.push(obj)
    })
  },
  beforeDestroy() {
    this.$bus.$off('yw_initYjckData')
  }
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