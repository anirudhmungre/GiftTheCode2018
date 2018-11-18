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
import axios from 'axios'

export default {
  name: 'CatInfo',
  props: ['id'],
  mounted: function() {
    axios
    .post("/cat/gmayg", {
      catId: this.id
    })
    .then(response => {
      console.log(response)
    })
  }
}
</script>

<style scoped lang="scss">

</style>
