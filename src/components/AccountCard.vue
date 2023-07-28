<template>
  <v-card class="absolute">
    <v-layout>
      <v-navigation-drawer
          floating
          permanent>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
          <v-list-item prepend-icon="mdi-logout" variant="text" title="Sign out" @click="signOut" >
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 195px"></v-main>
    </v-layout>
  </v-card>

</template>

<script>
export default {
  name: "AccountCard",

  props: {
    isOpen: Boolean,
  },
  methods: {
    signOut() {
      this.$router.push({name:'HomePage'})
      this.$store.state.isLoggedIn = false
    },
  }
}
</script>

<style scoped>
.absolute{
  padding-top: 65px;
  position: absolute;
  right: 0;
  top:0;
  z-index: 1;
}
</style>