<style lang="stylus" src="./App.styl"></style>

<template>
  <div id="app">
    <about></about>
    <router-view class="sections"></router-view>
  </div>
</template>

<script>
import About from './display/components/About.vue'

export default {
  components: {
    About
  }
}
</script>