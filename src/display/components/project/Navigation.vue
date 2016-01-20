<style lang="stylus">
.component-project-navigation
  a 
    position absolute
    z-index 20
    display inline-block
    padding 0.4em
    color #000
    border 1px solid #000
    cursor pointer
  .previous
    transform: rotate(-90deg);
  .next 
    transform: rotate(90deg);    
</style>

<template>
  <div class="component-project-navigation">
    <a v-el:previous class="previous" @click="navigate('previous')">Previous</a>
    <a v-el:next class="next" @click="navigate('next')">Next</a>
  </div>
</template>

<script>
import Animate from 'velocity-animate'
import Resize from 'brindille-resize';
import Css from 'dom-css'

import Projects from '../../../api/projects'
import Store from '../../../store/project'


export default {

  data () {
    return {
      
    }
  },
  computed: {
    index () {
      return this.getIndex(Store.state.project)
    }
  },
  attached () {

    this.reset();
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

      Css(this.$els.previous, { 
        top: (Resize.height - this.$els.previous.offsetHeight)* .5, 
        left: - (this.$els.previous.offsetWidth - this.$els.previous.offsetHeight) * 0.5 + Resize.width * 0.02
      });

      Css(this.$els.next, { 
        top: (Resize.height - this.$els.next.offsetHeight)* .5, 
        left: (Resize.width - (this.$els.next.offsetWidth + this.$els.next.offsetHeight) * 0.5) - Resize.width * 0.02 
      }); 

    },
    /**
    * navigate
    */
    navigate (direction) {

      if(direction == 'next') {
        this.$router.go({ name: 'project', params: {id: this.getProject(this.index + 1)} })
      } else {
        this.$router.go({ name: 'project', params: {id: this.getProject(this.index - 1)} })
      }

    },
    /**
    * getProject
    */
    getProject (index) {

      var i = 0;
      var project = '';

      if(index > Object.keys(Projects).length) {
        index = 0
      }

      if(index < 0) {
        index = Object.keys(Projects).length - 1
      }

      Object.keys(Projects).forEach(function (key) {
        if( index === i ) { project = key }
        i++
      });

      return project;
    },
    /**
    * getIndex
    */
    getIndex (project) {

      var i = 0;
      var index = 0;

      Object.keys(Projects).forEach(function (key) {
        if( project === key ) { index = i }
        i++
      });

      return index;
    },
  }
}
</script>