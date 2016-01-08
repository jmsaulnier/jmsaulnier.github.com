<style lang="stylus" src="./App.styl"></style>

<template>
  <div id="app">
    <preloader></preloader>
    <about></about>
    <router-view class="sections"></router-view>
  </div>
</template>

<script>
import About from './display/components/About.vue'
import Preloader from './display/components/Preloader.vue'

export default {
  components: {
    About,
    Preloader
  }
}
</script>