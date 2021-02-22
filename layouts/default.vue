<script>
export default {
  name: 'DefaultLayout'
}
</script>

<template lang="pug">
.layout
  Nuxt

  PortalTarget(name="base" multiple)
</template>

<style lang="stylus">
@import "~assets/stylus/reset"
@import "~assets/stylus/fonts"
</style>
