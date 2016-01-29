<template>
  <div class="element-sketch"></div>
</template>




<script>
import Resize from 'brindille-resize'
import Css from 'dom-css'

import Sketch from '../../3d/project'

import Store from '../../../store/project'
import { data, getIndex } from '../../../api/projects'

export default {

  data () {
    return {
      sketch: null
    }
  },
  computed: {
    projectIndex () {
      return getIndex(Store.state.project)
    }
  },
  attached () {

    this.reset()
    Resize.addListener(this.resize)

    var targetData = []
    Object.keys(data).forEach(function (key) {
      targetData.push(data[key].sketch)
    })

    this.sketch = new Sketch(this.$el, targetData)
    this.sketch.load(getIndex(Store.state.project))

    this.$watch('projectIndex', function (value) {
      if (this.sketch !== null) {
        this.sketch.setTarget(this.projectIndex)
      }
    })
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

      Css(this.$el, { width: Resize.width, height: Resize.height * 0.6})
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