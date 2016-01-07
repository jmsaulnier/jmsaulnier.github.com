<template>
  <div id="app">
    <hello></hello>
    <router-view class="sections"></router-view>
  </div>
</template>

<script>
import Hello from './display/components/Hello.vue'

export default {
  components: {
    Hello
  }
}
</script>

<style>

[v-cloak] {
  display: none;
}

body {
  font-family: Helvetica, sans-serif;
}
</style>
