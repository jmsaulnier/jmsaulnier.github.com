<style lang="stylus">
.section-about
  color #f00
</style>

<template>
  <section class="section-about">
    <h1>{{ msg }}</h1>
  </section>
</template>

<script>
export default {

  data () {
    return {
      msg: 'About!'
    }
  }
}
</script>
