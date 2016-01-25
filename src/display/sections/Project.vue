<template>
  <section class="section-project">
    <element-details v-if="isDetailsOpen" transition='section-project-element-details'></element-details>
    <div class="element-titles" v-for="project in projects" transition='section-project-element-title'>
      <element-title v-bind:project="project"></element-title>
    </div>
    <element-navigation ></element-navigation>
    <div class="element-sketches" v-for="project in projects" transition='section-project-element-sketch'>
      <element-sketch v-bind:project="project"></element-sketch>
    </div>
  </section>
</template>




<script>
import ElementSketch from './project/Sketch.vue'
import ElementTitle from './project/Title.vue'
import ElementNavigation from './project/Navigation.vue'
import ElementDetails from './project/Details.vue'

import Projects from '../../api/projects'
import Store from '../../store/project'
import StoreAbout from '../../store/about'

export default {

  components: {
    ElementSketch,
    ElementTitle,
    ElementNavigation,
    ElementDetails
  },
  route: {
    data: function (transition) {

      if (Projects[this.$route.params.id]) {

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
  },
  computed: {
    isDetailsOpen () {
      return Store.state.isDetailsOpen
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