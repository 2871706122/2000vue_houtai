<template>
  <!-- 粉丝管理 -->
  <div class="fen-si-guan-li">
    <div class="top-title">粉丝管理</div>
    <div class="content">
      <div class="row1">
        <div class="left">
          <span>用户搜索：</span>
          <div class="select-box">
            <el-select v-model="selectVlaue" placeholder="请选择">
              <el-option
                  v-for="item in selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <el-input
                placeholder="请输入内容"
                v-model="inputValue"
                clearable>
            </el-input>
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
          <el-table-column
              prop="address8"
              sortable
              label="上月收益">
          </el-table-column>
        </el-table>
      </div>
      <div class="fen-ye-qi-box">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
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
        selectVlaue: "1",
        selectOptions: [
          {
            value: '1',
            label: '昵称'
          }, {
            value: '2',
            label: 'openid'
          }, {
            value: '3',
            label: '团长工号'
          }
        ],
        inputValue: "",//
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
        currentPage: 5,
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

      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
