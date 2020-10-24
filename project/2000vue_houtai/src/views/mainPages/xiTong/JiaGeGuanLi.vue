<template>
  <!-- 价格管理 -->
  <div class="JiaGeGuanLi">
    <div class="top-title">价格管理</div>
    <div class="content">
      <div class="row1">
        <div class="left">
          <div class="btn-box">
            <el-button @click="create" type="primary">创建</el-button>
          </div>
        </div>
      </div>
      <div class="table-box">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              prop="createTime"
              label="创建日期">
          </el-table-column>
          <el-table-column
              prop="priceCategoryName"
              label="名称">
          </el-table-column>
          <el-table-column
              prop="remark"
              label="备注">
          </el-table-column>
          <el-table-column
              label="操作">
            <template slot-scope="scope">
              <span @click="handleEdit(scope.$index, scope.row)" class="table-btn table-btn1">编辑</span>
              <el-popconfirm
                  title="确定删除？"
                  @onConfirm="del(scope.row)"
              >
                <span class="table-btn" slot="reference">删除</span>
              </el-popconfirm>
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

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <div class="row">
        <div class="item">
          <span class="key">价格表名称：</span>
          <div class="input-box">
            <el-input
                placeholder="请输入价格表名称"
                v-model="num1">
            </el-input>
          </div>
        </div>
      </div>

      <div class="row2">
        <div class="type">淘宝直播：</div>

        <div class="item">
          <span class="key">关注：</span>
          <div class="input-box">
            <el-input
                class="number-input"
                type="number"
                min="0"
                step="0.01"
                @blur="lengthTest('num2')"
                placeholder="请输入金额"
                v-model="num2">
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">点赞20：</span>
          <div class="input-box">
            <el-input
                class="number-input"
                type="number"
                min="0"
                step="0.01"
                @blur="lengthTest('num3')"
                placeholder="请输入金额"
                v-model="num3">
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">马上抢：</span>
          <div class="input-box">
            <el-input
                class="number-input"
                type="number"
                min="0"
                step="0.01"
                @blur="lengthTest('num4')"
                placeholder="请输入金额"
                v-model="num4">
            </el-input>
          </div>
        </div>
      </div>

      <div class="row2">
        <div class="type">抖音直播：</div>

        <div class="item">
          <span class="key">关注：</span>
          <div class="input-box">
            <el-input
                class="number-input"
                type="number"
                min="0"
                step="0.01"
                @blur="lengthTest('num5')"
                placeholder="请输入金额"
                v-model="num5">
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">评论互动20秒：</span>
          <div class="input-box">
            <el-input
                class="number-input"
                type="number"
                min="0"
                step="0.01"
                @blur="lengthTest('num6')"
                placeholder="请输入金额"
                v-model="num6">
            </el-input>
          </div>
        </div>
      </div>

      <div class="row2">
        <div class="type">抖音短视频：</div>

        <div class="item">
          <span class="key">关注：</span>
          <div class="input-box">
            <el-input
                class="number-input"
                type="number"
                min="0"
                step="0.01"
                @blur="lengthTest('num7')"
                placeholder="请输入金额"
                v-model="num7">
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">点赞：</span>
          <div class="input-box">
            <el-input
                class="number-input"
                type="number"
                min="0"
                step="0.01"
                @blur="lengthTest('num9')"
                placeholder="请输入金额"
                v-model="num9">
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">评论：</span>
          <div class="input-box">
            <el-input
                class="number-input"
                type="number"
                min="0"
                step="0.01"
                @blur="lengthTest('num10')"
                placeholder="请输入金额"
                v-model="num10">
            </el-input>
          </div>
        </div>
      </div>

      <div class="row2">
        <div class="type">快手直播：</div>

        <div class="item">
          <span class="key">关注：</span>
          <div class="input-box">
            <el-input
                class="number-input"
                type="number"
                min="0"
                step="0.01"
                @blur="lengthTest('num11')"
                placeholder="请输入金额"
                v-model="num11">
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">评论互动20秒：</span>
          <div class="input-box">
            <el-input
                class="number-input"
                type="number"
                min="0"
                step="0.01"
                @blur="lengthTest('num12')"
                placeholder="请输入金额"
                v-model="num12">
            </el-input>
          </div>
        </div>
      </div>

      <div class="row2">
        <div class="type">快手短视频：</div>

        <div class="item">
          <span class="key">关注：</span>
          <div class="input-box">
            <el-input
                class="number-input"
                type="number"
                min="0"
                step="0.01"
                @blur="lengthTest('num13')"
                placeholder="请输入金额"
                v-model="num13">
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">点赞：</span>
          <div class="input-box">
            <el-input
                class="number-input"
                type="number"
                min="0"
                step="0.01"
                @blur="lengthTest('num14')"
                placeholder="请输入金额"
                v-model="num14">
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">评论：</span>
          <div class="input-box">
            <el-input
                class="number-input"
                type="number"
                min="0"
                step="0.01"
                @blur="lengthTest('num15')"
                placeholder="请输入金额"
                v-model="num15">
            </el-input>
          </div>
        </div>
      </div>

      <div class="row3">
        <div class="item">
          <span class="key">备注：</span>
          <div class="input-box">
            <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入备注"
                v-model="num16">
            </el-input>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "JiaGeGuanLi",
  props: [],
  components: {},
  computed: {},
  watch: {},
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      dialogFormVisible: false,//弹窗显示开关
      title:"新建",//弹窗标题

      isCreate: true,//是在创建还是在编辑
      editItem: "",//当前编辑的对象

      num1: "",
      num2: "",
      num3: "",
      num4: "",
      num5: "",
      num6: "",
      num7: "",
      num9: "",
      num10: "",
      num11: "",
      num12: "",
      num13: "",
      num14: "",
      num15: "",
      num16: "",
    }
  },
  created() {
  },
  mounted() {
    this.init()
    this.getData()
  },
  methods: {
    //点击创建按钮
    create() {
      this.inputsInit()
      this.isCreate = true
      this.title = "新建"
      this.dialogFormVisible = true
    },

    //确认创建或者确认编辑
    sure() {
      let flag = this.inputsTest()
      if (flag == true) {
        if (this.isCreate == true) {//是新建
          let url = "/price/add?"
          url += ("douyinCommunicateTwenty=" + this.num6*100)
          url += ("&douyinLiveAttention=" + this.num5*100)
          url += ("&douyinShortLiveAttention=" + this.num7*100)
          url += ("&douyinShortLiveCommunicate=" + this.num10*100)
          url += ("&douyinShortLiveLike=" + this.num9*100)

          url += ("&kuaishouLiveAttention=" + this.num11*100)
          url += ("&kuaishouLiveCommunicateTwenty=" + this.num12*100)
          url += ("&kuaishouShortLiveAttention=" + this.num13*100)
          url += ("&kuaishouShortLiveCommunicate=" + this.num15*100)
          url += ("&kuaishouShortLiveLike=" + this.num14*100)

          url += ("&name=" + this.num1)

          url += ("&remark=" + this.num16)

          url += ("&taobaoLiveAttention=" + this.num2*100)
          url += ("&taobaoLiveBuyImmediately=" + this.num4*100)
          url += ("&taobaoLiveLike=" + this.num3*100)
          this.$axios.post(url).then(res => {
            //console.log(res);
            if (res.data.status == 200 && res.data.message == "成功") {
              this.$message({
                message: '创建成功!',
                type: 'success'
              });
              this.getData()
            } else {
              alert(res.data.message)
            }
          }).catch((err) => {
            console.log(err);
            alert("请求失败")
          })
        } else if (this.isCreate == false) {//是编辑
          let url = "/price/modify?"
          url += ("douyinCommunicateTwenty=" + this.num6*100)
          url += ("&douyinLiveAttention=" + this.num5*100)
          url += ("&douyinShortLiveAttention=" + this.num7*100)
          url += ("&douyinShortLiveCommunicate=" + this.num10*100)
          url += ("&douyinShortLiveLike=" + this.num9*100)

          url += ("&kuaishouLiveAttention=" + this.num11*100)
          url += ("&kuaishouLiveCommunicateTwenty=" + this.num12*100)
          url += ("&kuaishouShortLiveAttention=" + this.num13*100)
          url += ("&kuaishouShortLiveCommunicate=" + this.num15*100)
          url += ("&kuaishouShortLiveLike=" + this.num14*100)

          url += ("&name=" + this.num1)

          url += ("&priceType=" + this.editItem.priceType)

          url += ("&remark=" + this.num16)

          url += ("&taobaoLiveAttention=" + this.num2*100)
          url += ("&taobaoLiveBuyImmediately=" + this.num4*100)
          url += ("&taobaoLiveLike=" + this.num3*100)
          this.$axios.post(url).then(res => {
            //console.log(res);
            if (res.data.status == 200 && res.data.message == "成功") {
              this.$message({
                message: '修改成功!',
                type: 'success'
              });
              this.getData()
            } else {
              alert(res.data.message)
            }
          }).catch((err) => {
            console.log(err);
            alert("请求失败")
          })
        }
        //关闭弹窗
        this.dialogFormVisible = false
      }
    },

    //点击编辑按钮
    handleEdit(index, item) {
      let url = "/price/detail?priceType=" + item.priceType
      this.$axios.get(url).then(res => {
        if (res.data.status == 200 && res.data.message == "成功") {
          this.isCreate = false
          this.editItem = item
          this.title = "编辑"
          let data = res.data.data
          //console.log(data);
          this.num1 = data.name
          this.num2 = (data.taobaoLiveAttention/100).toFixed(2)
          this.num3 = (data.taobaoLiveLike/100).toFixed(2)
          this.num4 = (data.taobaoLiveBuyImmediately/100).toFixed(2)
          this.num5 = (data.douyinLiveAttention/100).toFixed(2)
          this.num6 = (data.douyinCommunicateTwenty/100).toFixed(2)
          this.num7 = (data.douyinShortLiveAttention/100).toFixed(2)
          this.num9 = (data.douyinShortLiveLike/100).toFixed(2)
          this.num10 = (data.douyinShortLiveCommunicate/100).toFixed(2)
          this.num11 = (data.kuaishouLiveAttention/100).toFixed(2)
          this.num12 = (data.kuaishouLiveCommunicateTwenty/100).toFixed(2)
          this.num13 = (data.kuaishouShortLiveAttention/100).toFixed(2)
          this.num14 = (data.kuaishouShortLiveLike/100).toFixed(2)
          this.num15 = (data.kuaishouShortLiveCommunicate/100).toFixed(2)
          this.num16 = data.remark
          this.dialogFormVisible = true
        } else {
          alert(res.data.message)
        }
      }).catch((err) => {
        console.log(err);
        alert("请求失败")
      })
    },

    //金额小数位数控制
    lengthTest(num) {
      let value = this[num]
      value = value*1
      if (value) {
        this[num] = this.formatMoney(value)
      }
    },

    //输入框数据验证
    inputsTest() {
      if (!this.num1 || !this.num2 || !this.num3 || !this.num4 || !this.num5 || !this.num6 || !this.num7 || !this.num9 || !this.num10 || !this.num11 || !this.num12 || !this.num13 || !this.num14 || !this.num15 || !this.num16) {
        this.$message({
          message: '当前弹窗页面还有数据未完善！请完善后再提交。',
          type: 'warning'
        });
        return false
      } else {
        return true
      }
    },

    //输入框数据初始化
    inputsInit() {
      this.num1 = ""
      this.num2 = ""
      this.num3 = ""
      this.num4 = ""
      this.num5 = ""
      this.num6 = ""
      this.num7 = ""
      this.num9 = ""
      this.num10 = ""
      this.num11 = ""
      this.num12 = ""
      this.num13 = ""
      this.num14 = ""
      this.num15 = ""
      this.num16 = ""
    },


    //初始化界面
    init() {

    },

    //获取数据
    getData() {
      let url = "/price/list?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize
      this.$axios.get(url).then(res => {
        //console.log(res);
        if (res.data.status == 200 && res.data.message == "成功") {
          this.total = res.data.data.count
          this.tableData = res.data.data.resultList
        } else {
          alert(res.data.message)
        }
      }).catch((err) => {
        console.log(err);
        alert("请求失败")
      })
    },

    //查询
    search() {

    },

    //确认删除
    del(item) {
      let url = "/price/remove?priceType=" + item.priceType
      this.$axios.get(url).then(res => {
        if (res.data.status == 200 && res.data.message == "成功") {
          this.$message({
            message: '删除成功！',
            type: 'success'
          });
          this.getData()
        } else {
          alert(res.data.message)
        }
      }).catch((err) => {
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
    },

    //格式化金额1
    formatMoney(money) {
      try {
        var money =
            money &&
            (money.toString().indexOf(".") != -1
                ? money.toString().replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                : money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
        return this.Getamount(money);
      } catch {
        return this.Getamount(money);
      }
    },

    //格式化金额1.1
    Getamount(str) {
      try {
        if (-1 != str.indexOf(".")) {
          let result = str.substring(0, str.indexOf(".") + 3);
          if (result.indexOf(".") == result.length - 2) {
            result += "0"
          }
          return result;
        } else {
          return str + ".00";
        }
      } catch {
        return str;
      }
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped lang="scss">
.JiaGeGuanLi {
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
      justify-content: flex-end;
    }

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

    .fen-ye-qi-box {
      margin-top: 20px;
      text-align: right;
    }
  }

  /deep/ .el-dialog__wrapper {
    .row {
      display: flex;
      align-items: center;

      .item {
        display: flex;
        align-items: center;

        .key {
          margin-right: 20px;
          min-width: 100px;
          text-align: right;
        }
      }
    }

    .row2 {
      margin-top: 30px;
      display: flex;
      align-items: center;
      white-space: nowrap;

      .type {
        margin-right: 20px;
        min-width: 100px;
        text-align: right;
      }

      .item {
        display: flex;
        align-items: center;

        .key {
          margin-right: 5px;
        }

        .input-box {
          max-width: 120px;
        }
      }

      .item2 {
        width: 250px;
        justify-content: flex-end;
      }
    }

    .row3 {
      margin-top: 30px;
      display: flex;
      align-items: center;

      .item {
        display: flex;
        width: 67%;

        .key {
          margin-right: 20px;
          min-width: 100px;
          text-align: right;
        }

        .input-box {
          flex: 1;
        }
      }
    }

    /deep/ .number-input .el-input__inner {
      padding-right: 5px;
    }
  }
}
</style>
