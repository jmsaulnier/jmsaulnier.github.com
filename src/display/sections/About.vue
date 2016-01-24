<template>
  <div class="section-about">
  	<aside v-el:content class="content" v-show="isOpen" transition='section-about-content'> 		
    	<div v-el:background @click="close" class="background"></div>
      <div v-el="container" class="container">
        ... Blablabla
      </div>
  	</aside>
    <a v-el:open-button v-show="!isOpen" class="open-button" @click="open" transition='section-about-open-button'> &#8212; About</a>
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

      Css(this.$els.content, { width: Resize.width, height: Resize.height });
      Css(this.$els.openButton, { top: Resize.width * 0.02, left: Resize.width * 0.02 });
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
========== TRANSITION - section-about-open
**/

Vue.transition('section-about-open-button', {
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
========== TRANSITION - section-about-container
**/

Vue.transition('section-about-content', {
  css: false,
  enter: function(el, done) {

    Css(el, {opacity: 0})

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
@import '../styles/variables';

.section-about 
  position absolute
  z-index('.section-about')
  color #000

  .open-button
    display inline-block
    position absolute
    top 0
    font-size 0.9em
    white-space nowrap
    cursor pointer 

  .content,
    position relative

  .container
    position relative

  .background
    position absolute
    top 0
    width 100%
    height 100%
    background-color #fff
</style>