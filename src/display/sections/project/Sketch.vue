<template>
  <div class="element-sketch"></div>
</template>




<script>
import Resize from 'brindille-resize'
import Css from 'dom-css'

import Sketch from '../../3d/project'
import ModelTarget from '../../3d/project/ModelTarget'
import ImageTarget from '../../3d/project/ImageTarget'

export default {

  data () {
    return {
      sketch: null
    }
  },
  attached () {

    this.reset()
    Resize.addListener(this.resize)

    const targetData = [
      {
        type: ImageTarget,
        url: 'assets/images/projects/Mockingjay-logo.png',
        options: {
          size: 2,
          respondsToMouse: true
        }
      },
      {
        type: ModelTarget,
        url: 'assets/images/projects/helmet.json',
        options: {
          color: {
            r: 0.8,
            g: 1,
            b: 1
          },
          scale: 80,
          size: 3,
          respondsToMouse: true
        }
      },
      {
        type: ImageTarget,
        url: 'assets/images/projects/griffin.png',
        options: {
          size: 3,
          respondsToMouse: true
        }
      }
    ]

    this.sketch = new Sketch(this.$el, targetData)
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

      Css(this.$el, { width: Resize.width, height: Resize.height})
    }
  }
}

</script>



<style lang="stylus">

.section-project
  .element-sketch
    canvas
      width 100%
      height 100%

</style>