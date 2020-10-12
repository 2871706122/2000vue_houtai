<template>
  <div class="top">
    顶部
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
  .top {
    height: 45px;
    background-color: rgba(64, 158, 255, 1);
  }
</style>
