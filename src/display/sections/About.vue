<template>
  <div class="section-about">
    <aside v-el:content class="content" v-show="isOpen" transition='section-about-content'>
      <div v-el:background class="background"></div>
      <div v-el="container" class="container">
        <a v-el:close-button @click="close" class="close-button" v-show="isOpen" transition='section-about-close-button'>
          Close <span class="line"></span>
        </a>
        ... Blablabla
      </div>
    </aside>
    <a v-el:open-button v-show="!isOpen" class="open-button" @click="open" transition='section-about-open-button'>
      <span class="line"></span> About
    </a>
  </div>
</template>




<script>
import Vue from 'vue'
import Animate from 'velocity-animate'
import Resize from 'brindille-resize'
import Css from 'dom-css'

import Store from '../../store/about'

export default {

  computed: {
    isOpen () {
      return Store.state.isOpen
    }
  },
  attached () {

    this.resize()
    Resize.addListener(this.resize)

  },
  detached () {

    Resize.removeListener(this.resize)

  },
  methods: {
    /**
    * resize
    */
    resize () {

      Css(this.$els.content, { width: Resize.width, height: Resize.height })
      Css(this.$els.openButton, { top: 35 })
      Css(this.$els.closeButton, { top: 35 })
    },
    /**
    * open
    */
    open () {

      Store.actions.open()
    },
    /**
    * close
    */
    close () {

      Store.actions.close()
    }
  }
}

/**
========== TRANSITION - section-about-open-button
**/

Vue.transition('section-about-open-button', {
  css: false,
  enter: function (el, done) {

    Animate(el,
      { opacity: [1, 'easeInSine', 0], translateX: [0, 'easeInSine', -Resize.width * 0.02] },
      { duration: 200, delay: 300, complete: () => {
        done()
      }}
    )
  },
  leave: function (el, done) {

    Animate(el,
      { opacity: [0, 'easeInSine', 1], translateX: [-Resize.width * 0.02, 'easeInSine', 0] },
      { duration: 200, complete: () => {
        done()
      }}
    )
  }
})

/**
========== TRANSITION - section-about-container
**/

Vue.transition('section-about-content', {
  css: false,
  enter: function (el, done) {

    Css(el, { opacity: 0 })

    Animate(el,
      { opacity: [1, 'easeInSine', 0] },
      { duration: 400, delay: 200, complete: () => {
        done()
      }}
    )
  },
  leave: function (el, done) {

    Animate(el,
      { opacity: [0, 'easeInSine', 1] },
      { duration: 400, complete: () => {
        done()
      }}
    )
  }
})

/**
========== TRANSITION - section-about-close-button
**/

Vue.transition('section-about-close-button', {
  css: false,
  enter: function (el, done) {

    Animate(el,
      { opacity: [1, 'easeInSine', 0], translateX: [0, 'easeInSine', Resize.width * 0.02] },
      { duration: 200, delay: 300, complete: () => {
        done()
      }}
    )
  },
  leave: function (el, done) {

    Animate(el,
      { opacity: [0, 'easeInSine', 1], translateX: [Resize.width * 0.02, 'easeInSine', 0] },
      { duration: 200, complete: () => {
        done()
      }}
    )
  }
})

</script>




<style lang="stylus">
@import '../styles/variables';

.section-about
  position absolute
  z-index('.section-about')
  color #fff
  .open-button,
  .close-button
    display inline-block
    position absolute
    top 0
    font-size 0.6em
    vertical-align middle
    text-transform uppercase
    letter-spacing 0.2em
    white-space nowrap
    cursor pointer
    .line
      display inline-block
      width 35px
      height 1px
      margin-bottom 0.35em
      background-color #fff
      transform-origin -100% 0
  .close-button
    right 0
  .content
    position relative
  .container
    position relative
  .background
    position absolute
    top 0
    width 100%
    height 100%
    background-color #111
</style>