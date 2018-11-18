<template>
  <div class="catinfo">
    <md-card class="md-card-example md-elevation-5">
      <md-card-area md-inset>
        <!-- <md-card-media md-ratio="16:9">
          <img src="/assets/examples/card-example.jpg" alt="Cat">
        </md-card-media> -->
        <md-card-header>
          <h2 class="md-title">{{ cata.cName }}</h2>
          <div class="md-subhead">
            <md-icon>event</md-icon>
            <span>{{ (new Date(cata.dob).toLocaleDateString()) }}</span>
          </div>
          <div class="md-subhead">
            <md-icon>pets</md-icon>
            <span>{{ cata.breed }}</span>
          </div>
          <div class="md-subhead">
            <md-icon>hdr_weak</md-icon>
            <span>{{ cata.sex }}</span>
          </div>
        </md-card-header>
        <md-card-content>
          {{ cata.behavior }}
        </md-card-content>
      </md-card-area>
      <md-card-content>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CatInfo',
  props: ['id'],
  data: function() {
    return {
      cata: null
    }
  },
  mounted: function() {
    axios
    .post("/cat/gmayg", {
      catId: this.id
    })
    .then(response => {
      this.cata = response.data.data
      console.log(response)
    })
  }
}
</script>

<style scoped lang="scss">

</style>
