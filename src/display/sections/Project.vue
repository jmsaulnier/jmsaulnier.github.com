<style lang="stylus" src="./Project.styl"></style>

<template>
  <section class="section-project">
    <component-project-title></component-project-title>
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

      Store.actions.update(this.$route.params.id)
    }
  },
  data () {
    return {
     
    }
  },
  attached () {
    
    console.log('attached');

  },
  detached () {

    console.log('detached');

  },
}
</script>
