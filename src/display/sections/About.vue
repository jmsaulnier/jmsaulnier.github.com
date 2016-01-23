<template>
  <div class="section-about">
  	<a v-el:open v-show="!isOpen" class="open" @click="open" transition='about-open'> &#8212; About</a>
  	<aside v-el:container class="container" v-show="isOpen" transition='about-container'>
  		... Blablabla
    	<div v-el:background @click="close" class="background"></div>
  	</aside>
  </div>
</template>




<script>
import Vue from 'vue'
import Animate from 'velocity-animate'
import Resize from 'brindille-resize';
import Css from 'dom-css'

import Store from '../../store/about'

export default {
  data () {
    return {
      
    }
  },
  computed: {
    isOpen () {
      return Store.state.isOpen
    }
  },
  attached () {

    this.resize();
    Resize.addListener(this.resize);

  },
  detached () {

    Resize.removeListener(this.resize);

  },
  methods: {
    /**
    * resize
    */
    resize () {

      Css(this.$els.container, { width: Resize.width, height: Resize.height });
      Css(this.$els.open, { top: Resize.width * 0.02, left: Resize.width * 0.02 });
    },
    /**
    * open
    */
    open () {

      Store.actions.open();
      
    },
    /**
    * close
    */
    close () {

      Store.actions.close();
      
    }
  }
}

/**
========== TRANSITION - about-open
**/

Vue.transition('about-open', {
  css: false,
  enter: function(el, done) {

    Animate(el, 
      { opacity: [1, "easeInSine", 0], translateX: [ 0, "easeInSine", - Resize.width * 0.01]  }, 
      { duration: 200, delay: 300, complete: () => { 
        done();
      }}
    ); 
  },
  leave: function(el, done) {

    Animate(el, 
      { opacity: [0, "easeInSine", 1], translateX: [ - Resize.width * 0.01, "easeInSine", 0]  }, 
      { duration: 200, complete: () => { 
        done();
      }}
    ); 
  }
})

/**
========== TRANSITION - about-container
**/

Vue.transition('about-container', {
  css: false,
  enter: function(el, done) {

    Animate(el, 
      { opacity: [0.8, "easeInSine", 0] }, 
      { duration: 400, delay: 200, complete: () => { 
        done();
      }}
    ); 
  },
  leave: function(el, done) {

    Animate(el, 
      { opacity: [0, "easeInSine", 0.8] }, 
      { duration: 400, complete: () => { 
        done();
      }}
    ); 
  }
})
</script>




<style lang="stylus">
.section-about 
  position absolute
  z-index 100
  color #000
  .open
    display inline-block
    position relative
    font-size 0.9em
    cursor pointer 
  .container
    position absolute
    top 0
    opacity 0
  .background
    position absolute
    top 0
    z-index -1
    width 100%
    height 100%
    background-color #fff
</style>