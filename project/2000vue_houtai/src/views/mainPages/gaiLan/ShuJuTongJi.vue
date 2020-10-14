<template>
  <!-- 数据统计 -->
  <div class="ShuJuTongJi">
    <div class="top-title">数据统计</div>
    <div class="content">
      <div class="row1">
        <span></span>
        <div class="item">
          <div class="msg-box">
            <div class="left">
              <span class="tip">进入充值</span>
              <span class="num">{{num1}}</span>
            </div>
            <div class="right">
              <span class="tip">10日环比</span>
              <img class="img" src="@/assets/imgs/u107.svg" alt="">
              <span class="num">{{per1}}</span>
            </div>
          </div>
          <div class="echart" id="echart1"></div>
        </div>
        <span></span>
        <div class="item">
          <div class="msg-box">
            <div class="left">
              <span class="tip">今日消耗</span>
              <span class="num">{{num2}}</span>
            </div>
            <div class="right">
              <span class="tip">10日环比</span>
              <img class="img" src="@/assets/imgs/u107.svg" alt="">
              <span class="num">{{per2}}</span>
            </div>
          </div>
          <div class="echart" id="echart2"></div>
        </div>
        <span></span>
        <div class="item">
          <div class="msg-box">
            <div class="left">
              <span class="tip">今日利润</span>
              <span class="num">{{num3}}</span>
            </div>
            <div class="right">
              <span class="tip">10日环比</span>
              <img class="img" src="@/assets/imgs/u107.svg" alt="">
              <span class="num">{{per3}}</span>
            </div>
          </div>
          <div class="echart" id="echart3"></div>
        </div>
        <span></span>
      </div>

      <div class="row1">
        <span></span>
        <div class="item">
          <div class="msg-box">
            <div class="left">
              <span class="tip">昨日执行</span>
              <span class="num">{{num4}}</span>
            </div>
            <div class="right">
              <span class="tip">10日环比</span>
              <img class="img" src="@/assets/imgs/u107.svg" alt="">
              <span class="num">{{per4}}</span>
            </div>
          </div>
          <div class="echart" id="echart4"></div>
        </div>
        <span></span>
        <div class="item">
          <div class="msg-box">
            <div class="left">
              <span class="tip">昨日审核</span>
              <span class="num">{{num5}}</span>
            </div>
            <div class="right">
              <span class="tip">10日环比</span>
              <img class="img" src="@/assets/imgs/u107.svg" alt="">
              <span class="num">{{per5}}</span>
            </div>
          </div>
          <div class="echart" id="echart5"></div>
        </div>
        <span></span>
        <div class="item">
          <div class="msg-box">
            <div class="left">
              <span class="tip">昨日合格</span>
              <span class="num">{{num6}}</span>
            </div>
            <div class="right">
              <span class="tip">10日环比</span>
              <img class="img" src="@/assets/imgs/u107.svg" alt="">
              <span class="num">{{per6}}</span>
            </div>
          </div>
          <div class="echart" id="echart6"></div>
        </div>
        <span></span>
      </div>

      <div class="row2">
        <div class="item item2">
          <div class="msg-box">
            <div class="left">
              <span class="tip">粉丝统计（15天到昨日）</span>
            </div>
            <div class="right">
              <img class="img2" src="@/assets/imgs/u210.svg" alt="">
              <span>活跃粉丝: {{huoYueFenSi}}</span>
            </div>
          </div>
          <div class="echart" id="echart7"></div>
        </div>
        <div class="right">
          <div class="item">
            <div class="msg-box">
              <div class="left">
                <span class="tip">昨日订单数</span>
                <span class="num">{{num8}}</span>
              </div>
              <div class="right">
                <span class="tip">10日环比</span>
                <img class="img" src="@/assets/imgs/u107.svg" alt="">
                <span class="num">{{per8}}</span>
              </div>
            </div>
            <div class="echart" id="echart8"></div>
          </div>
          <div class="item item3">
            <div class="msg-box">
              <div class="left">
                <span class="tip">昨日订单量</span>
                <span class="num">{{num9}}</span>
              </div>
              <div class="right">
                <span class="tip">10日环比</span>
                <img class="img" src="@/assets/imgs/u107.svg" alt="">
                <span class="num">{{per9}}</span>
              </div>
            </div>
            <div class="echart" id="echart9"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ShuJuTongJi",
    props: [],
    components: {},
    computed: {},
    watch: {},
    data() {
      return {
        num1:"30,200",
        num2:"30,200",
        num3:"30,200",
        num4:"30,200",
        num5:"30,200",
        num6:"30,200",
        num7:"30,200",
        num8:"30,200",
        num9:"30,200",

        per1:"5%",
        per2:"5%",
        per3:"5%",
        per4:"5%",
        per5:"5%",
        per6:"5%",
        per7:"5%",
        per8:"5%",
        per9:"5%",

        huoYueFenSi:"阿木"
      }
    },
    created() {
    },
    mounted() {
      this.init()
      this.getData()
      this.renderEcharts()
    },
    methods: {
      //初始化界面
      init() {

      },

      //获取数据
      getData() {

      },

      renderEcharts(){
        let option = {
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '20',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220]
            }
          ]
        }
        var myChart1 = this.$echarts.init(document.getElementById('echart1'));
        myChart1.setOption(option);

        var myChart2 = this.$echarts.init(document.getElementById('echart2'));
        myChart2.setOption(option);

        var myChart3 = this.$echarts.init(document.getElementById('echart3'));
        myChart3.setOption(option);

        var myChart4 = this.$echarts.init(document.getElementById('echart4'));
        myChart4.setOption(option);

        var myChart5 = this.$echarts.init(document.getElementById('echart5'));
        myChart5.setOption(option);

        var myChart6 = this.$echarts.init(document.getElementById('echart6'));
        myChart6.setOption(option);


        let option7 = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:20,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [220, 182, 191, 234, 290, 330, 310]
            },
          ]
        };
        var myChart7 = this.$echarts.init(document.getElementById('echart7'));
        myChart7.setOption(option7);

        var myChart8 = this.$echarts.init(document.getElementById('echart8'));
        myChart8.setOption(option);

        var myChart9 = this.$echarts.init(document.getElementById('echart9'));
        myChart9.setOption(option);
      }
    },
    beforeDestroy() {
    }
  }
