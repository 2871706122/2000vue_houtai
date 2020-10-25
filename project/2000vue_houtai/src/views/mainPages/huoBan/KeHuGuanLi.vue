<template>
  <!-- 客户管理 -->
  <div class="ke-hu-guan-li">
    <div class="top-title">客户管理</div>
    <div class="content">
      <div class="row1">
        <div class="left">
          <div class="item">
            <span class="key">昵称：</span>
            <div class="input-box">
              <el-input
                  placeholder="请输入昵称"
                  v-model="num1"
                  clearable>
              </el-input>
            </div>
          </div>

          <div class="item">
            <span class="key">编号：</span>
            <div class="input-box">
              <el-input
                  placeholder="请输入编号"
                  v-model="num2"
                  clearable>
              </el-input>
            </div>
          </div>

          <div class="item">
            <span class="key">手机号：</span>
            <div class="input-box">
              <el-input
                  placeholder="请输入手机号"
                  v-model="num3"
                  clearable>
              </el-input>
            </div>
          </div>

          <div class="btn-box">
            <el-button @click="search('btn')" type="primary">查询</el-button>
          </div>
        </div>
        <div class="right">
          客户总数：<span class="num">{{ total }}</span>
        </div>
      </div>

      <div class="row2"></div>

      <div class="table-box">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              prop="nickname"
              label="昵称"
          >
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="注册时间">
          </el-table-column>
          <el-table-column
              label="客户电话/编号">
            <template slot-scope="scope">
              <span>{{scope.row.mobile}}</span>{{scope.row.mobile?'/':""}}<span>{{scope.row.merchantCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="transacterCode"
              label="业务员">
          </el-table-column>
          <el-table-column
              prop="rechargeAmount"
              label="累计充值">
          </el-table-column>
          <el-table-column
              prop="consumeAmount"
              label="累计消耗">
          </el-table-column>
          <el-table-column
              prop="orderCount"
              label="订单笔数">
          </el-table-column>
        </el-table>
      </div>
      <div class="fen-ye-qi-box">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[8,10,15,20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "keHuGuanLi",
  props: [],
  components: {},
  computed: {},
  watch: {},
  data() {
    return {
      num1:"",
      num2:"",
      num3:"",
      tableData: [],
      pageNum: 1,
      pageSize:10,
      total:0,
    }
  },
  created() {
  },
  mounted() {
    this.init()
    this.getData()
  },
  methods: {
    handleEdit(a,b) {
      console.log(a,b);
    },
    //初始化界面
    init() {

    },

    //获取数据
    getData() {
      this.search()
    },

    //查询
    search(type) {
      if(type=='btn') {
        this.pageNum = 1
      }
      let url = "/merchant/list?pageNum="+this.pageNum+"&pageSize="+this.pageSize
      if(this.num1){
        url += ("&nickname=" + this.num1)
      }

      if(this.num2){
        url += ("&merchantCode=" + this.num2)
      }

      if(this.num3){
        var myreg = /^1[0-9]{10}$/;
        if (!myreg.test(this.num3)) {
          this.num3 = ""
          this.$message({
            message: '手机号码有误，请重填',
            type: 'warning'
          });
          return
        }
        url += ("&mobile=" + this.num3)
      }

      this.$axios.get(url).then(res => {
        //console.log(res);
        if(res.data.status == 200 && res.data.message == "成功"){
          this.total = res.data.data.count
          this.tableData = res.data.data.resultList
        }else {
          alert(res.data.message)
        }
      }).catch((err)=>{
        console.log(err);
        alert("请求失败")
      })
    },

    //改变每一页的条数
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getData()
    },

    //改变页码
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.pageNum = val
      this.getData()
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped lang="scss">
.ke-hu-guan-li {
  height: 100%;
  display: flex;
  flex-direction: column;

  .top-title {
    padding-left: 20px;
    line-height: 40px;
    font-size: 14px;
  }

  .content {
    flex: 1;
    padding: 30px;
    box-sizing: border-box;
    border: 5px solid rgb(245, 247, 250);

    .row1 {
      display: flex;
      align-items: center;
      justify-content: space-between;

      * {
        white-space:nowrap;
      }

      .left {
        display: flex;
        align-items: center;

        .item {
          margin-right: 15px;
          display: flex;
          align-items: center;
        }

        .btn-box {

        }
      }

      .right {
        .num {
          font-size: 16px;
        }
      }
    }

    .row2 {
      margin: 10px 0 0;
      height: 45px;
      background-color: rgb(250, 250, 250);
    }

    .fen-ye-qi-box {
      margin-top: 20px;
      text-align: right;
    }

  }
}
</style>
