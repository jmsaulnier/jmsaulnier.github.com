<template>
  <aside class="element-details">
    <div v-el="background" @click="closeDetails" class="background"></div>
    <div v-el="container" class="container">
      [Details]
    </div>
  </aside>
</template>




<script>
import Vue from 'vue'
import Animate from 'velocity-animate'
import Resize from 'brindille-resize';
import Css from 'dom-css'

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

      Css(this.$el, { width: Resize.width, height: Resize.height });

    },
    /**
    * closeDetails
    */
    closeDetails () {

      Store.actions.closeDetails();
      
    }
  }
}

Vue.transition('section-project-element-details', {
  css: false,
  enter: function(el, done) {

    Animate(el.querySelector('.background'), 
      { opacity: [.4, "easeInSine", 0] }, 
      { duration: 400, complete: () => { 
        done();
      }}
    ); 
  },
  leave: function(el, done) {

    Animate(el.querySelector('.background'), 
      { opacity: [0, "easeInSine", .4] }, 
      { duration: 400 , complete: () => { 
        done();
      }}
    ); 
  }
})

</script>




<style lang="stylus">

@import '../../styles/variables';

.section-project
  .element-details
    position absolute
    z-index('.section-project .element-details')

    .container
      position relative
    
    .background
      position absolute
      top 0
      width 100%
      height 100%
      background-color #000
      opacity 0.4

</style>