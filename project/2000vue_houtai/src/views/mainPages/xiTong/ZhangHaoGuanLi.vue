<template>
  <!-- 账号管理 -->
  <div class="ZhangHaoGuanLi">
    <div class="top-title">账号管理</div>
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
              prop="username"
              label="账号">
          </el-table-column>
          <el-table-column
              prop="password"
              label="密码">
          </el-table-column>
          <el-table-column
              prop="nickname"
              label="姓名">
          </el-table-column>
          <el-table-column
              prop="phoneNumber"
              label="手机号">
          </el-table-column>
          <el-table-column
              label="操作">
            <template slot-scope="scope">
              <span @click="edit(scope.$index, scope.row)" class="table-btn table-btn1">编辑</span>
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
      <div class="item">
        <span class="key">姓名：</span>
        <div class="input-box">
          <el-input
              placeholder="请输入姓名"
              v-model="num1">
          </el-input>
        </div>
      </div>
      <div class="item">
        <span class="key">密码：</span>
        <div class="input-box">
          <el-input
              placeholder="请输入密码"
              v-model="num2">
          </el-input>
        </div>
      </div>
      <div class="item">
        <span class="key">手机号：</span>
        <div class="input-box">
          <el-input
              placeholder="请输入手机号"
              v-model="num3">
          </el-input>
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
  name: "ZhangHaoGuanLi",
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
      title: "新建",
      dialogFormVisible: false,
      num1: "",
      num2: "",
      num3: "",
      editItem: "",//
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
      this.num1 = ""
      this.num2 = ""
      this.num3 = ""
      this.title = "新建"
      this.dialogFormVisible = true
    },

    //点击table中的编辑按钮
    edit(index, item) {
      this.editItem = item
      this.num1 = item.nickname
      this.num2 = item.password
      this.num3 = item.phoneNumber
      this.title = "编辑"
      this.dialogFormVisible = true
    },


    //初始化界面
    init() {

    },

    //获取数据
    getData() {
      let url = "/user/list?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize
      this.$axios.post(url).then(res => {
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

    //确认删除
    del(item) {
      let url = "/user/remove?password=" + item.password + "&username=" + item.username
      this.$axios.post(url).then(res => {
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

    //确认创建或者编辑
    sure() {
      let flag = this.dataTest()
      if(flag == false){
        return
      }

      if(this.title == "新建") {
        let url = "/user/add/check?mobile="+this.num3 + "&nickname=" + this.num1 + "&password=" + this.num2
        this.$axios.post(url).then(res => {
          if (res.data.status == 200 && res.data.message == "成功") {
            this.$message({
              message: '添加成功!',
              type: 'success'
            });
            this.dialogFormVisible = false
            this.getData()
          } else {
            alert(res.data.message)
          }
        }).catch((err) => {
          console.log(err);
          alert("请求失败")
        })
      }else if(this.title == "编辑"){
        let url = "/user/update?mobile="+this.num3 + "&nickname=" + this.num1 + "&newPassword=" + this.num2 + "&username=" + this.editItem.username + "&password=" + this.editItem.password
        this.$axios.post(url).then(res => {
          if (res.data.status == 200 && res.data.message == "成功") {
            this.$message({
              message: '修改成功!',
              type: 'success'
            });
            this.dialogFormVisible = false
            this.getData()
          } else {
            alert(res.data.message)
          }
        }).catch((err) => {
          console.log(err);
          alert("请求失败")
        })
      }
    },

    //数据校验
    dataTest() {
      if (!this.num1 || !this.num2 || !this.num3) {
        this.$message({
          message: '当前弹窗页面还有数据未完善！请完善后再提交。',
          type: 'warning'
        });
        return false
      } else {
        var myreg = /^1[0-9]{10}$/;
        if (!myreg.test(this.num3)) {
          this.num3 = ""
          this.$message({
            message: '手机号码有误，请重填',
            type: 'warning'
          });
          return false
        }
        return true
      }
    },

    //查询
    search() {

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
.ZhangHaoGuanLi {
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
    .item {
      display: flex;
      align-items: center;
      margin-right: 100px;
      margin-bottom: 15px;

      .key {
        margin-right: 20px;
        min-width: 100px;
        text-align: right;
      }

      .input-box {
        flex: 1;
      }
    }

    /deep/ .number-input .el-input__inner {
      padding-right: 5px;
    }
  }
}
</style>
