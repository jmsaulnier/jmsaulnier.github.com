<style lang="stylus">
.component-project-title 
  color #fff
</style>

<template>
  <div class="component-project-title">Title: {{title}}</div>
</template>

<script>

import Vue from 'vue'
import Animate from 'velocity-animate'
import Resize from 'brindille-resize';
import Css from 'dom-css'

import Projects from '../../../api/projects'
import Store from '../../../store/project'


export default {

  props: {
    title: {
      type: String,
      required: true
    }
  },

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

Vue.transition('project-title', {
  css: false,
  enter: function(el, done) {

    Animate(el, 
      { opacity: [1, 0] }, 
      { duration: 400, complete: () => { 
        done();
      }}
    ); 
  },
  leave: function(el, done) {
    Animate(el, 
      { opacity: [0, 1] }, 
      { duration: 800 , complete: () => { 
        done();
      }}
    ); 
  }
})
</script>