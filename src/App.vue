<template>
  <div id="app">
    <Bot/>
  </div>
</template>

<script>

import Bot from './components/Bot'
export default {
  name: 'App',
  components: {
    Bot
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
