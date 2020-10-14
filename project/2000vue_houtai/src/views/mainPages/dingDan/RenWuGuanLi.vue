<template>
  <!-- 任务管理 -->
  <div class="ren-wu-guan-li">
    <div class="top-title">任务管理</div>
    <div class="content">

    </div>
  </div>
</template>

<script>
  export default {
    name: "renWuGuanLi",
    props: [],
    components: {},
    computed: {},
    watch: {},
    data() {
      return {}
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

      }
    },
    beforeDestroy() {
    }
  }
</script>

<style scoped lang="scss">
.ren-wu-guan-li {
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
  }
}
</style>
