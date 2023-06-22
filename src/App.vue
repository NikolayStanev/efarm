<template>

  <v-app>
      <v-layout>
        <v-app-bar color="primary">
          <template v-slot:prepend>
            <v-app-bar-nav-icon color="secondary" @click.stop="drawer = !drawer" variant="text"></v-app-bar-nav-icon>
          </template>

          <v-app-bar-title color="secondary" class="text-left">efarmbg</v-app-bar-title>

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
                   color="secondary"
                   prepend-icon="mdi-logout"
                   variant="text"
                   @click="signOut" >
              Sign out
            </v-btn>
          </template>

        </v-app-bar>
        <v-navigation-drawer v-if="isLoggedIn" v-model="drawer">
          <v-list>
            <v-list-item title="Navigation drawer"></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main style="min-height: 300px;">
          <router-view></router-view>
        </v-main>
      </v-layout>


  </v-app>



</template>

<script>

export default {
  name: 'App',
  components: {
  },
  computed: {
    // a computed getter
    isLoggedIn() {
      // `this` points to the component instance
      return this.$store.state.isLoggedIn
    }
  },
  data:() => ({
    drawer: true,
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },
  methods: {
    signOut() {
      this.$router.push({name:'HomePage'})
      this.$store.state.isLoggedIn = false
    }
  }
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
