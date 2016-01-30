<template>
  <div id="app">
    <section-preloader v-if="!isHidden"></section-preloader>
    <section-about></section-about>
    <router-view class="component-sections" v-if="isLoaded"></router-view>
    <div v-el:background class="component-background" v-show="isLoaded"></div>
  </div>
</template>

<script>
import Resize from 'brindille-resize'
import Css from 'dom-css'

import SectionPreloader from './display/sections/Preloader.vue'
import SectionAbout from './display/sections/About.vue'

import StorePreloader from './store/preloader'

export default {
  components: {
    SectionPreloader,
    SectionAbout
  },

  computed: {
    isLoaded () {
      return (StorePreloader.state.progress >= 1)
    },
    isHidden () {
      return StorePreloader.state.isHidden
    }
  },
  ready () {

    this.resize()
    Resize.addListener(this.resize)

  },
  methods: {
    /**
    * resize
    */
    resize () {

      Css(this.$els.background, { width: Resize.width, height: Resize.height })
    }
  }
}
</script>

<style lang="stylus">
@require 'display/styles/normalize'
@import 'display/styles/variables'

#app
  font 100% $font-content
.component-sections
  position absolute
.component-background
  position absolute
  top 0
  background-color $color-background
</style>