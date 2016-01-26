<template>
  <div class="element-navigation">
    <a v-el:next class="next" @click="navigate('next')">
      <span class="label-next">Next project</span> <span class="line-next"></span>
    </a>
    <a v-el:more class="more" @click="showDetails">
      <span class="label-more">View more</span><br /><span class="line-more"></span>
    </a>
  </div>
  <element-navigation-list></element-navigation-list>
</template>




<script>
import Resize from 'brindille-resize'
import Css from 'dom-css'

import ElementNavigationList from './NavigationList.vue'

import { getProject, getIndex } from '../../../api/projects'
import Store from '../../../store/project'

export default {

  components: {
    ElementNavigationList
  },
  attached () {

    this.reset()
    Resize.addListener(this.resize)
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
    },
    /**
    * resize
    */
    resize () {

      /*
      Css(this.$els.previous, {
        top: (Resize.height - this.$els.previous.offsetHeight) * 0.5,
        left: -(this.$els.previous.offsetWidth - this.$els.previous.offsetHeight) * 0.5 + Resize.width * 0.02
      })
      */
      Css(this.$els.next, {
        top: (Resize.height - this.$els.next.offsetHeight) * 0.5,
        left: (Resize.width - (this.$els.next.offsetWidth + this.$els.next.offsetHeight + (this.$els.next.offsetWidth - this.$els.next.offsetHeight)) * 0.5)
      })

      Css(this.$els.more, { width: Resize.width, top: Resize.height - this.$els.more.offsetHeight })

    },
    /**
    * navigate
    */
    navigate (direction) {

      if (direction === 'next') {
        this.$router.go({ name: 'project', params: {id: getProject(getIndex(Store.state.project) + 1)} })
      } else {
        this.$router.go({ name: 'project', params: {id: getProject(getIndex(Store.state.project) - 1)} })
      }

    },
    /**
    * showDetails
    */
    showDetails () {

      Store.actions.openDetails()
    }
  }
}
</script>




<style lang="stylus">

@import '../../styles/variables';

.section-project
  .element-navigation
    text-align center
    a
      position absolute
      z-index('.section-project .element-navigation')
      display inline-block
      font-size 0.6em
      color #fff
      cursor pointer
      text-transform uppercase
      white-space nowrap
    .line-next
      display inline-block
      width 35px
      height 1px
      background-color #fff
      transform-origin -100% 0
    .label-next
      display inline-block
      position relative
      left 42px
      letter-spacing 0.2em
      transform rotate(-90deg)
    .label-more
      display inline-block
      position relative
      top -5px
      font-size 1.2em
      letter-spacing 0.2em
    .line-more
      display inline-block
      width 1px
      height 35px
      background-color #fff
      transform-origin -100% 0
</style>