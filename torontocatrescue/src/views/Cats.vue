<template>
  <div>
    <md-speed-dial class="md-bottom-right">
      <md-speed-dial-target class="md-accent" @click="showAddDialog()">
        <md-icon class="md-morph-initial">add</md-icon>
        <md-icon class="md-morph-final">pets</md-icon>
      </md-speed-dial-target>
    </md-speed-dial>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>{{ dialogTitle }}</md-dialog-title>
      <md-dialog-content>
        <form class="md-layout">
          <md-steppers :md-active-step.sync="active" md-vertical md-linear>
            <md-step id="first" md-label="General Information" :md-editable="false" :md-done.sync="first">
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
                <md-datepicker v-model="selectedDate" :md-disabled-dates="disabledDates" :md-immediately="true">
                  <label>Date of Birth</label>
                </md-datepicker>
                <md-field>
                  <label for="age">Age</label>
                  <md-input v-model="age" name="age" id="age" />
                </md-field>
                <md-field>
                  <label for="location">Location</label>
                  <md-select v-model="location" name="location" id="location" class="md-small-size-100">
                    <md-option v-for="location in locationSelectList" v-bind:key="location.id" :value="location.id">{{ location.addr }} : {{ location.typ }}</md-option>
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
            <md-step id="second" md-label="More Information" :md-editable="false" :md-done.sync="second">
              <div class="md-layout">
                <!-- <md-field>
                  <label>Image</label>
                  <md-file v-model="image" accepts="image/*" />
                </md-field> -->
                <md-field>
                  <label for="behavior">Behavior / Comments</label>
                  <md-textarea name="behavior" v-model="behavior" md-counter="256"></md-textarea>
                </md-field>
              </div>
              <md-button class="md-raised md-accent" @click="setDone('second', 'first')">Back</md-button>
              <md-button class="md-raised md-primary" @click="setDone('second', 'third')">Next</md-button>
            </md-step>
            <md-step id="third" md-label="Connect with a pair" :md-editable="false" :md-done.sync="third">
              <div class="md-layout">
                <md-field>
                  <label for="pair">Pair</label>
                  <md-select v-model="pair" name="pair" id="pair">
                    <md-option value="null">No Pair</md-option>
                    <md-option v-for="cat in catSelectList" v-bind:key="cat.uuid" :value="cat.uuid">{{ cat.cName }}</md-option>
                  </md-select>
                </md-field>
                <md-button class="md-raised md-accent" @click="setDone('third', 'second')">Back</md-button>
              </div>
            </md-step>
          </md-steppers>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="cancelNewCat()">Cancel</md-button>
        <md-button v-if="dialogType === 0" class="md-raised md-accent" @click="submitNewCat()">Add New Cat</md-button>
        <md-button v-if="dialogType === 1" class="md-raised md-accent" @click="submitEditCat()">Save Edit</md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-table v-model="searched" md-sort="id" md-sort-order="asc" md-card md-fixed-header >
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Cats</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by name..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <md-empty-state
        md-icon="pets"
        md-label="No Cats available"
        md-description="Cannot find any cats to display">
      </md-empty-state>
      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="cName">{{ item.cName }}</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.sex }}</md-table-cell>
        <md-table-cell md-label="Date of Birth" md-sort-by="dob">{{ (new Date(item.dob)).toLocaleDateString() }}</md-table-cell>
        <md-table-cell md-label="Age" md-sort-by="age">{{ item.age }}</md-table-cell>
        <md-table-cell md-label="Breed" md-sort-by="breed">{{ item.breed }}</md-table-cell>
        <md-table-cell md-label="Stat" md-sort-by="stat">{{ item.stat }}</md-table-cell>
        <md-table-cell md-label="Bonded Pair" md-sort-by="pair">{{ (item.pair ? "Y" : "N") }}</md-table-cell>
        <md-table-cell md-label="Edit" md-sort-by="id">
          <md-button class="md-primary" @click="showEditDialog(item)">
            <md-icon>edit</md-icon>
          </md-button>
        </md-table-cell>
        <md-table-cell md-label="More" md-sort-by="id">
          <md-button class="md-accent" @click="$router.push({ path: `/dashboard/cat/info/${item.id}` })">
            More
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>
<script>
import axios from 'axios'
import uuid from 'uuid'

