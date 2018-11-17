<template>
  <div class="home">
      <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <span class="md-title">Toronto Cat Rescue</span>
      </md-app-toolbar>
      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <img src="../assets/logo_colour.png" />
        </md-toolbar>
        <md-list>
          <router-link to="/dashboard">
            <md-list-item>
              <md-icon>home</md-icon>
              <span class="md-list-item-text">Home</span>
            </md-list-item>
          </router-link>
          <router-link to="/dashboard/cats">
            <md-list-item>
              <md-icon>pets</md-icon>
              <span class="md-list-item-text">All Cats</span>
            </md-list-item>
          </router-link>
          <router-link to="/dashboard/about">
            <md-list-item>
              <md-icon>info</md-icon>
              <span class="md-list-item-text">About</span>
            </md-list-item>
          </router-link>
          <router-link to="/dashboard/user">
            <md-list-item>
              <md-icon>person</md-icon>
              <span class="md-list-item-text">User</span>
            </md-list-item>
          </router-link>
        </md-list>
      </md-app-drawer>
      <md-app-content md-height="100vh">
        <router-view name="content"></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'Default'
}
</script>

<style lang="scss" scoped>
  .md-app {
    height: 100vh;
  }

  .md-app-content {
    background: rgb(236, 236, 236);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  img {
    padding: 1em;
  }
</style>
