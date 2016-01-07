<template>
  <div class="section-work">
    <a v-link="{ path: '/' }">Back</a>
    <h1>{{ msg }} {{$route.params.id}}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Work !'
    }
  }
}
</script>
