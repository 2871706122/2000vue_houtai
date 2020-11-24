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
                prop="createTime"
                label="日期"
            >
            </el-table-column>
            <el-table-column
                prop="rechargeAmount"
                label="充值金额">
            </el-table-column>
            <el-table-column
                prop="consumeAmount"
                label="消耗金额">
            </el-table-column>
            <el-table-column
                prop="perparePay"
                label="待发金额">
            </el-table-column>
            <el-table-column
                prop="payAlready"
                label="发放金额">
            </el-table-column>
            <el-table-column
                prop="balance"
                label="平台余额">
            </el-table-column>
            <el-table-column
                label="操作">
              <template slot-scope="scope">
                <el-popconfirm
                    title="确定发放？"
                    @onConfirm="faFang(scope.$index, scope.row)"
                >
                  <span v-if="scope.row.status==0" class="table-btn table-btn1" slot="reference">发放</span>
                </el-popconfirm>
                <span v-if="scope.row.status==1" class="table-btn table-btn1">发放中</span>
                <span v-if="scope.row.status==2" class="table-btn table-btn1">已发放</span>
              </template>
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

      <div class="part part2" v-show="showTab==1">
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
        </div>
        <div class="table-box">
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                label="昵称">
              <template slot-scope="scope">
                <div style="display: flex;align-items: center;">
                  <img :src="scope.row.wxPictureUrl" alt=""
                       style="display: inline-block;width: 30px;height: 30px;margin-right: 20px;">
                  <span>{{ scope.row.nickname }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
                label="客户电话/编号">
              <template slot-scope="scope">
                <span>{{ scope.row.merchantMobile }}</span>{{
                  scope.row.merchantMobile ? '/' : ""
                }}<span>{{ scope.row.merchantCode }}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="channelCode"
                label="业务员">
            </el-table-column>
            <el-table-column
                prop="amount"
                label="充值金额">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="充值时间">
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

      <div class="part part2" v-show="showTab==2">
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
                    placeholder="请输入编号"
                    v-model="num2"
                    clearable>
                </el-input>
              </div>
            </div>

            <div class="item">
              <span class="key">身份类型：</span>
              <div class="input-box">
                <el-select v-model="role" clearable placeholder="请选择身份类型">
                  <el-option
                      v-for="item in roles"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="item">
              <span class="key">发放状态：</span>
              <div class="input-box">
                <el-select v-model="status" clearable placeholder="请选择发放状态">
                  <el-option
                      v-for="item in statuses"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="btn-box">
              <el-button @click="search('btn')" type="primary">查询</el-button>
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
                label="发放状态">
              <template slot-scope="scope">
                <span>{{
                    scope.row.status * 1 == 1 ? '转账成功' : (scope.row.status * 1 == 2 ? '转账失败' : (scope.row.status * 1 == 3 ? '处理中' : ''))
                  }}</span>
              </template>
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
      num1: "",
      num2: "",
      num3: "",
      showTab: 0,//当前显示哪个
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,

      role: "",
      status:"",

      //1平台，2业务员,3团长，4粉丝
      roles: [
        {
          value: '1',
          label: '平台'
        },
        {
          value: '2',
          label: '业务员'
        },
        {
          value: '3',
          label: '团长'
        },
        {
          value: '4',
          label: '粉丝'
        }
      ],

      statuses:[
        {
          value: '1',
          label: '转账成功'
        },
        {
          value: '2',
          label: '转账失败'
        },
        {
          value: '3',
          label: '处理中'
        }
      ],
    }
  },
  created() {
  },
  mounted() {
    this.init()
    this.getData(0)
  },
  methods: {
    //改变导航
    changeTab(index) {
      this.num1 = ""
      this.num2 = ""
      this.num3 = ""
      this.role = ""
      this.status = ""

      this.pageNum = 1
      this.pageSize = 10
      this.total = 0

      this.showTab = index
      this.getData()
    },
    //点击发放按钮
    faFang(index, item) {
      let url = "/fund/fund/pay?id=" + item.id
      this.$axios.post(url).then(res => {
        if (res.data.status == 200 && res.data.message == "成功") {
          this.$message({
            message: '发放成功',
            type: 'success'
          });
          this.getData()
        } else {
          alert(res.data.message)
        }
      }).catch((err) => {
        console.log(err);
      })
    },


    //初始化界面
    init() {

    },

    //获取数据
    getData(type) {
      if (type == 'btn') {
        this.pageNum = 1
      }
      let index = this.showTab
      if (index == 0) {
        let url = "/fund/list?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize
        this.$axios.get(url).then(res => {
          //console.log(res);
          if (res.data.status == 200 && res.data.message == "成功") {
            this.total = res.data.data.count
            this.tableData = res.data.data.resultList
            for(let i=0;i<this.tableData.length;i++) {
              this.tableData[i].rechargeAmount = this.tableData[i].rechargeAmount/100
              this.tableData[i].consumeAmount = this.tableData[i].consumeAmount/100

              this.tableData[i].perparePay = this.tableData[i].perparePay/100
              this.tableData[i].payAlready = this.tableData[i].payAlready/100

              this.tableData[i].balance = this.tableData[i].balance/100
            }
          } else {
            this.$message.error(res.data.message)
            //alert(res.data.message)
          }
        }).catch((err) => {
          console.log(err);
          alert("请求失败")
        })
      } else if (index == 1) {
        let url = "/trade/list?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize
        if (this.num1) {
          url += ("&nickname=" + this.num1)
        }

        if (this.num2) {
          url += ("&merchantCode=" + this.num2)
        }

        if (this.num3) {
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
          if (res.data.status == 200 && res.data.message == "成功") {
            this.total = res.data.data.count
            this.tableData = res.data.data.resultList
            for(let i=0;i<this.tableData.length;i++) {
              this.tableData[i].amount = this.tableData[i].amount/100
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch((err) => {
          console.log(err);
          alert("请求失败")
        })
      } else if (index == 2) {
        let url = "/repay/list?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize
        if (this.num1) {
          url += ("&nickname=" + this.num1)
        }

        if (this.num2) {
          url += ("&openid=" + this.num2)
        }

        if (this.role) {
          url += ("&role=" + this.role)
        }

        if (this.status) {
          url += ("&status=" + this.status)
        }

        this.$axios.get(url).then(res => {
          //console.log(res);
          if (res.data.status == 200 && res.data.message == "成功") {
            this.total = res.data.data.count
            this.tableData = res.data.data.resultList
            for(let i=0;i<this.tableData.length;i++) {
              this.tableData[i].amount = this.tableData[i].amount/100
            }
          } else {
            this.$message.error(res.data.message)
          }
        }).catch((err) => {
          console.log(err);
          alert("请求失败")
        })
      }
    },

    //查询
    search(type) {
      this.getData(type)
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
        color: rgb(64, 158, 255);
      }

      .tab-checked:before {
        content: " ";
        position: absolute;
        top: 23px;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 2px;
        background-color: rgb(64, 158, 255);
      }
    }

    .part {
      margin-top: 15px;

      .table-box {
        margin-top: 20px;

        /deep/ .table-btn {
          color: rgba(22, 155, 213, 1);
          cursor: pointer;
        }

        /deep/ .table-btn1 {
          margin: 0 20px 0 0;
          color: rgba(22, 155, 213, 1);
          cursor: pointer;
        }
      }
    }

    .part2 {
      .row1 {
        display: flex;
        align-items: center;
        justify-content: space-between;

        * {
          white-space: nowrap;
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
    }

    .fen-ye-qi-box {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
