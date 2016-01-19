<style lang="stylus">
.component-background 
  position absolute
  z-index -1
  width 400px
  height 400px
  background-color #c3cca6
</style>

<template>
  <div class="component-background">Background</div>
</template>

<script>
import Resize from 'brindille-resize';
import Css from 'dom-css'

export default {
  data () {
    return {
      
    }
  },
  attached () {

    this.reset();
    this.show();

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
    * show
    */
    show () {
      

    },
    /**
    * hide
    */
    hide () {


    },
  }
}
</script>