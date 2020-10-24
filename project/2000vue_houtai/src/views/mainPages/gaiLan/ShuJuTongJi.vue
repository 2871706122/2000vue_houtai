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
              <span class="tip">今日充值</span>
              <span class="num">{{ num1 }}</span>
            </div>
            <div class="right">
              <span class="tip">10日环比</span>
              <img class="img" src="@/assets/imgs/u107.svg" alt="">
              <span class="num">{{ per1 }}</span>
            </div>
          </div>
          <div class="echart" id="echart1"></div>
        </div>
        <span></span>
        <div class="item">
          <div class="msg-box">
            <div class="left">
              <span class="tip">今日消耗</span>
              <span class="num">{{ num2 }}</span>
            </div>
            <div class="right">
              <span class="tip">10日环比</span>
              <img class="img" src="@/assets/imgs/u107.svg" alt="">
              <span class="num">{{ per2 }}</span>
            </div>
          </div>
          <div class="echart" id="echart2"></div>
        </div>
        <span></span>
        <div class="item">
          <div class="msg-box">
            <div class="left">
              <span class="tip">今日利润</span>
              <span class="num">{{ num3 }}</span>
            </div>
            <div class="right">
              <span class="tip">10日环比</span>
              <img class="img" src="@/assets/imgs/u107.svg" alt="">
              <span class="num">{{ per3 }}</span>
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
              <span class="num">{{ num4 }}</span>
            </div>
            <div class="right">
              <span class="tip">10日环比</span>
              <img class="img" src="@/assets/imgs/u107.svg" alt="">
              <span class="num">{{ per4 }}</span>
            </div>
          </div>
          <div class="echart" id="echart4"></div>
        </div>
        <span></span>
        <div class="item">
          <div class="msg-box">
            <div class="left">
              <span class="tip">昨日审核</span>
              <span class="num">{{ num5 }}</span>
            </div>
            <div class="right">
              <span class="tip">10日环比</span>
              <img class="img" src="@/assets/imgs/u107.svg" alt="">
              <span class="num">{{ per5 }}</span>
            </div>
          </div>
          <div class="echart" id="echart5"></div>
        </div>
        <span></span>
        <div class="item">
          <div class="msg-box">
            <div class="left">
              <span class="tip">昨日合格</span>
              <span class="num">{{ num6 }}</span>
            </div>
            <div class="right">
              <span class="tip">10日环比</span>
              <img class="img" src="@/assets/imgs/u107.svg" alt="">
              <span class="num">{{ per6 }}</span>
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
              <span>活跃粉丝: {{ huoYueFenSi }}</span>
            </div>
          </div>
          <div class="echart" id="echart7"></div>
        </div>
        <div class="right">
          <div class="item">
            <div class="msg-box">
              <div class="left">
                <span class="tip">昨日订单数</span>
                <span class="num">{{ num8 }}</span>
              </div>
              <div class="right">
                <span class="tip">10日环比</span>
                <img class="img" src="@/assets/imgs/u107.svg" alt="">
                <span class="num">{{ per8 }}</span>
              </div>
            </div>
            <div class="echart" id="echart8"></div>
          </div>
          <div class="item item3">
            <div class="msg-box">
              <div class="left">
                <span class="tip">昨日订单量</span>
                <span class="num">{{ num9 }}</span>
              </div>
              <div class="right">
                <span class="tip">10日环比</span>
                <img class="img" src="@/assets/imgs/u107.svg" alt="">
                <span class="num">{{ per9 }}</span>
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
      days: [],
      days2:[],

      num1: "30,200",
      num2: "30,200",
      num3: "30,200",
      num4: "30,200",
      num5: "30,200",
      num6: "30,200",
      num7: "30,200",
      num8: "30,200",
      num9: "30,200",

      per1: "5%",
      per2: "5%",
      per3: "5%",
      per4: "5%",
      per5: "5%",
      per6: "5%",
      per7: "5%",
      per8: "5%",
      per9: "5%",

      huoYueFenSi: "阿木"
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
      //获取最近10天的日期
      let day = new Date();
      for (let i = 0; i < 10; i++) {
        let day2 = new Date(day);
        day2.setDate(day.getDate() - i);
        let y = day2.getFullYear()
        let m = day2.getMonth() + 1
        m = (m<=9?("0"+m):m)
        let d = day2.getDate()
        d = (d<=9?("0"+d):d)
        day2 = y + "-" + m + "-" + d
        this.days.unshift(day2)
      }

      //获取过去15天的日期
      for (let i = 0; i < 15; i++) {
        let day2 = new Date(day);
        day2.setDate(day.getDate() - i - 1);
        let y = day2.getFullYear()
        let m = day2.getMonth() + 1
        m = (m<=9?("0"+m):m)
        let d = day2.getDate()
        d = (d<=9?("0"+d):d)
        day2 = y + "-" + m + "-" + d
        this.days2.unshift(day2)
      }
    },

    //获取数据
    getData() {
      //今日的
      let url = "/stat/amount"
      this.$axios.get(url).then(res => {
        //console.log(res);
        if (res.data.status == 200 && res.data.message == "成功") {
          this.num1 = res.data.data.recharge.today
          this.per1 = res.data.data.recharge.percent
          let list = res.data.data.recharge.list
          let days = this.days
          let list01 = []
          for(let i=0;i<days.length;i++){
            for(let j=0;j<list.length;j++){
              if(days[i] == list[j].dayTime){
                list01.push(list[j].count)
                break
              }
            }
          }
          this.renderEcharts(0, list01)

          this.num2 = res.data.data.consume.today
          this.per2 = res.data.data.consume.percent
          let list2 = res.data.data.consume.list
          let list02 = []
          for(let i=0;i<days.length;i++){
            for(let j=0;j<list2.length;j++){
              if(days[i] == list2[j].dayTime){
                list02.push(list2[j].count)
                break
              }
            }
          }
          this.renderEcharts(1, list02)

          this.num3 = res.data.data.profit.today
          this.per3 = res.data.data.profit.percent
          let list3 = res.data.data.profit.list
          let list03 = []
          for(let i=0;i<days.length;i++){
            for(let j=0;j<list3.length;j++){
              if(days[i] == list3[j].dayTime){
                list03.push(list3[j].count)
                break
              }
            }
          }
          this.renderEcharts(2, list03)
        } else {
          alert(res.data.message)
        }
      }).catch((err) => {
        console.log(err);
        alert("请求失败")
      })
      //粉丝统计
      let url2 = "/stat/fans"
      this.$axios.get(url2).then(res => {
        console.log(res);
        if (res.data.status == 200 && res.data.message == "成功") {
          // this.num1 = res.data.data.充值.today
          let aliveFsCount = res.data.data.aliveFsCount
          let allFsCount = res.data.data.allFsCount
          let days2 = this.days2
          let list1 = []
          let list2 = []
          for(let i=0;i<days2.length;i++){
            for(let j=0;j<allFsCount.length;j++){
              if(days2[i] == allFsCount[j].dayTime){
                list1.push(allFsCount[j].count)
                break
              }
            }

            for(let j=0;j<aliveFsCount.length;j++){
              if(days2[i] == aliveFsCount[j].dayTime){
                list2.push(aliveFsCount[j].count)
                break
              }
            }
          }
          this.renderEcharts(6,list1,list2)
        } else {
          alert(res.data.message)
        }
      }).catch((err) => {
        console.log(err);
        alert("请求失败")
      })

      //昨日任务统计
      let url3 = "/stat/task"
      this.$axios.get(url3).then(res => {
        console.log(res);
        if (res.data.status == 200 && res.data.message == "成功") {
          // this.num1 = res.data.data.充值.today
          // let aliveFsCount = res.data.data.aliveFsCount
          // let allFsCount = res.data.data.allFsCount
          // let days2 = this.days2
          // let list1 = []
          // let list2 = []
          // for(let i=0;i<days2.length;i++){
          //   for(let j=0;j<allFsCount.length;j++){
          //     if(days2[i] == allFsCount[j].dayTime){
          //       list1.push(allFsCount[j].count)
          //       break
          //     }
          //   }
          //
          //   for(let j=0;j<aliveFsCount.length;j++){
          //     if(days2[i] == aliveFsCount[j].dayTime){
          //       list2.push(aliveFsCount[j].count)
          //       break
          //     }
          //   }
          // }
          // this.renderEcharts(6,list1,list2)
        } else {
          alert(res.data.message)
        }
      }).catch((err) => {
        console.log(err);
        alert("请求失败")
      })

      //订单统计
      let url4 = "/stat/taskOrder"
      this.$axios.get(url4).then(res => {
        //console.log(res);
        if (res.data.status == 200 && res.data.message == "成功") {
          this.num1 = res.data.data.taskNum.today
          this.per1 = res.data.data.taskNum.percent
          let list = res.data.data.taskNum.list
          let days = this.days
          let list1 = []
          for(let i=0;i<days.length;i++){
            for(let j=0;j<list.length;j++){
              if(days[i] == list[j].dayTime){
                list1.push(list[j].count)
                break
              }
            }
          }
          //console.log(list1);
          this.renderEcharts(8, list1)

          this.num2 = res.data.data.taskOrderNum.today
          this.per2 = res.data.data.taskOrderNum.percent
          let list2 = res.data.data.taskOrderNum.list
          let list3 = []
          for(let i=0;i<days.length;i++){
            for(let j=0;j<list2.length;j++){
              if(days[i] == list2[j].dayTime){
                list3.push(list2[j].count)
                break
              }
            }
          }
          //console.log(list3);
          this.renderEcharts(7, list3)
        } else {
          alert(res.data.message)
        }
      }).catch((err) => {
        console.log(err);
        alert("请求失败")
      })
    },

    renderEcharts(index,data1,data2) {
      if (index == 0) {
        let option0 = {
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
              show: false,
              type: 'category',
              data: this.days,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: '今日充值',
              type: 'bar',
              barWidth: '60%',
              data: data1
            }
          ]
        }
        var myChart1 = this.$echarts.init(document.getElementById('echart1'));
        myChart1.setOption(option0);
      }

      if (index == 1) {
        let option1 = {
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
              show: false,
              type: 'category',
              data: this.days,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: '今日消耗',
              type: 'bar',
              barWidth: '60%',
              data: data1
            }
          ]
        }
        var myChart2 = this.$echarts.init(document.getElementById('echart2'));
        myChart2.setOption(option1);
      }

      if (index == 2) {
        let option2 = {
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
              show: false,
              type: 'category',
              data: this.days,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: '今日利润',
              type: 'bar',
              barWidth: '60%',
              data: data1
            }
          ]
        }
        var myChart3 = this.$echarts.init(document.getElementById('echart3'));
        myChart3.setOption(option2);
      }

      if (index == 3) {
        let option3 = {
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
              show: false,
              type: 'category',
              data: this.days,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: '昨日执行',
              type: 'bar',
              barWidth: '60%',
              data: data1
            }
          ]
        }
        var myChart4 = this.$echarts.init(document.getElementById('echart4'));
        myChart4.setOption(option3);
      }

      if (index == 4) {
        let option4 = {
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
              show: false,
              type: 'category',
              data: this.days,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: '昨日审核',
              type: 'bar',
              barWidth: '60%',
              data: data1
            }
          ]
        }
        var myChart5 = this.$echarts.init(document.getElementById('echart5'));
        myChart5.setOption(option4);
      }

      if (index == 5) {
        let option5 = {
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
              show: false,
              type: 'category',
              data: this.days,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: '昨日合格',
              type: 'bar',
              barWidth: '60%',
              data: data1
            }
          ]
        }
        var myChart6 = this.$echarts.init(document.getElementById('echart6'));
        myChart6.setOption(option5);
      }

      if (index == 6) {
        let option7 = {
          tooltip: {
            trigger: 'axis',
            backgroundColor:"#fff",
            textStyle:{color:"#000"}
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: 20,
            containLabel: true
          },
          xAxis: [
            {
              show:false,
              type: 'category',
              boundaryGap: false,
              data: this.days2
            }
          ],
          yAxis: [
            {
              show:false,
              type: 'value'
            }
          ],
          series: [
            {
              name: '活跃粉丝数量',
              type: 'line',
              stack: '总量',
              itemStyle:{
                color:"rgb(47,194,91)",
              },
              areaStyle: {
                color:"rgb(192,237,205)"
              },
              data: data2
            },
            {
              name: '粉丝总数',
              type: 'line',
              stack: '总量',
              itemStyle:{
                normal:{
                  color:"rgb(27,145,254)"
                }
              },
              areaStyle: {
                color:"rgb(185,221,255)"
              },
              data: data1
            },
          ]
        };
        var myChart7 = this.$echarts.init(document.getElementById('echart7'));
        myChart7.setOption(option7);
      }

      if (index == 7) {
        let option7 = {
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
              show: false,
              type: 'category',
              data: this.days,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: '昨日订单数',
              type: 'bar',
              barWidth: '60%',
              data: data1
            }
          ]
        }
        var myChart8 = this.$echarts.init(document.getElementById('echart8'));
        myChart8.setOption(option7);
      }

      if (index == 8) {
        let option8 = {
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
              show: false,
              type: 'category',
              data: this.days,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: '昨日订单量',
              type: 'bar',
              barWidth: '60%',
              data: data1
            }
          ]
        }
        var myChart9 = this.$echarts.init(document.getElementById('echart9'));
        myChart9.setOption(option8);
      }
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
    border: 5px solid rgb(245, 247, 250);
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
