<template>
  <div class="section-index">
    <h1>{{ msg }}</h1>
    <a v-link="{ path: '/work/test' }">Work</a>
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
