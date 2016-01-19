<style lang="stylus" src="./Project.styl"></style>

<template>
  <section class="section-project">
    <div v-el:component-project-title>
      <li v-for="title in titles" transition='project-title'>
        <component-project-title v-bind:title="title"></component-project-title>
      </li>
    </div>
    <a v-link="{ name: 'project', params: { id: 'mockingjay' }}"><img  src="assets/images/yeoman.png" /></a>
    <a v-link="{ name: 'project', params: { id: 'mission-impossible' }}"><img src="assets/images/yeoman.png" /></a>
    <a v-link="{ name: 'project', params: { id: 'into-the-storm' }}"><img src="assets/images/yeoman.png" /></a>
    <a v-link="{ name: 'project', params: { id: 'porsche' }}"><img src="assets/images/yeoman.png" /></a>
    <a v-link="{ name: 'project', params: { id: 'jupiter-ascending' }}"><img src="assets/images/yeoman.png" /></a>
  </section>
</template>

<script>

import ComponentProjectTitle from '../components/project/Title.vue'

import Store from '../../store/project'

export default {

  components: {
    ComponentProjectTitle
  },
  route: {
    data: function (transition) {

      this.titles.push(this.getTitle(this.$route.params.id))

      if(this.titles.length > 1) {
        this.titles.shift();
      }

      Store.actions.update(this.$route.params.id)
    }
  },
  data () {
    return {
      titles: []
    }
  },
  attached () {
    
    console.log('attached');

  },
  detached () {

    console.log('detached');

  },
  methods: {
    /**
    * getTitle
    */
    getTitle (project) {

      return project.split('-').map(s =>
          s.charAt(0).toUpperCase() + s.slice(1)
      ).join(' ');

    }
  } 
}

</script>
