<template>
  <div class="element-sketch"></div>
</template>




<script>
import Vue from 'vue'
import Animate from 'velocity-animate'
import Resize from 'brindille-resize'
import Css from 'dom-css'

import Loader from '../../sketch/project/loader'

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

    this.reset()
    Resize.addListener(this.resize)

    this.sketch = Loader(this.project, this.$el)
    this.sketch.load()
  },
  detached () {

    Resize.removeListener(this.resize)

    this.sketch.unload()
    this.sketch = null
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

      Css(this.$el, { width: Resize.width, height: Resize.height })
    }
  }
}

/**
========== TRANSITION - project-sketch
**/

Vue.transition('section-project-element-sketch', {
  css: false,
  enter: function (el, done) {

    Animate(el,
      { opacity: [1, 'easeInSine', 0] },
      { duration: 400, complete: () => {
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
</script>




<style lang="stylus">

.section-project
  .element-sketch
    canvas
      width 100%
      height 100%

</style>