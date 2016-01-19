<style lang="stylus">
.section-project
  color #ff0
  .titles
    position absolute
</style>

<template>
  <section class="section-project">
    <div class="titles" v-for="project in projects" transition='project-title'>
      <component-project-title v-bind:project="project"></component-project-title>
    </div>
    <component-project-navigation ></component-project-navigation>
  </section>
</template>

<script>

import ComponentProjectTitle from '../components/project/Title.vue'
import ComponentProjectNavigation from '../components/project/Navigation.vue'

import Projects from '../../api/projects'
import Store from '../../store/project'

export default {

  components: {
    ComponentProjectTitle,
    ComponentProjectNavigation
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
    }
  },
  data () {
    return {
      projects: []
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