const toLower = text => {
  return text.toString().toLowerCase()
}
const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.cName).includes(toLower(term)))
  }
  return items
}
export default {
  name: "Cats",
  mounted: function() {
    axios
      .get("/cat/all")
      .then(response => {
        let allCats = response.data.data.filter(e => e.stat !== null)
        this.searched = allCats
        this.cats = allCats
      })
      .catch(e => {
        console.error(e)
      })
  },
  data: () => ({
    active: "first",
    first: false,
    second: false,
    third: false,
    cname: null,
    selectedDate: null,
    disabledDates: date => date > new Date(),
    cid: null,
    gender: null,
    age: null,
    location: null,
    breed: null,
    status: null,
    behavior: null,
    image: null,
    pair: null,
    showDialog: false,

    dialogTitle: "Add New Cat",
    dialogType: 0,

    search: null,
    searched: [],

    tableSelected: {},

    cats: [],
    locationSelectList: [],
    catSelectList: []
  }),
  methods: {
    padZero(num) {
      return (num < 10 ? "0" : "") + num.toString()
    },
    datepickerDateFormat(dateObject) {
      return (
        dateObject.getFullYear() +
        "-" +
        this.padZero(dateObject.getMonth() + 1) +
        "-" +
        this.padZero(dateObject.getDate())
      )
    },
    getClass: () => ({
      "md-accent": true
    }),
    onCatSelect(item) {
      this.tableSelected = item
    },
    showAddDialog() {
      this.loadLocations()
      this.loadCats()
      this.resetNewCatFields()
      this.dialogTitle = "Add New Cat"
      this.dialogType = 0
      this.showDialog = true
      this.cid = uuid('uuid/v1')
    },
    loadLocations() {
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
    loadCats() {
      axios
        .get("/cat/all")
        .then(response => {
          console.log(response)
          this.catSelectList = response.data.data
        })
        .catch(e => {
          console.error(e)
        })
    },
    showEditDialog(item) {
      this.loadLocations()
      this.loadCats()
      this.dialogTitle = "Edit Cat"
      this.dialogType = 1
      this.active = "first"
      this.first = false
      this.second = false
      this.third = false
      this.gender = item.sex === "M" ? 1 : 0
      this.age = item.age
      this.location = item.locId
      this.cname = item.cName
      this.breed = item.breed
      this.status = item.stat
      this.behavior = item.behavior
      this.selectedDate = this.datepickerDateFormat(new Date(item.dob))
      this.pair = item.pair
      this.showDialog = true
    },
    cancelNewCat() {
      this.resetNewCatFields()
    },
    submitNewCat() {
      let formData = this.newCatFieldsToJSON()
      axios
        .post("/cat/add", formData)
        .then(response => {
          console.log(response)
        })
        .catch(e => {
          console.error(e)
        })
      this.resetNewCatFields()
    },
    submitEditCat() {
      this.resetNewCatFields()
    },
    newCatFieldsToJSON() {
      return {
        cName: this.cname,
        sex: this.gender,
        dob: new Date(this.selectedDate).toISOString(),
        age: this.age,
        location: this.location,
        breed: this.breed,
        behavior: this.behavior,
        stat: this.status,
        locId: this.location,
        pair: this.pair,
        uuid: this.cid
      }
    },
    resetNewCatFields() {
      this.active = "first"
      this.first = false
      this.second = false
      this.third = false
      this.cid = null
      this.cname = null
      this.gender = null
      this.location = null
      this.age = null
      this.status = null
      this.pair = null
      this.showDialog = false
    },
    setDone(id, index) {
      this[id] = true
      this.secondStepError = null
      if (index) {
        this.active = index
      }
    },
    searchOnTable() {
      this.searched = searchByName(this.cats, this.search)
    }
  },
  created() {
    this.searched = this.cats
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