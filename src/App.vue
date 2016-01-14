<style lang="stylus" src="./App.styl"></style>

<template>
  <div id="app">
    <section-preloader v-if="!isHidden"></section-preloader>
    <router-view class="sections" v-if="isLoaded"></router-view>
  </div>
</template>

<script>
import SectionPreloader from './display/sections/Preloader.vue'
import StorePreloader from './store/preloader'

export default {
  components: {
    SectionPreloader
  },

  data () {
    return {
      
    }
  },

  computed: {
    isLoaded () {
      return (StorePreloader.state.progress >= 1)
    },
    isHidden () {
      return StorePreloader.state.isHidden
    }
  },
}
</script>