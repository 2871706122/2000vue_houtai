<template>
  <div class="main-pages">
    <Top></Top>
    <div class="content">
      <div class="left">
        <el-menu
            class="el-menu-vertical-demo"
            :unique-opened="true"
            :default-active="active"
            :default-openeds="openeds"
            @open="handleOpen"
            @select="handleSelect">
          <el-submenu index="0">
            <template slot="title">
              <i class="el-icon-location"></i>概览
            </template>
            <el-menu-item index="0-0"><i class="el-icon-location"></i>数据统计</el-menu-item>
          </el-submenu>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>伙伴
            </template>
            <el-menu-item index="1-0"><i class="el-icon-location"></i>团长管理</el-menu-item>
            <el-menu-item index="1-1"><i class="el-icon-location"></i>业务管理</el-menu-item>
            <el-menu-item index="1-2"><i class="el-icon-location"></i>客户管理</el-menu-item>
            <el-menu-item index="1-3"><i class="el-icon-location"></i>粉丝管理</el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>订单
            </template>
            <el-menu-item index="2-0"><i class="el-icon-location"></i>订单管理</el-menu-item>
            <el-menu-item index="2-1"><i class="el-icon-location"></i>任务管理</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>系统
            </template>
            <el-menu-item index="3-0"><i class="el-icon-location"></i>资金管理</el-menu-item>
            <el-menu-item index="3-1"><i class="el-icon-location"></i>价格管理</el-menu-item>
            <el-menu-item index="3-2"><i class="el-icon-location"></i>账号管理</el-menu-item>
          </el-submenu>

        </el-menu>
      </div>
      <div class="right">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "@/components/Top"

export default {
  name: 'mainPages',
  components: {
    Top
  },
  data(){
    return {
      active:"0-0",//当前选择导航
      openeds:["0"],//当前打开的导航组
    }
  },
  created() {
    this.init()
  },
  mounted() {

  },
  methods:{
    //初始化导航栏
    init() {
      let meta = this.$route.meta
      //console.log(meta);
      this.openeds = [meta[0]+""]
      this.active = meta[0] + "-" + meta[1]
    },

    //打开列表
    handleOpen(key, keyPath) {
      // console.log(key);
      // console.log(keyPath);

      if(key*1 == 0 && this.$route.path != "/gaiLan/shuJuTongJi"){
        this.$router.push("/gaiLan/shuJuTongJi")
        this.active = "0-0"
      }else if(key*1 == 1 && this.$route.path != "/huoBan/tuanZhangGuanLi"){
        this.$router.push("/huoBan/tuanZhangGuanLi")
        this.active = "1-0"
      }else if(key*1 == 2 && this.$route.path != "/dingDan/dingDanGuanLi"){
        this.$router.push("/dingDan/dingDanGuanLi")
        this.active = "2-0"
      }else if(key*1 == 3 && this.$route.path != "/xiTong/dingDanGuanLi"){
        this.$router.push("/xiTong/dingDanGuanLi")
        this.active = "3-0"
      }
    },

    //选择列表项
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
      if(key.slice(0,1)*1 == 0 && key.slice(2,3)*1 == 0 && this.$route.path != "/gaiLan/shuJuTongJi"){
        this.$router.push("/gaiLan/shuJuTongJi")
      }

      else

      if(key.slice(0,1)*1 == 1 && key.slice(2,3)*1 == 0 && this.$route.path != "/huoBan/tuanZhangGuanLi"){
        this.$router.push("/huoBan/tuanZhangGuanLi")
      }

      else

      if(key.slice(0,1)*1 == 1 && key.slice(2,3)*1 == 1 && this.$route.path != "/huoBan/yeWuGuanLi"){
        this.$router.push("/huoBan/yeWuGuanLi")
      }

      else

      if(key.slice(0,1)*1 == 1 && key.slice(2,3)*1 == 2 && this.$route.path != "/huoBan/keHuGuanLi"){
        this.$router.push("/huoBan/keHuGuanLi")
      }

      else

      if(key.slice(0,1)*1 == 1 && key.slice(2,3)*1 == 3 && this.$route.path != "/huoBan/fenSiGuanLi"){
        this.$router.push("/huoBan/fenSiGuanLi")
      }

      else

      if(key.slice(0,1)*1 == 2 && key.slice(2,3)*1 == 0 && this.$route.path != "/dingDan/dingDanGuanLi"){
        this.$router.push("/dingDan/dingDanGuanLi")
      }

      else

      if(key.slice(0,1)*1 == 2 && key.slice(2,3)*1 == 1 && this.$route.path != "/dingDan/renWuGuanLi"){
        this.$router.push("/dingDan/renWuGuanLi")
      }

      else

      if(key.slice(0,1)*1 == 3 && key.slice(2,3)*1 == 0 && this.$route.path != "/xiTong/dingDanGuanLi"){
        this.$router.push("/xiTong/dingDanGuanLi")
      }

      else

      if(key.slice(0,1)*1 == 3 && key.slice(2,3)*1 == 1 && this.$route.path != "/xiTong/renWuGuanLi"){
        this.$router.push("/xiTong/renWuGuanLi")
      }

      else

      if(key.slice(0,1)*1 == 3 && key.slice(2,3)*1 == 2 && this.$route.path != "/xiTong/zhangHaoGuanLi"){
        this.$router.push("/xiTong/zhangHaoGuanLi")
      }

    }
  }
}
</script>

<style scoped lang="scss">
  .main-pages {
    .content {
      display: flex;

      .left {
        width: 220px;
      }

      .right {
        flex: 1;
      }
    }
  }
</style>
