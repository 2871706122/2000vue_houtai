<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  html,body {
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: black;
    font-size: 14px;
    height: 100%;
    width: 100%;
  }
</style>
