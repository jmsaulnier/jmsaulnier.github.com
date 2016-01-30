<template>
  <section class="section-preloader">
    <div v-el:loading class="loading">
      <div v-el:loading-progress class="loading-progress"></div>
    </div>
    <div v-el:background-top class="background-top"></div>
    <div v-el:background-bottom class="background-bottom"></div>
  </section>
</template>




<script>
import Animate from 'velocity-animate'
import Loader from 'preloader'
import Resize from 'brindille-resize'
import Css from 'dom-css'
import Store from '../../store/preloader'

import { data } from '../../api/projects'

export default {

  attached () {

    this.reset()
    this.show()

    Resize.addListener(this.resize)

    this.loader = new Loader()

    Object.keys(data).forEach(function (key) {
      this.loader.addImage('assets/images/projects/' + key + '.png')
    }.bind(this))

    this.loader.onProgress.add(this.loaderProgressHandler)
    this.loader.onComplete.addOnce(this.loaderCompleteHandler)
    this.loader.load()
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

      Animate(this.$els.loadingProgress,
        { scaleX: 0 },
        { duration: 0 }
      )
    },
    /**
    * resize
    */
    resize () {

      Css(this.$el, { width: Resize.width, height: Resize.height })
    },
    /**
    * show
    */
    show () {

      Animate(this.$els.loading,
        { opacity: [1, 0] },
        { duration: 200 }
      )
    },
    /**
    * updateProgress
    */
    updateLoadingProgress (progress, isComplete = false) {

      Store.actions.progressUpdate(progress)

      Animate(this.$els.loadingProgress,
        { scaleX: progress },
        { duration: 400, easing: 'easeInOutExpo', queue: false, complete: () => {
          if (isComplete) {
            this.hide()
          }
        }}
      )
    },
    /**
    * loaderProgressHandler
    */
    loaderProgressHandler (progress) {

      this.updateLoadingProgress(progress)
    },
    /**
    * loaderCompleteHandler
    */
    loaderCompleteHandler () {

      this.loader.onProgress.remove(this.loaderProgressHandler)
      this.loader = null

      this.updateLoadingProgress(1, true)
    },
    /**
    * hide
    */
    hide () {

      Animate(this.$els.loading,
        { opacity: 0 },
        { duration: 0, delay: 300}
      )

      Animate(this.$els.backgroundBottom,
        { translateY: '100%' },
        { duration: 1000, delay: 300, easing: 'easeInOutCubic' }
      )

      Animate(this.$els.backgroundTop,
        { translateY: '-100%' },
        { duration: 1000, delay: 300, easing: 'easeInOutCubic', complete: () => { Store.actions.hide() } }
      )
    }
  }
}
</script>




<style lang="stylus">
@import '../styles/variables';

.section-preloader
  position absolute
  z-index('.section-preloader')
  .background-top,
  .background-bottom
    width 100%
    height 50%
    background-color #fff
  .loading
    position absolute
    z-index 1
    top: 50%
    width 100%
    height 1px
    background-color #ccc
  .loading-progress
    width 100%
    height 100%
    background-color #333
    transform-origin 0 0
</style>
