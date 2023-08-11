<template>
  <v-container>
      <v-sheet class="px-12 py-16" rounded>
<!--        <h1 style="font-size: 5em; font-family:oswald sans-serif !important; letter-spacing: 0.05em !important;" class="pa-8 text-center text-secondary" >eFarm</h1>-->
        <v-card class="mx-auto px-6 py-8" max-width="500">
          <v-card-title class="text-secondary text-center" >Sign In</v-card-title>
          <v-form
              v-model="form"
              @submit.prevent="onSubmit"
          >
            <v-text-field
                v-model="userName"
                :readonly="loading"
                :rules="[required]"
                class="mb-2"
                color="secondary"
                clearable
                label="Username"
            ></v-text-field>

            <v-text-field
                v-model="password"
                :readonly="loading"
                :rules="[required]"
                color="secondary"
                clearable
                type="password"
                label="Password"
                placeholder="Enter your password"
            ></v-text-field>

            <br>

            <v-btn
                :disabled="!form"
                :loading="loading"
                block
                color="secondary"
                size="large"
                type="submit"
                variant="elevated"
            >
              Sign In
            </v-btn>
          </v-form>
        </v-card>
      </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "SignIn",


  data: () => ({
    form: false,
    loading: false,
    userName: '',
    password: '',
    rules: [
      value => {
        if (value) return true

        return 'Field must not be empty'
      },
    ],
  }),
  methods: {
    onSubmit () {
      if (!this.form) return

      this.loading = true

      let request =  "uid" + "=" + encodeURIComponent(this.userName) + "&" + "pwd"  + "=" + encodeURIComponent(this.password)

      this.$axios.post("https://app.efarmbg.com/efarmmobile/rest/login", request)
          .then(function (response) {
            console.log(response);

            this.$router.push({name:'Map'})
            this.$store.state.isLoggedIn = true;
          })
          .catch(function (error) {
            console.log(error);
            alert("Invalid username or password!")
          });

      this.loading = false

    },
    required (v) {
      return !!v || 'Field is required'
    },
  },

}
</script>

<style scoped>

</style>
