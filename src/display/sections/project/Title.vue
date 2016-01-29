<template>
  <span class="element-title">
    <div v-el:container class="container">
      <h2><a @click="openDetails">{{title}}</a></h2>
      <div class="line"></div>
      <h3><a @click="openDetails">{{category}}</a></h3>
    </div>
  </span>
</template>




<script>
import Vue from 'vue'
import Animate from 'velocity-animate'
import Resize from 'brindille-resize'
import Css from 'dom-css'

import { data } from '../../../api/projects'
import Store from '../../../store/project'

export default {

  props: {
    project: {
      type: String,
      required: true
    }
  },
  computed: {
    isDetailsOpen () {
      return Store.state.isDetailsOpen
    }
  },
  data () {
    return {
      title: data[this.project].title,
      category: data[this.project].category
    }
  },
  attached () {

    this.reset()
    Resize.addListener(this.resize)
  },
  detached () {

    Resize.removeListener(this.resize)
  },
  methods: {
    /**
    * reset
    */
    reset () {

      this.resize()

    },
    /**
    * resize
    */
    resize () {

      Css(this.$els.container, {
        top: (Resize.height - this.$els.container.offsetHeight) * 0.5 + Resize.height * 0.25,
        left: (Resize.width - this.$els.container.offsetWidth) * 0.5
      })
    },
    /**
    * openDetails
    */
    openDetails () {

      Store.actions.openDetails()
    },
    /**
    * closeDetails
    */
    closeDetails () {

      Store.actions.closeDetails()
    }
  }
}

/**
========== TRANSITION - project-title
**/

Vue.transition('section-project-element-title', {
  css: false,
  enter: function (el, done) {

    /*
    Animate(el.querySelector('h2'),
      { rotateX: [0, 'easeInSine', -30] },
      { duration: 200 }
    )
    */
    Animate(el,
      { opacity: [1, 'easeInSine', 0], translateY: [0, 'easeInSine', -Resize.height * 0.1] },
      { duration: 400, complete: () => {
        done()
      }}
    )
  },
  leave: function (el, done) {

    /*
    Animate(el.querySelector('h2'),
      { rotateX: [30, 'easeInSine', 0] },
      { duration: 400 }
    )
    */
    Animate(el,
      { opacity: [0, 'easeInSine', 1], translateY: [Resize.height * 0.1, 'easeInSine', 0] },
      { duration: 400, complete: () => {
        done()
      }}
    )
  }
})
</script>




<style lang="stylus">

.section-project
  .element-title
    display flex;
    position: relative;
    justify-content center
    align-items center
    text-align center
    color #ddd
    font-size 3em
    perspective 600px;
    .container
      position absolute
    h2, h3
      position relative
      display inline-block
      white-space nowrap
    h2
      margin-bottom 0.3em
      font-size 1em
      @media screen and (max-width: 40em)
        font-size 0.6em
    h3
      margin-top 0.6em
      font-size 0.5em
      @media screen and (max-width: 40em)
        font-size 0.4em
    h4
      cursor pointer
      font-weight normal
      font-size 0.3em
      @media screen and (max-width: 40em)
        font-size 0.2em
    .line
      background-color #ddd
      height 10px
</style>