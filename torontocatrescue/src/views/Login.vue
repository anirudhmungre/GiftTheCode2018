<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <img src="../assets/logo_colour.png">
        <div class="md-title">Toronto Cat Rescue</div>
        <div class="md-body-1">login to the admin portal</div>
      </div>
      <form class="form" v-on:submit.prevent="auth">
        <md-field>
          <label>Username</label>
          <md-input v-model="login.username" autofocus></md-input>
        </md-field>
        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>
      </form>
      <div class="actions md-layout md-alignment-center-space-between">
        <a href="/resetpassword">Reset password</a>
        <md-button class="md-raised md-primary" @click="auth">Log in</md-button>
      </div>
      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>
    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import axios from 'axios'
import sha256 from 'sha256'

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      login: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    auth() {
      this.loading = true
      let hashedPass = sha256(this.login.password)
      console.log(hashedPass)
      axios.post("/user/auth", {
        username: this.login.username,
        password: hashedPass
      })
      .then(response => {
        console.log(response)
        if (response.data.data) {
          if (response.data.data.auth) {
            this.loading = false
            this.$router.push("/dashboard")
          } else {
            this.loading = false
            console.log("INVALID LOGIN STUFF")
          }
        } else {
          console.log("SOMETHING IS WRONG")
          this.loading = false
        }
      })
      .catch(e => {
        console.error(e)
      })
    }
  }
}
</script>

<style lang="scss">
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .background {
    background: rgb(240, 240, 240);
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>