<template>
  <main class="section">
    <form class="container box column is-4" @submit.prevent>

      <h1 class="title">Login</h1>

      <div v-if="getAuthErrors" class="notification is-danger">
        <p v-for="error in getAuthErrors">{{ error }}</p>
      </div>

      <!--| EMAIL |-->
      <div class="field">
        <p class="control has-icons-left">
          <span class="icon is-small is-left"><i class="fa fa-envelope"></i></span>
          <input class="input" type="email" placeholder="Email" v-model="credentials.email">
        </p>
      </div>

      <!--| PASSWORD |-->
      <div class="field">
        <p class="control has-icons-left">
          <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
          <input class="input" type="password" placeholder="Password" v-model="credentials.password">
        </p>
      </div>

      <button class="button is-outlined is-primary" type="submit" @click="login(credentials)">Login</button>

      <a href="#" class="new-account">Create account</a></p>

    </form>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters([ 'getAuthErrors' ])
  },
  methods: {
    ...mapActions([ 'login' ])
  }
}
</script>

<style lang="scss" scoped>
  @import "~bulma/sass/utilities/variables";

  .button { margin-bottom: 8px; }

  .new-account {
    display: block;
    color: $text;
    text-align: center;
    font-size: $size-6;

    &:hover { color: $black-bis; }
  }

  .section {
    padding-top: 7rem;
    padding-bottom: 7rem;
  }

  form {
    padding: 30px 24px;
    text-align: center;
  }

  .notification {
    padding: 4px;
    margin-bottom: 0.75rem;
  }
</style>
