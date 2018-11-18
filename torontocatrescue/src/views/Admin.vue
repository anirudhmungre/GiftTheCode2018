<template>
  <div class="admin">
    <div class="md-layout md-alignment-center-center">
       <div class="md-layout-item md-size-90">
        <md-card class="md-elevation-5 ">
          <md-card-header>
            <div class="md-title">Admin</div>
          </md-card-header>
          <md-card-content>
            <md-tabs>
              <md-tab id="tab-home" md-label="Home">
                This is the home tab
              </md-tab>
              <md-tab id="tab-pages" md-label="Add New User">
                <form class="md-layout" @submit.prevent="createNewUser">
                  <div class="md-layout-item">
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item md-small-size-100">
                        <md-field>
                          <label for="first-name">First Name</label>
                          <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" />
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100">
                        <md-field>
                          <label for="last-name">Last Name</label>
                          <md-input name="last-name" id="last-name" autocomplete="last-name" v-model="form.lastName" />
                        </md-field>
                      </div>
                    </div>
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item md-small-size-100">
                        <md-field>
                          <label for="email">Email</label>
                          <md-input name="email" id="email" autocomplete="email" v-model="form.email" />
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100">
                        <md-field>
                          <label for="phone-number">Phone Number</label>
                          <md-input name="phone-number" id="phone-number" autocomplete="phone" v-model="form.phone" />
                        </md-field>
                      </div>
                    </div>
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item md-small-size-100">
                        <md-field>
                          <label for="address">Address</label>
                          <md-input name="address" id="address" autocomplete="address" v-model="form.address" />
                        </md-field>
                      </div>
                    </div>
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item md-small-size-100">
                        <md-field>
                          <label for="empType">Employee Type</label>
                          <md-select v-model="form.empType" name="empType" id="empType">
                            <md-option value="fight-club">Fight Club</md-option>
                            <md-option value="godfather">Godfather</md-option>
                          </md-select>
                        </md-field>
                      </div>
                    </div>
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item">
                        <md-button class="md-raised md-primary md-alignment-top-right">Add New User</md-button>
                      </div>
                    </div>
                  </div>
                </form>
              </md-tab>
              <md-tab id="tab-posts" md-label="View Users">

              </md-tab>
            </md-tabs>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Admin',
  data() {
    return {
      form: {
        firstName: null
      }
    }
  },
  methods: {
    createNewUser() {
      console.log("thing")
    }
  }
}
</script>

<style scoped lang="scss">

</style>
