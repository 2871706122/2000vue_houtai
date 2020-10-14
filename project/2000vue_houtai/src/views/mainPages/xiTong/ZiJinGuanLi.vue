<template>
  <!-- 资金管理 -->
  <div class="ZiJinGuanLi">
    <div class="top-title">资金管理</div>
    <div class="content">
      <div class="top-tabs">
        <div @click="changeTab(0)" :class="['tab',showTab==0?'tab-checked':'']">资金流转</div>
        <div @click="changeTab(1)" :class="['tab',showTab==1?'tab-checked':'']">充值明细</div>
        <div @click="changeTab(2)" :class="['tab',showTab==2?'tab-checked':'']">发放明细</div>
      </div>

      <div class="part" v-show="showTab==0">
        <div class="table-box">
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                prop="address8"
                label="日期"
            >
            </el-table-column>
            <el-table-column
                prop="date"
                label="充值金额">
            </el-table-column>
            <el-table-column
                prop="name2"
                label="消耗金额">
            </el-table-column>
            <el-table-column
                prop="address"
                label="待发金额">
            </el-table-column>
            <el-table-column
                prop="address2"
                label="发放金额">
            </el-table-column>
            <el-table-column
                prop="address6"
                label="平台余额">
            </el-table-column>
            <el-table-column
                label="操作">
              <template slot-scope="scope">
                <span @click="handleEdit(scope.$index, scope.row)">发放</span>
              </template>
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

      <div class="part part2" v-show="showTab==1">
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
        </div>
        <div class="table-box">
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                prop="name2"
                label="昵称">
            </el-table-column>
            <el-table-column
                prop="name2"
                label="客户电话/编号">
            </el-table-column>
            <el-table-column
                prop="address"
                label="业务员">
            </el-table-column>
            <el-table-column
                prop="address2"
                label="充值金额">
            </el-table-column>
            <el-table-column
                prop="address6"
                label="充值时间">
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

      <div class="part part2" v-show="showTab==2">
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
        </div>
        <div class="table-box">
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                prop="name2"
                label="昵称">
            </el-table-column>
            <el-table-column
                prop="name2"
                label="openid">
            </el-table-column>
            <el-table-column
                prop="address"
                label="金额">
            </el-table-column>
            <el-table-column
                prop="address2"
                label="身份">
            </el-table-column>
            <el-table-column
                prop="address6"
                label="发放时间">
            </el-table-column>
            <el-table-column
                prop="address8"
                label="发放状态">
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
  </div>
</template>

<script>
  export default {
    name: "ZiJinGuanLi",
    props: [],
    components: {},
    computed: {},
    watch: {},
    data() {
      return {
        showTab:0,//当前显示哪个
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

        selectVlaue: "1",
        selectOptions: [
          {
            value: '1',
            label: '昵称'
          }, {
            value: '2',
            label: '编号'
          }, {
            value: '3',
            label: '手机号'
          }, {
            value: '4',
            label: '业务员昵称/手机号'
          }
        ],
        inputValue: "",
      }
    },
    created() {
    },
    mounted() {
      this.init()
      this.getData()
    },
    methods: {
      //改变导航
      changeTab(index){
        this.showTab = index
      },
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
  .ZiJinGuanLi {
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

      .top-tabs {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;

        .tab {
          font-size: 14px;
          margin: 0 30px 0 0;
          padding-bottom: 5px;
          cursor: pointer;
          position: relative;
        }

        .tab-checked {
          color: rgb(64,158,255);
        }

        .tab-checked:before {
          content: " ";
          position: absolute;
          top: 23px;
          left: 0;
          display: inline-block;
          width: 100%;
          height: 2px;
          background-color: rgb(64,158,255);
        }
      }

      .part {
        margin-top: 15px;
        .table-box {
          margin-top: 20px;
        }
      }

      .part2 {
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
      }

      .fen-ye-qi-box {
        margin-top: 20px;
        text-align: right;
      }
    }
  }
</style>
