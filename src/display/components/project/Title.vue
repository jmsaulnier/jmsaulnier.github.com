<style lang="stylus">
.component-project-title 
  color #fff
</style>

<template>
  <div class="component-project-title ">Title: {{title}}</div>
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
  computed: {
    title () {

      let t = this.getTitle(Store.state.project)

      return t
    }
  },
  attached () {

    this.reset();
    this.show();

    Resize.addListener(this.resize);

  },
  detached () {

    Resize.removeListener(this.resize);

  },
  methods: {
  	/**
    * getTitle
    */
    getTitle (project) {

      return project.split('-').map(s =>
          s.charAt(0).toUpperCase() + s.slice(1)
      ).join(' ');

    },
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
    /**
    * show
    */
    show () {
      

    },
    /**
    * hide
    */
    hide () {


    },
  }
}
</script>