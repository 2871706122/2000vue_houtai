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
              prop="name2"
              label="创建日期">
          </el-table-column>
          <el-table-column
              prop="name2"
              label="账号">
          </el-table-column>
          <el-table-column
              prop="address"
              label="密码">
          </el-table-column>
          <el-table-column
              prop="address2"
              label="姓名">
          </el-table-column>
          <el-table-column
              label="操作">
            <template slot-scope="scope">
              <span @click="handleEdit(scope.$index, scope.row)">编辑</span>
              <span @click="handleEdit(scope.$index, scope.row)">删除</span>
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
    }


    .fen-ye-qi-box {
      margin-top: 20px;
      text-align: right;
    }
  }
}
</style>
