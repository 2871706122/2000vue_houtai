<template>
  <div class="login">
    <div class="top">
      <div class="logo"></div>
    </div>

    <div class="content">
      <div class="row1">账号密码登录</div>

      <el-input v-model="phone" placeholder="请输入工号"></el-input>
      <el-input v-model="pwd" type="password" placeholder="请输入密码"></el-input>

      <el-button @click="login" type="primary">登录</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        phone: "",//账号 admin   123456   type=0 / techServer  qwe123!@#   type=9 /  SH0001   123456  type=5
        pwd: "",//密码
      }
    },
    mounted() {

    },
    methods: {
      //初始化界面
      init() {

      },

      //登录
      login() {
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let fromData = new FormData()
        fromData.append('username', this.phone)
        fromData.append('password', this.pwd)
        let url = "/user/login"
        this.$axios.post(url,fromData,config).then(res => {
          if(res.data.status == 200 && res.data.message == "成功"){
            localStorage.setItem("code",res.data.data.token)
            localStorage.setItem("name",this.phone)
            localStorage.setItem("userType",res.data.data.type)
            if(res.data.data.type*1 == 0){
              this.$router.push("/mainPage")
            }else if(res.data.data.type*1 == 9){
              this.$router.push("/mainPage")
            }else if(res.data.data.type*1 == 5){
              this.$router.push("/dingDan/dingDanGuanLi")
            }

          }else {
            this.$message.error(res.data.message)
            console.log(res.data.message)
          }
        }).catch((err)=>{
          console.log(err);
        })
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
