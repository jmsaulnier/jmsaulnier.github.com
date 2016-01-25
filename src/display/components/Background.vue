<template>
  <div class="component-background" v-bind:style="{ backgroundColor: backgroundColor }"></div>
</template>




<script>
import Resize from 'brindille-resize'
import Css from 'dom-css'

import Projects from '../../api/projects'
import StoreProject from '../../store/project'

export default {
  computed: {
    backgroundColor () {
      return Projects[StoreProject.state.project].backgroundColor
    }
  },
  attached () {

    this.resize()
    Resize.addListener(this.resize)

  },
  detached () {

    Resize.removeListener(this.resize)
  },
  methods: {
    /**
    * resize
    */
    resize () {

      Css(this.$el, { width: Resize.width, height: Resize.height })
    }
  }
}
</script>




<style lang="stylus">
@import '../styles/variables';

.component-background
  position absolute
  top 0
  transition background-color 1000ms linear
</style>