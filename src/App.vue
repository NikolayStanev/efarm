<template>

  <v-app @click = "isAccountMenuOpen = false">
      <v-layout>
        <v-app-bar color="primary">
          <template v-slot:prepend>
            <v-app-bar-nav-icon color="secondary" @click.stop="drawer = !drawer" variant="text"></v-app-bar-nav-icon>
          </template>

          <v-app-bar-title style="cursor: pointer" @click="$router.push({name:'HomePage'})" color="secondary" class="text-left">efarmbg</v-app-bar-title>

          <template v-slot:append>
            <v-btn class="justify-center" color="secondary"
                   variant="text">
              FAQ
            </v-btn>
            <v-btn color="secondary"
                   prepend-icon="mdi-login"
                   variant="text">
              Contact Us
            </v-btn>
            <v-btn v-if="!isLoggedIn"
                   color="secondary"
                   prepend-icon="mdi-account-plus"
                   variant="text">
              Sign up
            </v-btn>
            <v-btn v-if="!isLoggedIn"
                   color="secondary"
                   prepend-icon="mdi-login"
                   variant="text"
                   @click="$router.push({name:'SignIn'})" >
              Sign in
            </v-btn>
            <v-btn v-if="isLoggedIn"
                   icon="mdi-account"
                   @click.stop = "isAccountMenuOpen = !isAccountMenuOpen"
                   color="secondary"
                   size="large">
            </v-btn>
          </template>

        </v-app-bar>
        <v-navigation-drawer
            v-if="isLoggedIn"
            v-model="drawer"
            expand-on-hover
            rail
            width="10%"
            permanent>

          <v-list
              nav
              density="comfortable"
              v-model:selected="currentMenu">
            <v-list-item v-for="current in menus"
                         :title="current.name"
                         :prepend-icon="current.icon"
                         :key="current.name" color="secondary"
                         @click="$router.push({name: current.onClickTo})"
                         :value="current.value">
            </v-list-item>
          </v-list>

        </v-navigation-drawer>
        <secondary-nav-drawer :current-menu="currentMenu"></secondary-nav-drawer>
        <v-main style="min-height: 300px;">
          <account-card v-if="isAccountMenuOpen">
          </account-card>
          <router-view></router-view>
        </v-main>
      </v-layout>
  </v-app>



</template>

<script>
import SecondaryNavDrawer from "@/components/SecondaryNavDrawer";
import AccountCard from "@/components/AccountCard.vue";
export default {
  name: 'App',
  components: {AccountCard, SecondaryNavDrawer},
  computed: {
    // a computed getter
    isLoggedIn() {
      // `this` points to the component instance
      return this.$store.state.isLoggedIn
    }
  },
  data:() => ({
    drawer: true,
    currentMenu: [],
    isAccountMenuOpen: false,
    additionalMenu: false,
    searchInput: "",
    regionSelected:[],
    fieldSelect:[],
    regions:["California", "Colorado", "Alabama", "Daralan"],
    fields:["Field 1", "Field 2", "Field 3"],
    regionsShow:[],

    menus: [
      {name: 'Map', icon: 'mdi-map', value: 'Map',onClickTo: "Map",  options:[
          {name: 'Fields', icon:'mdi-backup-table', value: "Fields"}
        ]},
      {name: 'Production', icon: 'mdi-leaf', value: 'Production'},
      {name: 'Contracts', icon: 'mdi-file', value: 'Contracts'}
    ]


  }),

  watch: {
    group () {
      this.drawer = false
    },
  },
  methods: {
    accountMenu() {
      console.log(this.isAccountMenuOpen && this.isLoggedIn())
      if(this.isAccountMenuOpen && this.isLoggedIn()){
        return true;
      }
      return false;
    }
  },
}
</script>

<style>
#app {
}
.footer{

  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>
