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
              prop="address"
              label="密码">
          </el-table-column>
          <el-table-column
              prop="nickname"
              label="姓名">
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
        let url = "/user/list?pageNum="+this.pageNum+"&pageSize="+this.pageSize
        this.$axios.post(url).then(res => {
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
}
</style>
