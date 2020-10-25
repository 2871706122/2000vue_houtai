<template>
  <!-- 订单管理 -->
  <div class="DingDanGuanLi">
    <div class="top-title">订单管理</div>
    <div class="content">
      <div class="row1">
        <div class="part1">
          <div class="item">
            <span>进行状态：</span>
            <el-select v-model="num1" clearable placeholder="请选择订单进行状态">
              <el-option label="未开始" value="NotStart"></el-option>
              <el-option label="进行中" value="Running"></el-option>
              <el-option label="已结束" value="Ending"></el-option>
            </el-select>
          </div>
        </div>

        <div class="part1">
          <div class="item">
            <span>结算状态：</span>
            <el-select v-model="num2" clearable placeholder="请选择订单结算状态">
              <el-option label="未结算" value="NotClear"></el-option>
              <el-option label="已结算" value="Clear"></el-option>
            </el-select>
          </div>
        </div>

        <div class="part1">
          <div class="item">
            <span>审核状态：</span>
            <el-select v-model="num3" clearable placeholder="请选择订单审核状态">
              <el-option label="已审核" value="NotNeedCheck"></el-option>
              <el-option label="未审核" value="NeedCheck"></el-option>
              <el-option label="审核中" value="Checking"></el-option>
            </el-select>
          </div>
        </div>

        <div class="part2">
          <div class="select-box">
            <span>其他类型筛选：</span>
            <el-select v-model="num4" clearable placeholder="请选择">
              <el-option
                  v-for="item in selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input-box" style="margin-right: 10px;">
            <el-input
                placeholder="请输入内容"
                v-model="num5"
                clearable>
            </el-input>
          </div>
          <el-button @click="getData" type="primary">查询</el-button>
        </div>
      </div>

      <div class="row2" v-for="(item,index) in list" :key="index">
        <div class="li1">
          <div class="part1">
            <img class="img" :src="item.wxPictureUrl" alt="">
            <span>{{item.wxNickname}}</span>
          </div>
          <div class="part2">{{item.merchantMobile + "/" + item.merchantCode}}</div>
          <div class="part3">业务员：{{item.yeWuYuan}}</div>
          <div class="part4">业务员手机号：{{item.businessMobile}}</div>
          <div class="part5">订单编号：{{item.taskOrderNo}}</div>
        </div>

        <div class="li2">
          <div class="part1">
            <img class="img" :src="item.img" alt="">
            <span class="my-title">{{item.title}}</span>
          </div>

          <div class="part2">{{item.link}}</div>
          <div class="part3"><span class="copy-text">复制链接</span></div>
        </div>

        <div class="li3">
          <div class="part1">
            <div class="key-value">订单数量：{{item.taskNum}}</div>
            <div class="key-value">订单金额：{{item.num2}}</div>
            <div class="key-value">订单消耗：{{item.num3}}</div>
            <div class="key-value">预扣退回：{{item.num4}}</div>
          </div>

          <div class="part2">
            <div class="jin-du">
              <span class="key">执行进度</span>
              <div class="line1">
                <div :style="'width:'+item.num5" class="line1-jin-du"></div>
              </div>
              <span class="per">{{item.num5}}</span>
              <span class="num"><span style="min-width: 56px;text-align:right;display: inline-block">已执行：</span>{{item.num8}}</span>
            </div>

            <div class="jin-du">
              <span class="key">审核进度</span>
              <div class="line1">
                <div :style="'width:'+item.num6" class="line2-jin-du"></div>
              </div>
              <span class="per">{{item.num6}}</span>
              <span class="num"><span style="min-width: 56px;text-align:right;display: inline-block">已审核：</span>{{item.num9}}</span>
            </div>

            <div class="jin-du">
              <span class="key">合格率</span>
              <div class="line1">
                <div :style="'width:'+item.num7" class="line3-jin-du"></div>
              </div>
              <span class="per">{{item.num7}}</span>
              <span class="num"><span style="min-width: 56px;text-align:right;display: inline-block">合格：</span>{{item.num10}}</span>
            </div>
          </div>

          <div class="part3">
            <div class="key-value">创建时间：{{item.createTime}}</div>
            <div class="key-value">开始时间：{{item.endTime}}</div>
            <div class="key-value">结束时间：{{item.endTime}}</div>
            <div class="key-value">结算时间：{{item.pubTime}}</div>
          </div>

          <div class="part4">
            <el-button type="primary" size="small">领取审核</el-button>
            <el-button type="primary" size="small">全部通过</el-button>
          </div>
        </div>
      </div>
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
</template>

