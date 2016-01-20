<style lang="stylus">
.section-about 
  position absolute
  z-index 100
  .container
    position absolute
    top 0
  .background
    position absolute
    top 0
    z-index -1
    width 100%
    height 100%
    background-color #000
</style>

<template>
  <div class="section-about">
  	<a @click="open">[About]</a>
  	<aside v-el:container class="container" v-show="isOpen" transition='about'>
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
      
    },
    /**
    * show
    */
    show () {

      //

    },
    /**
    * hide
    */
    hide () {

      //
      
    }
  }
}

Vue.transition('about', {
  css: false,
  enter: function(el, done) {

    Animate(el, 
      { opacity: [.8, "easeInSine", 0] }, 
      { duration: 400, complete: () => { 
        done();
      }}
    ); 
  },
  leave: function(el, done) {

    Animate(el, 
      { opacity: [0, "easeInSine", .8] }, 
      { duration: 400 , complete: () => { 
        done();
      }}
    ); 
  }
})
</script>