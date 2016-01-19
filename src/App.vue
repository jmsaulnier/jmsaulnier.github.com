<style lang="stylus" src="./App.styl"></style>

<template>
  <div id="app">
    <component-footer></component-footer>
    <section-preloader v-if="!isHidden"></section-preloader>
    <router-view class="sections" v-if="isLoaded"></router-view>
    <component-background v-if="isLoaded"></component-background>
  </div>
</template>

<script>
import ComponentFooter from './display/components/Footer.vue'
import ComponentBackground from './display/components/Background.vue'
import SectionPreloader from './display/sections/Preloader.vue'

import StorePreloader from './store/preloader'

export default {
  components: {
    ComponentFooter,
    SectionPreloader,
    ComponentBackground
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