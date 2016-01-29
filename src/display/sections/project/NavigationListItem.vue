<template>
  <div class="element-navigation-list-item">
    <a v-link="{ name: 'project', params: { id: id }}"><span class="line"></span> <span class="title">{{title}}</span></a>
  </div>
</template>




<script>

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  },
  attached () {

    this.reset()
  },
  detached () {

  },
  methods: {
    /**
    * reset
    */
    reset () {

    }
  }
}
</script>




<style lang="stylus">

@import '../../styles/variables';

.section-project
  .element-navigation-list-item
    position relative
    .line
      display inline-block
      width 35px
      height 1px
      margin-bottom 0.35em
      background-color $color-link
      transform-origin -100% 0
    .title
      position absolute
      display none
</style>