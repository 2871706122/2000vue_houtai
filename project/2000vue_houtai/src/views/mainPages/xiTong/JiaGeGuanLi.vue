<template>
  <!-- 价格管理 -->
  <div class="JiaGeGuanLi">
    <div class="top-title">价格管理</div>
    <div class="content">
      <div class="row1">
        <div class="left">
          <div class="btn-box">
            <el-button @click="dialogFormVisible = true" type="primary">创建</el-button>
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
              prop="platformName"
              label="名称">
          </el-table-column>
          <el-table-column
              prop="designation"
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

    <el-dialog title="新建" :visible.sync="dialogFormVisible">
      <div class="row">
        <div class="item">
          <span class="key">价格表名称：</span>
          <div class="input-box">
            <el-input
                placeholder="请输入价格表名称"
                v-model="num1"
                clearable>
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
                placeholder="请输入金额"
                v-model="num2"
                clearable>
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">点赞：</span>
          <div class="input-box">
            <el-input
                placeholder="请输入金额"
                v-model="num3"
                clearable>
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">马上抢：</span>
          <div class="input-box">
            <el-input
                placeholder="请输入金额"
                v-model="num4"
                clearable>
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
                placeholder="请输入金额"
                v-model="num5"
                clearable>
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">评论互动20秒：</span>
          <div class="input-box">
            <el-input
                placeholder="请输入金额"
                v-model="num6"
                clearable>
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
                placeholder="请输入金额"
                v-model="num7"
                clearable>
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">点赞：</span>
          <div class="input-box">
            <el-input
                placeholder="请输入金额"
                v-model="num9"
                clearable>
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">评论：</span>
          <div class="input-box">
            <el-input
                placeholder="请输入金额"
                v-model="num10"
                clearable>
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
                placeholder="请输入金额"
                v-model="num11"
                clearable>
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">评论互动20秒：</span>
          <div class="input-box">
            <el-input
                placeholder="请输入金额"
                v-model="num12"
                clearable>
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
                placeholder="请输入金额"
                v-model="num13"
                clearable>
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">点赞：</span>
          <div class="input-box">
            <el-input
                placeholder="请输入金额"
                v-model="num14"
                clearable>
            </el-input>
          </div>
        </div>

        <div class="item item2">
          <span class="key">评论：</span>
          <div class="input-box">
            <el-input
                placeholder="请输入金额"
                v-model="num15"
                clearable>
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
        <el-button type="primary" @click="dialogFormVisible = false">确 认</el-button>
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
        pageSize:10,
        total:0,
        dialogFormVisible:false,

        num1:"",
        num2:"",
        num3:"",
        num4:"",
        num5:"",
        num6:"",
        num7:"",
        num8:"",
        num9:"",
        num10:"",
        num11:"",
        num12:"",
        num13:"",
        num14:"",
        num15:"",
        num16:"",
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
      create(){

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
        let url = "/price/list?pageNum="+this.pageNum+"&pageSize="+this.pageSize
        this.$axios.post(url).then(res => {
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

      //查询
      search() {

      },

      //确认删除
      del(item) {
        console.log(item);
        this.$message({
          message: '删除完成！',
          type: 'success'
        });
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
        color: rgba(22,155,213,1);
        cursor: pointer;
      }

      /deep/ .table-btn1 {
        margin: 0 20px 0 0;
        color: rgba(22,155,213,1);
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
      white-space:nowrap;

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
  }
}
</style>
