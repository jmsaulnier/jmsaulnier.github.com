<style lang="stylus">
.component-project-title
  position absolute
  z-index 10
  text-align center
  color #fff
  font-size 3em
  perspective: 600px;
  h2 
    position relative
    display inline-block
    background-color #000
</style>

<template>
  <span class="component-project-title">
    <h2>{{title}}</h2>
    <h2>{{category}}</h2>
  </span>
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
      title: Projects[this.project].title,
      category: Projects[this.project].category
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

      Css(this.$el, { width: Resize.width, height: Resize.height });

    }
  }
}

Vue.transition('project-title', {
  css: false,
  enter: function(el, done) {

    /*
    Animate(el.querySelector('h2'), 
      { rotateX: [0, "easeInSine", -30] }, 
      { duration: 200 }
    ); 
    */
    Animate(el, 
      { opacity: [1, "easeInSine", 0], translateY: [0, "easeInSine", -Resize.height * 0.1] }, 
      { duration: 400, complete: () => { 
        done();
      }}
    ); 
  },
  leave: function(el, done) {

    /*
    Animate(el.querySelector('h2'), 
      { rotateX: [30, "easeInSine", 0] }, 
      { duration: 400 }
    ); 
    */
    Animate(el, 
      { opacity: [0, "easeInSine", 1], translateY: [Resize.height * 0.1, "easeInSine", 0]  }, 
      { duration: 400 , complete: () => { 
        done();
      }}
    ); 
  }
})
</script>