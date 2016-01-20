<style lang="stylus">
.section-project
  color #ff0
  .titles
    position absolute
</style>

<template>
  <section class="section-project">
    <component-project-details v-if="isDetailsOpen" transition='project-details'></component-project-details>
    <div class="titles" v-for="project in projects" transition='project-title'>
      <component-project-title v-bind:project="project"></component-project-title>
    </div>
    <component-project-navigation ></component-project-navigation>
  </section>
</template>

<script>

import ComponentProjectTitle from '../components/project/Title.vue'
import ComponentProjectNavigation from '../components/project/Navigation.vue'
import ComponentProjectDetails from '../components/project/Details.vue'

import Projects from '../../api/projects'
import Store from '../../store/project'
import StoreAbout from '../../store/about'

export default {

  components: {
    ComponentProjectTitle,
    ComponentProjectNavigation,
    ComponentProjectDetails
  },
  route: {
    data: function (transition) {

      if(Projects[this.$route.params.id]) {

        this.projects.push(this.$route.params.id)

        if(this.projects.length > 1) {
          this.projects.shift();
        }

        Store.actions.update(this.$route.params.id)

      } else {

        transition.redirect('/')
        
      }

      // if navigate with history (ex: browser back button) > close about panel
      StoreAbout.actions.close();
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
  },
  attached () {
    
    console.log('attached');

  },
  detached () {

    console.log('detached');

  },
  methods: {
    
  } 
}

</script>
