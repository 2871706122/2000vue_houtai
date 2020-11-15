<template>
  <div class="top">
    <div class="left">
      <div class="part1">
        <img class="logo" src="@/assets/imgs/logo.png" alt="">
        <span class="my-title">后台管理系统</span>
      </div>

      <div class="part2">
        <span class="key">账号：</span>
        <span class="my-name">{{myName}}</span>
      </div>
    </div>

    <div class="right">
      <div class="part1">
        <span>时间：</span>
        <span>{{time}}</span>
      </div>
      <div class="exit" @click="exit" title="退出">退出</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "top",
    props: [],
    components: {},
    computed: {},
    watch: {},
    data() {
      return {
        myName:"",
        time:"",
        timer:""
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
        this.myName = localStorage.getItem("name")

        this.timer = setInterval(()=>{
          let time = new Date()
          let y = time.getFullYear()
          let M = time.getMonth() + 1
          if(M<10) {
            M = "0" + M
          }

          let d = time.getDate()
          if(d<10) {
            d = "0" + d
          }

          let h = time.getHours()
          if(h<10) {
            h = "0" + h
          }

          let m = time.getMinutes()
          if(m<10) {
            m = "0" + m
          }

          let s = time.getSeconds()
          if(s<10) {
            s = "0" + s
          }

          this.time = y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s

        },1000)
      },

      //获取数据
      getData() {

      },

      //退出
      exit() {
        this.$router.push("/login")
      }
    },
    beforeDestroy() {
      if(this.timer) {
        clearInterval(this.timer)
      }
    }
  }
</script>

<style scoped lang="scss">
  .top {
    height: 45px;
    background-color: rgba(64, 158, 255, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 0 20px;
    color: white;

    .left {
      display: flex;
      align-items: center;

      .part1 {
        display: flex;
        align-items: center;

        .logo {
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 15px;
        }

        .my-title {
          margin-left: 10px;
          font-size: 18px;
          font-weight: bold;
        }
      }

      .part2 {
        margin-left: 100px;
        display: flex;
        align-items: center;

        .my-name {

        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      
      .exit {
        margin-left: 15px;
        cursor: pointer;
      }
    }
  }
</style>
