<template>
  <div class="element-navigation-list">
    <div class="item" v-for="project in projects">
      <element-navigation-list-item  v-bind:id="$key" v-bind:title="project.title"></element-navigation-list-item>
    </div>
  </div>
</template>




<script>
import Resize from 'brindille-resize'
import Css from 'dom-css'

import ElementNavigationListItem from './NavigationListItem.vue'

import { data } from '../../../api/projects'
// import Store from '../../../store/project'

export default {
  components: {
    ElementNavigationListItem
  },
  data () {
    return {
      projects: data
    }
  },
  attached () {

    this.reset()
    Resize.addListener(this.resize)
  },
  detached () {

    Resize.removeListener(this.resize)
  },
  methods: {
    /**
    * reset
    */
    reset () {

      this.resize()
    },
    /**
    * resize
    */
    resize () {

      Css(this.$el, {
        top: (Resize.height - this.$el.offsetHeight) * 0.5
      })
    }
  }
}
</script>




<style lang="stylus">

@import '../../styles/variables';

.section-project
  .element-navigation-list
    position absolute
    z-index('.section-project .element-navigation')
</style>