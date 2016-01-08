<style lang="stylus" src="./Preloader.styl"></style>

<template>
  <div class="component-preloader">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Preloader!'
    }
  }
}
</script>
