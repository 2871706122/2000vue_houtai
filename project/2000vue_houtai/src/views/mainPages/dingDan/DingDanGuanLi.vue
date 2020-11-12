<template>
  <!-- 订单管理 -->
  <div class="DingDanGuanLi">
    <div v-show="page==1" class="top-title">订单管理</div>
    <div v-show="page==1" class="content">
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
          <el-button @click="getData('btn')" type="primary">查询</el-button>
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
            <span class="my-title">{{item.platformName}}</span>
          </div>

          <div class="part2">{{item.taskName}}</div>
          <div class="part3"><span class="copy-text" @click="copy(item.taskName)">复制链接</span></div>
        </div>

        <div class="li3">
          <div class="part1">
            <div class="key-value">订单数量：{{item.taskNum}}</div>
            <div class="key-value">订单金额：{{item.price}}</div>
            <div class="key-value">订单消耗：{{item.usedFund}}</div>
            <div class="key-value">预扣退回：{{item.repayFund}}</div>
          </div>

          <div class="part2">
            <div class="jin-du">
              <span class="key">执行进度</span>
              <div class="line1">
                <div :style="'width:'+item.zhiXingJinDu" class="line1-jin-du"></div>
              </div>
              <span class="per">{{item.zhiXingJinDu}}</span>
              <span class="num"><span style="min-width: 56px;text-align:right;display: inline-block">已执行：</span>{{item.taskCommitNum}}</span>
            </div>

            <div class="jin-du">
              <span class="key">审核进度</span>
              <div class="line1">
                <div :style="'width:'+item.shenHeJinDu" class="line2-jin-du"></div>
              </div>
              <span class="per">{{item.shenHeJinDu}}</span>
              <span class="num"><span style="min-width: 56px;text-align:right;display: inline-block">已审核：</span>{{item.taskPassNum+item.taskNotPassNum}}</span>
            </div>

            <div class="jin-du">
              <span class="key">合格率</span>
              <div class="line1">
                <div :style="'width:'+item.heGeLv" class="line3-jin-du"></div>
              </div>
              <span class="per">{{item.heGeLv}}</span>
              <span class="num"><span style="min-width: 56px;text-align:right;display: inline-block">合格：</span>{{item.taskPassNum}}</span>
            </div>
          </div>

          <div class="part3">
            <div class="key-value">创建时间：{{item.createTime}}</div>
            <div class="key-value">开始时间：{{item.pubTime}}</div>
            <div class="key-value">结束时间：{{item.endTime}}</div>
            <div class="key-value">结算时间：{{item.clearTime}}</div>
          </div>

          <div class="part4">
            <!--      上键      -->
            <!--      审核员      -->
            <el-button @click="checkBtn(1,item)" v-if="item.btnType*1 == 31" type="primary" size="small">领取审核</el-button>
            <!--      管理员      -->
            <el-button v-if="item.btnType*1 == 32" @click="toRenWuGuanLiPage(item)" type="info" size="small">领取审核</el-button>

            <!--      审核员      -->
            <el-button @click="toRenWuGuanLiPage(item)" v-if="item.btnType*1 == 21" type="danger" size="small">{{ item.checkCode }}</el-button>
            <!--      管理员      -->
            <el-button @click="toRenWuGuanLiPage(item)" v-if="item.btnType*1 == 22" type="danger" size="small">{{ item.checkCode }}</el-button>
            <!--      审核员 不是自己      -->
            <el-button v-if="item.btnType*1 == 23" type="info" size="small">{{ item.checkCode }}</el-button>

            <!--      审核员      -->
            <el-button v-if="item.btnType*1 == 11" type="info" size="small">已审核</el-button>
            <!--      管理员      -->
            <el-button @click="toRenWuGuanLiPage(item)" v-if="item.btnType*1 == 12" type="info" size="small">已审核</el-button>

            <!--      下键      -->
            <!--       领取审核情况下   审核员||管理员  -->
            <el-button v-if="item.btnType*1 == 31 || item.btnType*1 == 32" type="info" size="small">全部通过</el-button>

            <!--      工号情况下  审核员    -->
            <el-button @click="checkBtn(2,item)" v-if="item.btnType*1 == 21" type="primary" size="small">全部通过</el-button>
            <!--      工号情况下  管理员  或者不是审核员自己的时候   -->
            <el-button v-if="item.btnType*1 == 22 || item.btnType*1 == 23" type="info" size="small">全部通过</el-button>

            <!--       已审核情况下  审核员||管理员   -->
            <el-button v-if="item.btnType*1 == 11 || item.btnType*1 == 12" type="info" size="small">全部通过</el-button>
          </div>
        </div>
      </div>
    </div>

    <div v-show="page==1" class="fen-ye-qi-box">
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

    <router-view v-show="page==2"/>
  </div>
</template>

