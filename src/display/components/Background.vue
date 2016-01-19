<style lang="stylus">
.component-background 
  position absolute
  z-index -1
  transition: background-color 1000ms linear;
</style>

<template>
  <div class="component-background" v-bind:style="{ backgroundColor: backgroundColor }"></div>
</template>

<script>
import Resize from 'brindille-resize';
import Css from 'dom-css'

import Projects from '../../api/projects'
import StoreProject from '../../store/project'

export default {
  data () {
    return {
      
    }
  },
  computed: {
    backgroundColor () {
      return Projects[StoreProject.state.project].backgroundColor
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