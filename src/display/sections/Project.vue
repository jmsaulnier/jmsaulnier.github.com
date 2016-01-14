<style lang="stylus" src="./Project.styl"></style>

<template>
  <section class="section-project">
    <a v-link="{ path: '/' }">Back</a>
    <h1>Project: {{$route.params.id}}</h1>
    <img src="assets/images/yeoman.png">
  </section>
</template>

<script>

export default {
  data () {
    return {
     
    }
  }
}
</script>
