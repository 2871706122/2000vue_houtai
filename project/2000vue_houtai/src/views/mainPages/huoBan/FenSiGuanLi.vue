<template>
  <!-- 粉丝管理 -->
  <div class="fen-si-guan-li">
    <div class="top-title">粉丝管理</div>
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
            <span class="key">openid：</span>
            <div class="input-box">
              <el-input
                  placeholder="请输入openid"
                  v-model="num2"
                  clearable>
              </el-input>
            </div>
          </div>

          <div class="item">
            <span class="key">团长姓名：</span>
            <div class="input-box">
              <el-input
                  placeholder="请输入团长姓名"
                  v-model="num3"
                  clearable>
              </el-input>
            </div>
          </div>

          <div class="btn-box">
            <el-button @click="search" type="primary">查询</el-button>
          </div>
        </div>
        <div class="right">
          客户总数：<span class="num">{{ num }}</span>
        </div>
      </div>

      <div class="row2"></div>

      <div class="table-box">
        <el-table
            @sort-change="sortChange"
            :data="tableData"
            style="width: 100%">
          <el-table-column
              label="昵称"
          >
            <template slot-scope="scope">
              <img src="@/assets/imgs/u107.svg" alt="">
              <span>{{scope.row.name}}</span>
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column
              prop="date"
              label="openid">
          </el-table-column>
          <el-table-column
              prop="name2"
              label="注册时间">
          </el-table-column>
          <el-table-column
              prop="address"
              label="所属团长">
          </el-table-column>
          <el-table-column
              prop="address2"
              sortable
              label="下级人数">
          </el-table-column>
          <el-table-column
              prop="address6"
              sortable
              label="本月收益">
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
    name: "FenSiGuanLi",
    props: [],
    components: {},
    computed: {},
    watch: {},
    data() {
      return {
        num1:"",
        num2:"",
        num3:"",
        num: 152,
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ],
        pageNum: 1,
        pageSize:10,
        total:10,
      }
    },
    created() {
    },
    mounted() {
      this.init()
      this.getData()
    },
    methods: {
      //点击table中的按钮
      handleEdit(a,b) {
        console.log(a,b);
      },


      //初始化界面
      init() {

      },

      //获取数据
      getData() {

      },

      //查询
      search() {
        let url = "/fs/list?nickname="+this.num1+"&merchantCode="+this.num2+"&mobile="+this.num3+"&pageNum="+this.pageNum+"&pageSize="+this.pageSize
        this.$axios.get(url).then(res => {
          console.log(res);
          if(res.data.status == 200 && res.data.message == "成功"){

          }else {
            alert(res.data.message)
          }
        }).catch((err)=>{
          console.log(err);
        })
      },

      //改变每一页的条数
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.getData()
      },

      //改变页码
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNum = val
        this.getData()
      },
      //
      sortChange(column, prop, order) {
        console.log(column, prop, order);
      }
    },
    beforeDestroy() {
    }
  }
</script>

<style scoped lang="scss">
.fen-si-guan-li {
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

      .left {
        display: flex;
        align-items: center;

        .item {
          margin-right: 15px;
          display: flex;
          align-items: center;
        }

        .btn-box {
          margin-left: 20px;
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
