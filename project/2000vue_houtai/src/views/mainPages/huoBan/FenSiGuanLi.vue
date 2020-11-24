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
            <span class="key">团长工号：</span>
            <div class="input-box">
              <el-input
                  placeholder="请输入团长工号"
                  v-model="num3"
                  clearable>
              </el-input>
            </div>
          </div>
        </div>
        <div class="right">
          客户总数：<span class="num">{{ total }}</span>
        </div>
      </div>

      <div class="row1" style="margin-top: 20px;">
        <div class="left">
          <div class="item">
            <span class="key">注册时间段：</span>
            <el-date-picker
                v-model="time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </div>

          <div class="btn-box">
            <el-button @click="search('btn')" type="primary">查询</el-button>
            <el-button @click="exporting" type="primary">导出</el-button>
          </div>
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
              <div style="display: flex;align-items: center;">
                <img :src="scope.row.wxPictureUrl" alt="" style="display: inline-block;width: 30px;height: 30px;margin-right: 20px;">
                <span>{{scope.row.wxNickname}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="openid"
              label="openid">
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="注册时间">
          </el-table-column>
          <el-table-column
              prop="captain"
              label="所属团长">
          </el-table-column>
          <el-table-column
              prop="fansCount"
              sortable="custom"
              label="下级人数">
          </el-table-column>
          <el-table-column
              prop="caAmount"
              sortable="custom"
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
        time:"",
        tableData: [],
        pageNum: 1,
        pageSize:10,
        total:0,
        orderBy:0,//以什么排序
        desc:-1,//-1代表默认，true代表升序，false代表降序  //垃圾后端，让我改代码来配合他那边的错误排序，改为了true代表降序，false代表升序

      }
    },
    created() {
    },
    mounted() {
      this.init()
    },
    methods: {
      //点击table中的按钮
      handleEdit(a,b) {
        console.log(a,b);
      },

      //初始化界面
      init() {
        this.time = []
        //获取月初和当前的日期
        let day = new Date();
        let y = day.getFullYear()
        let m = day.getMonth() + 1
        m = (m<=9?("0"+m):m)
        let d = day.getDate()
        d = (d<=9?("0"+d):d)

        let time1 = y + "-" + m + "-01" + " 00:00:00"
        time1 = new Date(time1)
        this.time.push(time1)

        let h = day.getHours()
        h = (h<=9?("0"+h):h)
        let m2 = day.getMinutes()
        m2 = (m2<=9?("0"+m2):m2)
        let s = day.getSeconds()
        s = (s<=9?("0"+s):s)

        let time2 = y + "-" + m + "-" + d + " " + h + ":" + m2 + ":" + s
        time2 = new Date(time2)
        this.time.push(time2)

        this.getData()
      },

      //获取数据
      getData() {
        this.search()
      },

      //查询
      search(type) {
        if(type=='btn') {
          this.pageNum = 1
        }
        let url = "/fs/perfor/list?pageNum="+this.pageNum+"&pageSize="+this.pageSize
        if(this.num1){
          url += ("&nickname=" + this.num1)
        }

        if(this.num2){
          url += ("&openid=" + this.num2)
        }

        if(this.num3){
          url += ("&captain=" + this.num3)
        }

        if(this.time && this.time.length == 2){
          let startTime = this.time[0].getTime()
          let endTime = this.time[1].getTime()
          url += ("&startTime=" + startTime)
          url += ("&endTime=" + endTime)
        }

        if(this.desc != -1) {
          url += ("&desc=" + this.desc)
          url += ("&orderBy=" + this.orderBy)
        }
        //console.log(url);
        this.$axios.get(url).then(res => {
          console.log(res);
          if(res.data.status == 200 && res.data.message == "成功"){
            this.total = res.data.data.count
            this.tableData = res.data.data.resultList
            for(let i=0;i<this.tableData.length;i++) {
              this.tableData[i].caAmount = this.tableData[i].caAmount/100
            }

          }else {
            alert(res.data.message)
          }
        }).catch((err)=>{
          console.log(err);
        })
      },

      //导出数据
      exporting() {

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
      //进行排序
      sortChange(column, prop, order) {
        //console.log(column, prop, order);
        if(column.order == "ascending"){//升序
          this.desc = false
        }else if(column.order == "descending"){//降序
          this.desc = true
        }else {//默认
          this.desc = -1
        }

        if(column.prop == "fansCount"){
          this.orderBy = "count"
        }else if(column.prop == "caAmount"){
          this.orderBy = "amount"
        }

        this.getData()
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

      * {
        white-space:nowrap;
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
