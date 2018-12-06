<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <GameField />
  </div>
</template>

<script>
import GameField from './components/GameField.vue';

export default {
  name: 'app',
  components: {
    GameField,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  // background-color: black;
}
</style>
