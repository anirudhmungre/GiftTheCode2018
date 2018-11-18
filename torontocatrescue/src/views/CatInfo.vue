<template>
  <div class="about">
    <md-card class="md-elevation-5">
      <md-card-header>
        <div class="md-title">Cat Info</div>
      </md-card-header>
      <md-card-content>
        {{ id }}
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'CatInfo',
  props: ['id']
}
</script>

<style scoped lang="scss">

</style>
