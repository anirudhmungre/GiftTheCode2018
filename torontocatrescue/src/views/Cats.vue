<template>
  <div>
    <md-speed-dial class="md-bottom-right">
      <md-speed-dial-target class="md-accent" @click="showDialog = true">
        <md-icon class="md-morph-initial">add</md-icon>
        <md-icon class="md-morph-final">pets</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Add new Cat</md-dialog-title>
      <md-dialog-content>
        <form class="md-layout">
          <md-steppers :md-active-step.sync="active" md-vertical md-linear>
            <md-step id="first" md-label="General Information" md-description="Optional" :md-editable="false" :md-done.sync="first">
              <div class="md-layout">
                <md-field>
                  <label for="cname">Cat Name</label>
                  <md-input v-model="cname" name="cname" id="cname" />
                </md-field>
                <md-field>
                  <label for="gender">Gender</label>
                  <md-select v-model="gender" name="gender" id="gender">
                    <md-option value="0">Female</md-option>
                    <md-option value="1">Male</md-option>
                  </md-select>
                </md-field>
                <md-datepicker v-model="selectedDate">
                  <label>Date of Birth</label>
                </md-datepicker>
                <md-field>
                  <label for="location">Location</label>
                  <md-select v-model="location" name="location" id="location">
                    <md-option value="0">Main Location</md-option>
                  </md-select>
                </md-field>
                <md-field>
                  <label for="breed">Breed</label>
                  <md-input v-model="breed" name="breed" id="breed" />
                </md-field>
                <md-field>
                  <label for="status">Status</label>
                  <md-select v-model="status" name="status" id="status">
                    <md-option value="0">Pending Fix</md-option>
                    <md-option value="1">Pending Adoption</md-option>
                  </md-select>
                </md-field>
              </div>
              <md-button class="md-raised md-primary" @click="setDone('first', 'second')">Next</md-button>
            </md-step>
            <md-step id="second" md-label="More Information" md-description="Optional" :md-editable="false" :md-done.sync="second">
              <div class="md-layout">
                <md-field>
                  <label for="behavior">Behavior / Comments</label>
                  <md-textarea name="behavior" v-model="behavior" md-counter="256"></md-textarea>
                </md-field>
              </div>
              <md-button class="md-raised md-primary" @click="setDone('second', 'first')">Back</md-button>
              <md-button class="md-raised md-primary" @click="setDone('second', 'third')">Next</md-button>
            </md-step>
            <md-step id="third" md-label="Connect with a pair" :md-editable="false" :md-done.sync="third">
              <div class="md-layout">
                <md-field>
                  <label for="pair">Pair</label>
                  <md-select v-model="pair" name="pair" id="pair">
                    <md-option value="0">No Pair</md-option>
                    <md-option value="1">2 Pair</md-option>
                  </md-select>
                </md-field>
                <md-button class="md-raised md-primary" @click="setDone('third', 'second')">Back</md-button>
              </div>
            </md-step>
          </md-steppers>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="cancelNewCat()">Cancel</md-button>
        <md-button class="md-raised md-accent" @click="submitNewCat()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header @md-selected="onCatSelect">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Cats</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }" :class="getClass(item)" md-selectable="single">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>
<script>
  const toLower = text => {
    return text.toString().toLowerCase()
  }
  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)))
    }
    return items
  }
  export default {
    name: 'Cats',
    data: () => ({
      active: 'first',
      first: false,
      second: false,
      third: false,
      cname: null,
      selectedDate: null,
      gender: null,
      location: null,
      breed: null,
      status: null,
      behavior: null,
      pair: null,
      showDialog: false,

      search: null,
      searched: [],

      tableSelected: {},

      users: [
        {
          id: 1,
          name: "Shawna Dubbin",
          email: "sdubbin0@geocities.com",
          gender: "Male",
          title: "Assistant Media Planner"
        },
        {
          id: 2,
          name: "Odette Demageard",
          email: "odemageard1@spotify.com",
          gender: "Female",
          title: "Account Coordinator"
        },
        {
          id: 3,
          name: "Vera Taleworth",
          email: "vtaleworth2@google.ca",
          gender: "Male",
          title: "Community Outreach Specialist"
        }
      ]
    }),
    methods: {
      getClass: () => ({
        'md-accent':true
      }),
      onCatSelect(item) {
        this.tableSelected = item
      },
      showEditDialog(item) {
        console.log("SHOW EDIT")
      },
      cancelNewCat() {
        this.resetNewCatFields()
      },
      submitNewCat() {
        let formData = this.newCatFieldsToJSON()
        console.log(formData)
        this.resetNewCatFields()
      },
      newCatFieldsToJSON() {
        return {
          cname: this.cname,
          gender: this.gender,
          dob: (new Date(this.selectedDate)).toISOString(),
          location: this.location,
          breed: this.breed,
          status: this.status
        }
      },
      resetNewCatFields() {
        this.active = 'first'
        this.first = false
        this.second = false
        this.third = false
        this.gender = null
        this.location = null
        this.status = null
        this.pair = null
        this.showDialog = false
      },
      setDone (id, index) {
        this[id] = true

        this.secondStepError = null

        if (index) {
          this.active = index
        }
      },
      searchOnTable () {
        this.searched = searchByName(this.users, this.search)
      }
    },
    created () {
      this.searched = this.users
    }
  }
</script>

<style lang="scss" scoped>
  .md-dialog {
    max-width: 768px;
  }
  .md-menu-content {
    z-index: 50 !important;
  }
</style>