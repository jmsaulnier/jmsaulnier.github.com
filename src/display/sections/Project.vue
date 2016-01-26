<template>
  <section class="section-project">
    <div class="element-titles" v-for="project in projects" transition='section-project-element-title'>
      <element-title v-bind:project="project"></element-title>
    </div>
    <element-navigation></element-navigation>
    <div class="element-sketches" v-for="project in projects" transition='section-project-element-sketch'>
      <element-sketch v-bind:project="project"></element-sketch>
    </div>
  </section>
</template>




<script>
import ElementSketch from './project/Sketch.vue'
import ElementTitle from './project/Title.vue'
import ElementNavigation from './project/Navigation.vue'

import { data } from '../../api/projects'
import Store from '../../store/project'
import StoreAbout from '../../store/about'

export default {

  components: {
    ElementSketch,
    ElementTitle,
    ElementNavigation
  },
  route: {
    data: function (transition) {

      if (data[this.$route.params.id]) {

        this.projects.push(this.$route.params.id)

        if (this.projects.length > 1) {

          this.projects.shift()
        }

        Store.actions.update(this.$route.params.id)
      } else {

        transition.redirect('/')
      }

      // if navigate with history (ex: browser back button) > close about panel
      StoreAbout.actions.close()
    }
  },
  data () {
    return {
      projects: []
    }
  }
}

</script>




<style lang="stylus">
@import '../styles/variables';

.section-project
  color #ff0
  .element-titles
    position absolute
    z-index('.section-project .element-titles')
  .element-sketches
    position absolute
    z-index('.section-project .element-sketches')
</style>