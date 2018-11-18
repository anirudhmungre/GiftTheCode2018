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
                <form class="md-layout" @submit.prevent="">
                  <div class="md-layout-item">
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item md-small-size-100">
                        <md-field>
                          <label for="first-name">Name</label>
                          <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="newUserForm.name" />
                        </md-field>
                      </div>
                    </div>
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item md-small-size-100">
                        <md-field>
                          <label for="email">Email</label>
                          <md-input name="email" id="email" autocomplete="email" v-model="newUserForm.email" />
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100">
                        <md-field>
                          <label for="phone-number">Phone Number</label>
                          <md-input name="phone-number" id="phone-number" autocomplete="phone" v-model="newUserForm.phone" />
                        </md-field>
                      </div>
                    </div>
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item md-small-size-100">
                        <md-field>
                          <label for="addr">Address</label>
                          <md-input name="addr" id="addr" autocomplete="addr" v-model="newUserForm.addr" />
                        </md-field>
                      </div>
                    </div>
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item md-small-size-100">
                        <md-field>
                          <label for="type">Employee Type</label>
                          <md-select v-model="newUserForm.type" name="type" id="type">
                            <md-option value="0">User</md-option>
                            <md-option value="1">Admin</md-option>
                          </md-select>
                        </md-field>
                      </div>
                    </div>
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item md-small-size-100">
                        <md-field>
                          <label for="locId">Location</label>
                          <md-select v-model="newUserForm.locId" name="locId" id="locId">
                            <md-option v-for="location in locationSelectList" v-bind:key="location.id" :value="location.id">{{ location.addr }} : {{ location.typ }}</md-option>
                          </md-select>
                        </md-field>
                      </div>
                    </div>
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item md-small-size-100">
                        <md-field>
                          <label for="username">Username</label>
                          <md-input name="username" id="username" autocomplete="username" v-model="newUserForm.username" />
                        </md-field>
                      </div>
                      <div class="md-layout-item md-small-size-100">
                        <md-field md-has-password>
                          <label for="password">Password</label>
                          <md-input name="password" id="password" autocomplete="password" v-model="newUserForm.password" type="password"></md-input>
                        </md-field>
                      </div>
                    </div>
                    <div class="md-layout md-gutter">
                      <div class="md-layout-item">
                        <md-button class="md-raised md-primary md-alignment-top-right" @click="createNewUser()">Add New User</md-button>
                      </div>
                    </div>
                  </div>
                </form>
              </md-tab>
              <md-tab id="tab-posts" md-label="View Users">
                <md-table v-model="users" md-sort="id" md-sort-order="asc" md-card md-fixed-header >
                  <md-table-toolbar>
                    <div class="md-toolbar-section-start">
                      <h1 class="md-title">Users</h1>
                    </div>
                  </md-table-toolbar>
                  <md-empty-state
                    md-icon="person"
                    md-label="No Users Found"
                    md-description="Cannot find any Users to display">
                  </md-empty-state>
                  <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
                    <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
                    <md-table-cell md-label="Name" md-sort-by="name">{{ item.sName }}</md-table-cell>
                    <md-table-cell md-label="Address" md-sort-by="addr">{{ item.addr }}</md-table-cell>
                    <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
                    <md-table-cell md-label="Phone" md-sort-by="phone">{{ item.phone }}</md-table-cell>
                    <md-table-cell md-label="Username" md-sort-by="username">{{ item.username }}</md-table-cell>
                    <md-table-cell md-label="Location" md-sort-by="locId">{{ item.locId }}</md-table-cell>
                  </md-table-row>
                </md-table>
              </md-tab>
            </md-tabs>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios"

export default {
  name: "Admin",
  data() {
    return {
      locationSelectList: [],
      newUserForm: {
        id: null,
        name: null,
        addr: null,
        email: null,
        phone: null,
        type: null,
        username: null,
        hashPass: null,
        locId: null
      },
      users: []
    }
  },
  mounted() {
    console.log("m")
    axios
      .get("/user/all")
      .then(response => {
        console.log(response)
        this.users = response.data.data
      })
      .catch(e => {
        console.error(e)
      })
      axios
        .get("/cat/locations")
        .then(response => {
          console.log({response})
          this.locationSelectList = response.data.data
        })
        .catch(e => {
          console.error(e)
        })
  },
  methods: {
    createNewUser() {
      console.log("thing")
      axios
      .post("/user/new",  this.newUserForm)
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.error(e)
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
