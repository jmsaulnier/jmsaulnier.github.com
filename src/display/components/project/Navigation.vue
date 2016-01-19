<style lang="stylus">
.component-project-navigation
  position absolute
  z-index 20
</style>

<template>
  <div class="component-project-navigation">
    <a v-link="{ name: 'project', params: { id: 'mockingjay' }}"><img  src="assets/images/yeoman.png" /></a>
    <a v-link="{ name: 'project', params: { id: 'mission-impossible' }}"><img src="assets/images/yeoman.png" /></a>
    <a v-link="{ name: 'project', params: { id: 'into-the-storm' }}"><img src="assets/images/yeoman.png" /></a>
    <a v-link="{ name: 'project', params: { id: 'magic-mirror' }}"><img src="assets/images/yeoman.png" /></a>
    <a v-link="{ name: 'project', params: { id: 'caines-quest' }}"><img src="assets/images/yeoman.png" /></a>
    <a v-link="{ name: 'project', params: { id: 'edge-of-tomorrow' }}"><img src="assets/images/yeoman.png" /></a>
  </div>
</template>

<script>
import Animate from 'velocity-animate'
import Resize from 'brindille-resize';
import Css from 'dom-css'

import Projects from '../../../api/projects'
import Store from '../../../store/project'


export default {

  data () {
    return {
      
    }
  },
  attached () {

    this.reset();
    Resize.addListener(this.resize);

  },
  detached () {

    Resize.removeListener(this.resize);

  },
  methods: {
    /**
    * reset
    */
    reset () {

      this.resize();

    },
    /**
    * resize
    */
    resize () {

      //Css(this.$el, { width: Resize.width, height: Resize.height });

    },
  }
}
</script>