</script>

<style scoped lang="scss">
  .ShuJuTongJi {
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
      box-sizing: border-box;
      border: 5px solid rgb(245,247,250);
      display: flex;
      flex-direction: column;

      .row1 {
        margin-top: 5px;
        margin-bottom: 5px;
        flex: 1;
        display: grid;
        grid-template-columns: 5px 1fr 15px 1fr 15px 1fr 5px;

        .item {
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 6px;
          box-shadow: 2px 2px 1px #ccc;
          display: flex;
          flex-direction: column;

          .msg-box {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
              display: flex;
              align-items: center;
              .tip {
                font-size: 14px;
              }

              .num {
                font-size: 18px;
                margin-left: 20px;
                font-weight: 500;
              }
            }

            .right {
              display: flex;
              align-items: center;
              .tip {
                font-size: 14px;
                color: #ccc;
              }

              .img {
                margin-left: 10px;
                display: inline-block;
                width: 6px;
                height: 8px;
              }

              .num {
                font-size: 16px;
                font-weight: 500;
                margin-left: 10px;
                color: aquamarine;
              }
            }
          }

          .echart {
            flex: 1;
          }
        }
      }

      .row2 {
        margin: 5px;
        flex: 2;
        display: flex;


        .item {
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 6px;
          box-shadow: 2px 2px 1px #ccc;
          display: flex;
          flex-direction: column;

          .msg-box {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
              display: flex;
              align-items: center;
              .tip {
                font-size: 14px;
              }

              .num {
                font-size: 18px;
                margin-left: 20px;
                font-weight: 500;
              }
            }

            .right {
              display: flex;
              align-items: center;
              flex-direction: row;
              justify-content: flex-end;
              .tip {
                font-size: 14px;
                color: #ccc;
              }

              .img {
                margin-left: 10px;
                display: inline-block;
                width: 6px;
                height: 8px;
              }

              .img2 {
                margin-right: 2px;
                display: inline-block;
                width: 12px;
                height: 12px;
              }

              .num {
                font-size: 16px;
                font-weight: 500;
                margin-left: 10px;
                color: aquamarine;
              }
            }
          }

          .echart {
            flex: 1;
          }
        }

        .item2 {
          width: calc(65% - 10px);
        }

        .right {
          margin-left: 15px;
          flex: 1;
          display: flex;
          flex-direction: column;

          .item {
            padding: 15px;
            flex: 1;
            border: 1px solid #ccc;
            border-radius: 6px;
            box-shadow: 2px 2px 1px #ccc;
            display: flex;
            flex-direction: column;

            .echart {
              flex: 1;
            }
          }

          .item3 {
            margin-top: 15px;
          }
        }
      }
    }
  }
</style>
