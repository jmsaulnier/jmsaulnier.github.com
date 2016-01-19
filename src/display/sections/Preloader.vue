<style lang="stylus" src="./Preloader.styl"></style>

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
import Loader from 'brindille-preloader'
import Resize from 'brindille-resize';
import Css from 'dom-css'
import Store from '../../store/preloader'
import Manifest from '../../manifest'

export default {

  data () {

    return {
      
    }
  },
  attached () {
    
    this.reset();
    this.show();
    
    Resize.addListener(this.resize);

    Loader.on('progress', this.loaderProgressHandler);
    Loader.on('complete', this.loaderCompleteHandler);
    Loader.on('error', this.loaderErrorHandler);
    Loader.load(Manifest);

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

      Animate(this.$els.loadingProgress,
        { scaleX: 0 }, 
        { duration: 0 }
      );

    },
    /**
    * resize
    */
    resize () {

      Css(this.$el, { width: Resize.width, height: Resize.height });

    },
    /**
    * show
    */
    show () {

      Animate(this.$els.loading, 
        { opacity: [1, 0] }, 
        { duration: 200 }
      ); 

    },
    /**
    * updateProgress
    */
    updateLoadingProgress (progress, isComplete = false) {

      Store.actions.progressUpdate(progress);    
      
      Animate(this.$els.loadingProgress,
        { scaleX: progress }, 
        { duration: 400, easing: 'easeInOutExpo', queue: false, complete: () => { 
          if(isComplete)
            this.hide() 
        } }
      );

    },
    /**
    * loaderProgressHandler
    */
    loaderProgressHandler (event) {

      this.updateLoadingProgress(event.completedCount / event.totalCount);
    },
    /**
    * loaderCompleteHandler
    */
    loaderCompleteHandler () {

      Loader.off('progress', this.loaderProgressHandler);
      Loader.off('complete', this.loaderCompleteHandler);
      Loader.off('error', this.loaderErrorHandler);

      this.updateLoadingProgress(1, true);
    },
    /**
    * hide
    */
    hide () {

      Animate(this.$els.loading,
        { opacity: 0 }, 
        { duration: 0, delay: 100}
      );

      Animate(this.$els.backgroundBottom,
        { translateY: '100%' }, 
        { duration: 1000, delay: 100, easing: 'easeInOutCubic' }
      );

      Animate(this.$els.backgroundTop,
        { translateY: '-100%' }, 
        { duration: 1000, delay: 100, easing: 'easeInOutCubic', complete: () => { Store.actions.hide() } }
      );
    }
  }
}
</script>
