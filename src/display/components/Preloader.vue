<style lang="stylus" src="./Preloader.styl"></style>

<template>
  <div class="component-preloader">
    <h1 v-el:title>PRELOADER</h1>
  </div>
</template>

<script>
import Velocity from 'velocity-animate'
import Loader from 'brindille-preloader'
import Resize from 'brindille-resize';
import Css from 'dom-css'
import Store from '../../store/preloader'

const MANIFEST =  [
  { id: 'yeoman', src: 'assets/images/yeoman.png' }
];

export default {

  data () {

    return {
      isReady: false
    }
  },
  attached () {
    
    this.reset();
    this.show();
    
    Resize.addListener(this.resize);

    Loader.on('progress', this.loaderProgressHandler);
    Loader.on('complete', this.loaderCompleteHandler);
    Loader.on('error', this.loaderErrorHandler);
    Loader.load(MANIFEST);

  },
  detached () {

    Resize.removeListener(this.resize);

  },
  computed: {

    progress () {

      return Store.state.progress

    }
  },
  methods: {
    /**
    * reset
    */
    reset () {

      Css(this.$els.title, {opacity: 0 })
      
      this.resize();

    },
    /**
    * resize
    */
    resize () {

      Css(this.$el, { width: Resize.width, height: Resize.height});

    },
    /**
    * show
    */
    show () {

      Velocity(this.$els.title, 
        { opacity: 1 }, 
        { duration: 500, complete: () => { this.isReady = true; this.hide(); } }
      );  

    },
    /**
    * loaderProgressHandler
    */
    loaderProgressHandler (event) {

      Store.actions.progressUpdate(event.completedCount / event.totalCount)

    },
    /**
    * loaderCompleteHandler
    */
    loaderCompleteHandler () {

      Loader.off('progress', this.loaderProgressHandler);
      Loader.off('complete', this.loaderCompleteHandler);
      Loader.off('error', this.loaderErrorHandler);

      Store.actions.progressUpdate(1)

      this.hide();

    },
    /**
    * hide
    */
    hide () {

      if(this.isReady && (Store.state.progress >= 1)) {

        Velocity(this.$els.title, 
          { opacity: 0 }, 
          { duration: 500, delay: 700 }
        );

        Velocity(this.$el,
          { opacity: 0 }, 
          { duration: 1000, delay: 500, complete: () => { Store.actions.hide() } }
        );

      }
    },
  }
}
</script>
