<style lang="stylus" src="./Project.styl"></style>

<template>
  <div class="section-project">
    <a v-link="{ path: '/' }">Back</a>
    <h1>Project: {{$route.params.id}}</h1>
    <img src="assets/images/yeoman.png">
  </div>
</template>

<script>
import Loader from 'brindille-preloader'

export default {
  data () {
    return {
     
    }
  }
}
</script>
