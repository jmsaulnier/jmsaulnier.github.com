<template>
  <div id="app">
    <section-preloader v-if="!isHidden"></section-preloader>
    <section-about></section-about>
    <router-view class="sections" v-if="isLoaded"></router-view>
    <component-background v-if="isLoaded"></component-background>
  </div>
</template>

<script>
import ComponentBackground from './display/components/Background.vue'
import SectionPreloader from './display/sections/Preloader.vue'
import SectionAbout from './display/sections/About.vue'

import StorePreloader from './store/preloader'

export default {
  components: {
    SectionPreloader,
    SectionAbout,
    ComponentBackground
  },

  computed: {
    isLoaded () {
      return (StorePreloader.state.progress >= 1)
    },
    isHidden () {
      return StorePreloader.state.isHidden
    }
  }
}
</script>

<style lang="stylus">
@require 'display/styles/normalize';

font-stack = Helvetica, sans-serif
primary-color = #42b983

#app
  font 100% font-stack
  color primary-color
.sections
  position absolute
</style>