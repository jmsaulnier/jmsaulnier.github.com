<template>
  <section class="section-project">
  </section>
</template>




<script>

import { data } from '../../api/projects'
import Store from '../../store/project'
import StoreAbout from '../../store/about'

export default {

  components: {
  },
  route: {
    data: function (transition) {

      if (data[this.$route.params.id]) {

        this.projects.push(this.$route.params.id)

        if (this.projects.length > 1) {

          this.projects.shift()
        }

        Store.actions.update(this.$route.params.id)
      } else {

        transition.redirect('/')
      }

      // if navigate with history (ex: browser back button) > close about panel
      StoreAbout.actions.close()
    }
  },
  data () {
    return {
      projects: []
    }
  }
}

</script>




<style lang="stylus">
@import '../styles/variables';

.section-project
  color #ff0
</style>