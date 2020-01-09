<template>
  <colorlist :colors="colors" />
</template>

<script>
import colorlist from '../components/colorlist'
import { mapGetters } from 'vuex'

export default {
  components: {
    colorlist
  },
  computed: {
    ...mapGetters(['colors'])
  }
}
</script>

<style lang="scss" scope>
@import '../assets/scss/_home.scss';
</style>
