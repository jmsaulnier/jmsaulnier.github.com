<style lang="stylus" src="./Home.styl"></style>

<template>
  <section class="section-index">
    <h1>{{ msg }}</h1>
    <a v-link="{ path: '/projects/test' }">Work</a>
  </section>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome!'
    }
  }
}
</script>
