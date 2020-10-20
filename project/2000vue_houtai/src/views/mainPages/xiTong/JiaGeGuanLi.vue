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
              <span @click="handleEdit(scope.$index, scope.row)" class="table-btn">删除</span>
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
}
</style>
