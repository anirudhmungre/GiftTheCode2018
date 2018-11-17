<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <img src="../assets/logo_colour.png">
        <div class="md-title">Toronto Cat Rescue</div>
        <div class="md-body-1">login to the admin portal</div>
      </div>
      <form class="form" v-on:submit.prevent="auth" method="POST" >
        <md-field>
          <label>Username</label>
          <md-input v-model="login.email" autofocus></md-input>
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
      <div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d638.8468381582909!2d-79.36483221438756!3d43.651482150751434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x89d4cb3be80f60ab%3A0x42bc6bb30144c49e!2sThe+Globe+and+Mail+Centre%2C+351+King+St+E+%231600%2C+Toronto%2C+ON+M5A+0N1!3m2!1d43.6513856!2d-79.3643756!4m5!1s0x539ff9a41940041f%3A0xe323899d4b935c12!2sDollarama!3m2!1d43.6511376!2d-79.3650767!5e0!3m2!1sen!2sca!4v1542448128004" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
      </div>
    </md-content>
    <div class="background" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      loading: false,
      login: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    auth() {
      this.loading = true
      setTimeout(() => {
        console.log()
        this.loading = false
        this.$router.push("/dashboard")
      }, 2000)
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