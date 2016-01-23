<template>
  <footer class="component-footer">
    <div v-el:links class="links">
    	<a href='https://twitter.com/jmsaulnier' target='_blank'>Twitter</a> - <a href='https://github.com/jmsaulnier' target='_blank'>Github</a> - <a href='https://ca.linkedin.com/in/jmsaulnier' target='_blank'>Linkedin</a> 
    </div>	
  </footer>
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

      Css(this.$el, { width: Resize.width, top: Resize.height - this.$els.links.offsetHeight });

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




<style lang="stylus">
.component-footer 
  position absolute
  z-index 2000
  .links
    width 100%
    height auto
    padding 0 0 1em 0
    text-align center
    color #000    
  a
    padding 0 0 2px 0
    font-size 0.8em
    color #000
    text-decoration none
    border-bottom 1px solid #000
</style>