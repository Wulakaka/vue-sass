<template>
  <div :class="theme">
    <el-radio-group v-model="theme">
      <el-radio-button label="dark-gray"></el-radio-button>
      <el-radio-button label="dark-blue"></el-radio-button>
    </el-radio-group>
    <div class="text">gray</div>
    <div class="text">blue</div>
    <button class="button">button</button>
    <ul>
      <li v-for="i in 10" :key="i">{{i}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: 'dark-gray'
    }
  }
};
</script>
<style lang='scss' scoped>
@use "@/styles/mixins";
.text {
  @include mixins.theme-color(color, mixins.$text-colors)
}
li {
  @include mixins.list
}
</style>