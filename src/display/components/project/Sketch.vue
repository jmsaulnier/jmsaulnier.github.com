<template>
  <canvas class="component-project-sketch"></canvas>
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
    project: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      sketch: null
    }
  },
  attached () {

    this.reset();
    Resize.addListener(this.resize);

    this.sketch = require('../../sketch/project/' + this.project);
  },
  detached () {

    Resize.removeListener(this.resize);

    this.sketch = null;

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

      Css(this.$el, { width: Resize.width, height: Resize.height });

    }
  }
}

/**
========== TRANSITION - project-sketch
**/

Vue.transition('project-sketch', {
  css: false,
  enter: function(el, done) {

    Animate(el, 
      { opacity: [0.7, "easeInSine", 0] }, 
      { duration: 400, complete: () => { 
        done();
      }}
    ); 
  },
  leave: function(el, done) {

    Animate(el, 
      { opacity: [0, "easeInSine", 0.7] }, 
      { duration: 400 , complete: () => { 
        done();
      }}
    ); 
  }
})
</script>




<style lang="stylus">

</style>