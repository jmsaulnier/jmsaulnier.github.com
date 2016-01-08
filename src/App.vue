<style lang="stylus" src="./App.styl"></style>

<template>
  <div id="app">
    <preloader v-if="!isHidden"></preloader>
    <router-view class="sections" v-if="isLoaded"></router-view>
  </div>
</template>

<script>
import Preloader from './display/components/Preloader.vue'
import Store from './store/preloader'

export default {
  components: {
    Preloader
  },

  data () {
    return {
      
    }
  },

  computed: {
    isLoaded () {
      return (Store.state.progress >= 1)
    },
    isHidden () {
      return Store.state.isHidden
    }
  },
}
</script>