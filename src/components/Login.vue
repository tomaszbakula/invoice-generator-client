<template>
  <form class="col s4 offset-s4" @submit.prevent>

    <br><h4 class="center-align">Login</h4><br>

    <div v-if="errors" class="card red">
      <div v-for="error in errors" class="card-action">
        <span class="white-text">{{ error }}</span>
      </div>
    </div>


    <!--| USERNAME |-->
    <div class="input-field">
      <label for="username">Username</label>
      <input id="username" type="text" class="validate" v-model="credentials.username">
    </div>

    <!--| PASSWORD |-->
    <div class="input-field">
      <label for="password">Password</label>
      <input id="password" type="password" class="validate" v-model="credentials.password">
    </div>

    <br>

    <div class="center-align">
      <button class="btn btn-large waves-effect waves-light red" type="submit" @click="login(credentials)">Login</button>
      <p class="center-align"><strong><a href="#" class="blue-grey-text text-darken-3">Create account.</a></strong></p>
    </div>

  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    errors () {
      return this.$store.state.errors
    }
  },
  methods: {
    ...mapActions([ 'login' ])
  }
}
</script>
