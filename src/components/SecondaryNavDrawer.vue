<template>
  <v-navigation-drawer
      v-if="currentMenu[0] === 'Map'"
      permanent>
    <v-list density="compact"
            lines="three"
            open-strategy="single"
            v-model:selected="fieldSelect"
            v-model:opened="regionSelected">
      <v-list-item >
        <v-text-field
            v-model="searchInput"
            color="secondary"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details>

        </v-text-field>

      </v-list-item>
      <v-divider></v-divider>

      <v-list-group v-for="(region,i) in regionsShow"
                    :key="i"
                    color="secondary"
                    :value="region">

        <template v-slot:activator="{ props }">

          <v-list-item
              v-bind="props"
              :title="region.name"
              :subtitle="region.department + ', ' + region.municipality "
          ></v-list-item>

        </template>

        <v-list-item
            v-for="(field,n) in region.fields"
            :key="n"
            :title="field"
            :value="field"
            color="secondary">
        </v-list-item>

      </v-list-group>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SecondaryNavDrawer",

  props: {
    currentMenu: Array,
  },

  data: () => ({
    additionalMenu: false,
    searchInput: "",
    regionSelected:[],
    fieldSelect:[],
    regions:[],
    fields:[],
    regionsShow:[],
    mapView: String,

  }),

  watch: {
    searchInput(value){
      if(value !== "") {
        this.regionsShow = [];
        this.regions.forEach(element => this.search(element, value))
      }else {
        this.regionsShow = this.regions
      }
    },
    regionSelected(value) {
      if (value !== {}) {
        let selected = value[0]
        this.$store.commit('changeMapView',selected)
      }

    }
  },
  methods: {
    search(element, searchValue) {

      if(element.name.toString().toLowerCase().includes(searchValue.toString().toLowerCase())){
        this.regionsShow.push(element);
        this.regionsShow.sort(this.compareFn)
      }
    },
    compareFn(a,b) {
      if(a.name.toString().toLowerCase().indexOf(this.searchInput) < b.name.toString().indexOf(this.searchInput)){
        return -1;
      }
      if (a.name.toString().indexOf(this.searchInput) > b.name.toString().indexOf(this.searchInput)){
        return 1;
      }
      return 0;

    },
  },

  mounted() {
    this.regionsShow = this.regions
    //TODO: remove hack!
    this.$axios.get("land/%D0%BF%D0%B8%D0%B1%D0%BE%D0%BD%D0%B5%D0%B2")
        .then((response) => {
          console.log(response.data)
          this.regions = response.data
          this.regionsShow = this.regions
        })
        .catch((error) => {
          console.log(error)
        })
  }

}
</script>

<style scoped>

</style>
