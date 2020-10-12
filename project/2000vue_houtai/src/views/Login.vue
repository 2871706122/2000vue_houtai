<template>
  <div class="login" ref="login">
    <div class="top">
      <div class="logo"></div>
    </div>

    <div class="content">
      <div class="row1">账号密码登录</div>

      <el-input v-model="phone" placeholder="请输入手机号"></el-input>
      <el-input v-model="pwd" placeholder="请输入密码"></el-input>

      <el-button @click="login" type="primary">登录</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        phone: "",//手机号
        pwd: "",//密码
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      //初始化界面
      init() {
        this.$nextTick(() => {
          this.$refs.login.style.height = document.body.clientHeight + "px"
        })
      },

      //登录
      login() {
        this.$router.push("/mainPage")
      }
    },
  }
</script>

<style scoped lang="scss">
  .login {
    background-color: rgba(245, 247, 250, 1);
    height: 100%;
    display: flex;
    flex-direction: column;

    .top {
      height: 45px;
      background-color: rgba(64, 158, 255, 1);

      .logo {
        margin-top: 7px;
        margin-left: 40px;
        display: inline-block;
        width: 30px;
        height: 30px;
        background-color: #fff;
        border-radius: 15px;
      }
    }

    .content {
      display: inline-block;
      width: 370px;
      height: 420px;
      margin-top: 150px;
      margin-left: calc(50% - 185px);
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.0980392156862745);
      font-size: 14px;
      color: #303133;
      padding: 50px;

      .row1 {
        font-size: 20px;
        color: #606266;
        text-align: center;
      }

      /deep/ .el-input__inner {
        margin-top: 40px;
      }

      /deep/ .el-button {
        margin-top: 50px;
        width: 100%;
      }
    }
  }
</style>
