<template>
  <div class="page-container">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import "~vue-material/dist/theme/engine";
  @include md-register-theme("default", (
    primary: #0e4e8b,
    accent: #00ae98
  ));
  @import "~vue-material/dist/theme/all";
</style>