<script>
  export default {
    name: "DingDanGuanLi",
    props: [],
    components: {},
    computed: {},
    watch: {},
    data() {
      return {
        num1:"",
        num2:"",
        num3:"",
        num4:"",
        num5:"",

        selectOptions: [
          {
            value: '1',
            label: '商户昵称'
          },
          {
            value: '2',
            label: '商户手机号'
          },
          {
            value: '3',
            label: '商户编号'
          },
          {
            value: '4',
            label: '业务员昵称'
          },
          {
            value: '5',
            label: '业务员手机号'
          },
          {
            value: '6',
            label: '订单编号'
          }
        ],
        list:[],
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
      //初始化界面
      init() {

      },

      //获取数据
      getData() {
        let testList = [
          {
            img:require("@/assets/imgs/u107.svg"),
            name:"阿木",
            phone:"152***8411",
            openid:"SA001",
            yeWuYuan:"九九",
            yeWuYuanPhone:"152***8411",
            dingDanBianHao:"SA0015165165165",
            title:"观看2/3进度+点赞+评论",
            link:"来看什么后来",
            num1:10,
            num2:200,
            num3:2000,
            num4:20000,
            num5:"20%",
            num6:"20%",
            num7:"20%",
            num8:2000,
            num9:20005,
            num10:200066,
            createTime:"2020-09-25 15:02:50",
            startTime:"2020-09-25 15:02:50",
            endTime:"2020-09-25 15:02:50",
            jieSuanTime:"2020-09-25 15:02:50",
            type:1,//1代表可以领取审核，2代表
          },
          {
            img:"@/assets/imgs/u107.svg",
            name:"阿木",
            phone:"152***8411",
            openid:"SA001",
            yeWuYuan:"九九",
            yeWuYuanPhone:"152***8411",
            dingDanBianHao:"SA0015165165165",
            title:"观看2/3进度+点赞+评论",
            link:"来看什么后来",
            num1:1000,
            num2:2000,
            num3:2000,
            num4:200,
            num5:"20%",
            num6:"20%",
            num7:"20%",
            num8:2000,
            num9:2000,
            num10:2000,
            createTime:"2020-09-25 15:02:50",
            startTime:"2020-09-25 15:02:50",
            endTime:"2020-09-25 15:02:50",
            jieSuanTime:"2020-09-25 15:02:50",
            type:1,//1代表可以领取审核，2代表
          },
          {
            img:"@/assets/imgs/u107.svg",
            name:"阿木",
            phone:"152***8411",
            openid:"SA001",
            yeWuYuan:"九九",
            yeWuYuanPhone:"152***8411",
            dingDanBianHao:"SA0015165165165",
            title:"观看2/3进度+点赞+评论",
            link:"来看什么后来",
            num1:1000,
            num2:2000,
            num3:2000,
            num4:200,
            num5:"20%",
            num6:"20%",
            num7:"20%",
            num8:2000,
            num9:2000,
            num10:2000,
            createTime:"2020-09-25 15:02:50",
            startTime:"2020-09-25 15:02:50",
            endTime:"2020-09-25 15:02:50",
            jieSuanTime:"2020-09-25 15:02:50",
            type:1,//1代表可以领取审核，2代表
          }
        ]

        let url = "/taskorder/taskorder/status/list?pageNum="+this.pageNum+"&pageSize="+this.pageSize
        if(this.num1){
          url += ("&runingStatus=" + this.num1)
        }

        if(this.num2){
          url += ("&clearStatus=" + this.num2)
        }

        if(this.num3){
          url += ("&checkStatus=" + this.num3)
        }

        if(this.num4){
          if(this.num4*1 == 2 || this.num4*1 == 5) {
            let myreg = /^1[0-9]{10}$/;
            if (!myreg.test(this.num5)) {
              this.num5 = ""
              this.$message({
                message: '手机号码有误，请重填',
                type: 'warning'
              });
              return
            }
          }

          if(this.num4*1 == 1){
            if(!this.num5){
              this.$message({
                message: '商户昵称不能为空！',
                type: 'warning'
              });
              return
            }
            url += ("&merchantNickname=" + this.num5)
          }else if(this.num4*1 == 2){
            url += ("&merchantMobile=" + this.num5)
          }else if(this.num4*1 == 3){
            if(!this.num5){
              this.$message({
                message: '商户编号不能为空！',
                type: 'warning'
              });
              return
            }
            url += ("&merchantCode=" + this.num5)
          }else if(this.num4*1 == 4){
            if(!this.num5){
              this.$message({
                message: '业务员昵称不能为空！',
                type: 'warning'
              });
              return
            }
            url += ("&businessNickname=" + this.num5)
          }else if(this.num4*1 == 5){
            url += ("&businessMobile=" + this.num5)
          }else if(this.num4*1 == 6){
            if(!this.num5){
              this.$message({
                message: '订单编号不能为空！',
                type: 'warning'
              });
              return
            }
            url += ("&taskOrderNo=" + this.num5)
          }
        }

        this.$axios.get(url).then(res => {
          if(res.data.status == 200 && res.data.message == "成功"){
            this.total = res.data.data.count
            this.list = res.data.data.resultList
          }else {
            alert(res.data.message)
          }
        }).catch((err)=>{
          console.log(err);
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
    },
    beforeDestroy() {
    }
  }
</script>

<style scoped lang="scss">
.DingDanGuanLi {
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
    padding: 30px 15px 30px 30px;
    box-sizing: border-box;
    border: 5px solid rgb(245, 247, 250);

    .row1 {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .part1 {
        margin-bottom: 20px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        white-space:nowrap;
      }

      .part2 {
        margin-bottom: 20px;
        display: flex;
        align-items: center;

        .select-box {
          white-space:nowrap;
        }
      }
    }

    .row2 {
      margin-bottom: 20px;
      border: 1px solid #ccc;

      .li1 {
        display: flex;
        align-items: center;
        line-height: 32px;
        border-bottom: 1px solid #ccc;

        .part1 {
          display: flex;
          align-items: center;
          white-space:nowrap;

          .img {
            margin: 0 10px;
            display: inline-block;
            width: 20px;
            height: 20px;
          }
        }

        .part2,.part3,.part4 {
          margin-left: 10%;
          white-space:nowrap;
        }
        
        .part5 {
          padding-right: 10px;
          flex: 1;
          text-align: right;
          white-space:nowrap;
        }
      }

      .li2 {
        padding-right: 10px;
        display: flex;
        align-items: center;
        background-color: rgb(242,242,242);
        line-height: 32px;

        .part1 {
          display: flex;
          align-items: center;
          .img {
            margin: 0 10px;
            display: inline-block;
            width: 20px;
            height: 20px;
          }

          .my-title {
            font-weight: bold;
          }
        }

        .part2 {
          margin-left: 10px;
        }

        .part3 {
          flex: 1;
          text-align: right;
          
          .copy-text {
            cursor: pointer;
            color: rgba(22,155,213,1);
          }
        }
      }

      .li3 {
        display: flex;
        justify-content: space-between;
        padding: 10px 10px 10px 40px;

        .part1 {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          white-space:nowrap;
        }

        .part2 {
          min-width: 200px;
          max-width: 600px;
          width: 45%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;

          .jin-du {
            display: flex;
            align-items: center;
            white-space:nowrap;

            .key {
              margin-right: 10px;
              text-align: right;
              width: 60px;
            }

            .per {
              margin: 0 15px;
            }

            .line1 {
              display: inline-block;
              width: 60%;
              height: 8px;
              background-color: rgb(235,238,245);
              border-radius: 4px;
              position: relative;

              .line1-jin-du {
                position: absolute;
                top: 0;
                left: 0;
                height: 8px;
                border-radius: 4px;
                background-color: rgb(64,158,255);
              }

              .line2-jin-du {
                position: absolute;
                top: 0;
                left: 0;
                height: 8px;
                border-radius: 4px;
                background-color: rgb(144,147,153);
              }

              .line3-jin-du {
                position: absolute;
                top: 0;
                left: 0;
                height: 8px;
                border-radius: 4px;
                background-color: rgb(230,162,60);
              }
            }
          }
        }

        .part3 {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        }

        .part4 {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;

          /deep/ .el-button {
            margin: 0;
            width: 110px;
          }
        }
      }
    }
  }

  .fen-ye-qi-box {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