<script>
  export default {
    name: "DingDanGuanLi",
    props: [],
    components: {},
    computed: {},
    watch: {
      $route: {
        handler: function(val,oldVal){
          this.init(val)
        },
        deep: true
      }
    },
    data() {
      return {
        page:1,

        userType:"",
        username:"",

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
      this.init(this.$route)
      this.getData()
    },
    methods: {
      //初始化界面
      init(val) {
        this.userType = localStorage.getItem("userType")
        this.userName = localStorage.getItem("name")

        //console.log(val);
        if(val){
          if(val.path.indexOf("renWuGuanLi")>0) {//在任务管理下
            this.page = 2
          }else {//在订单管理下
            this.page = 1
          }
        }
        console.log(this.page);
      },

      //获取数据
      getData(type) {
        if(type=='btn'){
          this.pageNum = 1
        }
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
        if(this.userType*1 == 5){
          // url += ("&checkCode=" + this.userName)
        }
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
            let list = res.data.data.resultList
            let userType = this.userType
            for(let i=0;i<list.length;i++){
              if((list[i].taskCommitNum*1 - list[i].taskPassNum*1 - list[i].taskNotPassNum*1) == 0){//已审核 即无需审核
                list[i].btnType = "1"
                if(userType*1 == 5){//审核员
                  list[i].btnType = "11"
                }else if(userType*1 == 9 || userType*1 == 0){//管理员
                  list[i].btnType = "12"
                }
              }
              else {//待审核 和 审核中(审核员工号)
                  if(list[i].checkCode){//有工号就是审核中
                    list[i].btnType = "2"
                    if(userType*1 == 5){//审核员
                      if(this.userName == list[i].checkCode) {//如果是审核员自己那么就可以点击
                        list[i].btnType = "21"
                      }else {//不是他自己就置灰
                        list[i].btnType = "23"
                      }
                    }else if(userType*1 == 9 || userType*1 == 0){//管理员
                      list[i].btnType = "22"
                    }
                  }else {//待审核
                    list[i].btnType = "3"
                    if(userType*1 == 5){//审核员
                      list[i].btnType = "31"
                    }else if(userType*1 == 9 || userType*1 == 0){//管理员
                      list[i].btnType = "32"
                    }
                  }
                }

              if(list[i].taskNum*1==0){
                list[i].zhiXingJinDu = "0.00%"
              }else {
                list[i].zhiXingJinDu = (list[i].taskCommitNum/list[i].taskNum*100).toFixed(2)+'%'
              }

              if(list[i].taskCommitNum*1==0){
                list[i].shenHeJinDu = "0.00%"
              }else {
                list[i].shenHeJinDu = ((list[i].taskPassNum+list[i].taskNotPassNum)/list[i].taskCommitNum*100).toFixed(2)+'%'
              }

              if(list[i].taskPassNum*1+list[i].taskNotPassNum*1 == 0){
                list[i].heGeLv = "0.00%"
              }else {
                list[i].heGeLv = (list[i].taskPassNum/(list[i].taskPassNum+list[i].taskNotPassNum)*100).toFixed(2)+'%'
              }
            }
            this.list = list
          }else {
            alert(res.data.message)
          }
        }).catch((err)=>{
          console.log(err);
        })
      },

      //点击按钮
      checkBtn(type,item) {
        if(type*1 == 1) {//审核员点击领取审核
          let url = "/taskorder/taskorder/check/binding?checkCode=" + this.userName + "&taskOrderNo=" + item.taskOrderNo
          this.$axios.post(url).then(res => {
            if(res.data.status == 200 && res.data.message == "成功"){
              this.$message({
                message: '领取成功！',
                type: 'success'
              });
              if(this.list.length>1){
                this.getData()
              }else {
                this.getData('btn')
              }

              this.$router.push("/dingDan/dingDanGuanLi/renWuGuanLi?taskOrderNo=" + item.taskOrderNo)
            }else {
              alert(res.data.message)
            }
          }).catch((err)=>{
            console.log(err);
          })
        }else if(type*1 == 2){//审核员点击全部通过
          let url = "/task/task/allcheck?checkCode=" + this.userName + "&taskOrderNo=" + item.taskOrderNo
          this.$axios.post(url).then(res => {
            if(res.data.status == 200 && res.data.message == "成功"){
              this.$message({
                message: '设置成功！',
                type: 'success'
              });
              if(this.list.length>1){
                this.getData()
              }else {
                this.getData('btn')
              }
            }else {
              alert(res.data.message)
            }
          }).catch((err)=>{
            console.log(err);
          })
        }
      },

      //点击上键 管理员（领取审核、工号、已审核）都可以进去，审核员（领取审核、工号）
      toRenWuGuanLiPage(item) {
        this.$router.push("/dingDan/dingDanGuanLi/renWuGuanLi?taskOrderNo=" + item.taskOrderNo)
      },

      //复制链接
      copy(text,res) {
        var aux = document.createElement("input");
        aux.setAttribute("value",text);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        if (res == null) {
          this.$message({
            message: '复制成功',
            type: 'success'
          });
        } else{
          this.$message.error('复制失败');
        }
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
              display: inline-block;
              width: 56px;
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
