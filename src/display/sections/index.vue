<style lang="stylus" src="./Index.styl"></style>

<template>
  <div class="section-index">
    <h1>{{ msg }}</h1>
    <a v-link="{ path: '/projects/test' }">Work</a>
  </div>
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
