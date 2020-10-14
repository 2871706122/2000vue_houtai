<template>
  <!-- 订单管理 -->
  <div class="DingDanGuanLi">
    <div class="top-title">订单管理</div>
    <div class="content">
      <div class="row1">
        <div class="part1">
          <el-button @click="shaiXuan(1)">进行中</el-button>
          <el-button @click="shaiXuan(2)">已结束</el-button>
          <el-button @click="shaiXuan(3)">已结算</el-button>
        </div>

        <div class="part2">
          <el-button @click="shaiXuan(4)">无需审核</el-button>
          <el-button @click="shaiXuan(5)">需审核</el-button>
          <el-button @click="shaiXuan(6)">审核中</el-button>
        </div>

        <div class="part3">
          <div class="select-box">
            <el-select v-model="selectVlaue" placeholder="请选择">
              <el-option
                  v-for="item in selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input-box">
            <el-input
                placeholder="请输入内容"
                v-model="inputValue"
                clearable>
            </el-input>
          </div>
          <el-button @click="shaiXuan(7)" type="primary">查询</el-button>
          <el-button @click="shaiXuan(8)">重置</el-button>
        </div>

      </div>

      <div class="row2" v-for="(item,index) in list" :key="index">
        <div class="li1">
          <div class="part1">
            <img class="img" :src="item.img" alt="">
            <span>{{item.name}}</span>
          </div>
          <div class="part2">{{item.phone + "/" + item.openid}}</div>
          <div class="part3">业务员：{{item.yeWuYuan}}</div>
          <div class="part4">业务员手机号：{{item.yeWuYuanPhone}}</div>
          <div class="part5">订单编号：{{item.dingDanBianHao}}</div>
        </div>

        <div class="li2">
          <div class="part1">
            <img class="img" :src="item.img" alt="">
            <span class="my-title">{{item.title}}</span>
          </div>

          <div class="part2">{{item.link}}</div>
          <div class="part3">复制链接</div>
        </div>

        <div class="li3">
          <div class="part1">
            <div class="key-value">订单数量：{{item.num1}}</div>
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
              <span class="num">已执行：{{item.num8}}</span>
            </div>

            <div class="jin-du">
              <span class="key">审核进度</span>
              <div class="line1">
                <div :style="'width:'+item.num6" class="line2-jin-du"></div>
              </div>
              <span class="per">{{item.num6}}</span>
              <span class="num">已执行：{{item.num9}}</span>
            </div>

            <div class="jin-du">
              <span class="key">合格率</span>
              <div class="line1">
                <div :style="'width:'+item.num7" class="line3-jin-du"></div>
              </div>
              <span class="per">{{item.num7}}</span>
              <span class="num">已执行：{{item.num10}}</span>
            </div>
          </div>

          <div class="part3">
            <div class="key-value">创建时间：{{item.createTime}}</div>
            <div class="key-value">开始时间：{{item.startTime}}</div>
            <div class="key-value">结束时间：{{item.endTime}}</div>
            <div class="key-value">结算时间：{{item.jieSuanTime}}</div>
          </div>

          <div class="part4">
            <el-button type="primary" size="small">领取审核</el-button>
            <el-button type="primary" size="small">全部通过</el-button>
          </div>
        </div>
      </div>
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
        selectVlaue: "1",
        selectOptions: [
          {
            value: '1',
            label: '商户昵称'
          }, {
            value: '2',
            label: '商户手机号/编号'
          }, {
            value: '3',
            label: '业务员昵称/手机号'
          }, {
            value: '4',
            label: '订单编号'
          }
        ],
        inputValue: "",//
        list:[],
      }
    },
    created() {
    },
    mounted() {
      this.init()
      this.getData()
    },
    methods: {
      //筛选
      shaiXuan(index) {
        console.log(index);
      },
      //初始化界面
      init() {

      },

      //获取数据
      getData() {
        this.list = [
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
      }
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
      margin-bottom: 20px;
      display: flex;
      align-items: center;

      .part1,.part2,.part3 {
        display: flex;
        align-items: center;
      }

      .part2,.part3 {
        margin-left: 40px;
      }
    }

    .row2 {
      margin-top: 20px;
      border: 1px solid #ccc;

      .li1 {
        display: flex;
        align-items: center;
        line-height: 32px;
        border-bottom: 1px solid #ccc;

        .part1 {
          display: flex;
          align-items: center;

          .img {
            margin: 0 10px;
            display: inline-block;
            width: 20px;
            height: 20px;
          }
        }

        .part2,.part3,.part4 {
          margin-left: 80px;
        }
        
        .part5 {
          padding-right: 10px;
          flex: 1;
          text-align: right;
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
        }
      }

      .li3 {
        display: flex;
        padding: 10px 10px 10px 40px;

        .part1 {
          margin-right: 150px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
        }

        .part2 {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;

          .jin-du {
            display: flex;
            align-items: center;

            .key {
              margin-right: 10px;
              text-align: right;
              width: 60px;
            }

            .per {
              margin: 0 15px;
            }

            .line1 {
              flex: 1;
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
          margin: 0 150px;
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
}
</style>
