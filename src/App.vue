<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ThemeTest></ThemeTest>
    <ThemePicker></ThemePicker>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import ThemeTest from "./components/ThemeTest.vue";
import ThemePicker from "./components/ThemePicker.vue";

export default {
  name: "App",
  components: {
    ThemeTest,
    ThemePicker,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
