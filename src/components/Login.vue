<template>
  <main class="section">
    <div class="container">

        <form class="box login_form" @submit.prevent>

          <transition name="fade" mode="out-in">
            <h1 v-if="loginForm" class="title" key="loginForm">Login</h1>
            <h1 v-else class="title" key="register">Register</h1>
          </transition>

          <div v-if="getAuthErrors" class="notification is-danger">
            <p v-for="error in getAuthErrors">{{ error }}</p>
          </div>

          <!--| USERNAME |-->
          <div class="field">
            <p class="control has-icons-left">
              <span class="icon is-small is-left"><i class="fa fa-envelope"></i></span>
              <input class="input" type="text" placeholder="Username" v-model="credentials.username">
            </p>
          </div>


          <transition name="fade" mode="out-in">
            <!--| EMAIL |-->
            <div v-if="!loginForm" class="field">
              <p class="control has-icons-left">
                <span class="icon is-small is-left"><i class="fa fa-envelope"></i></span>
                <input class="input" type="email" placeholder="Email" v-model="credentials.email">
              </p>
            </div>
          </transition>

          <!--| PASSWORD |-->
          <div class="field">
            <p class="control has-icons-left">
              <span class="icon is-small is-left"><i class="fa fa-lock"></i></span>
              <input class="input" type="password" placeholder="Password" v-model="credentials.password">
            </p>
          </div>

          <transition name="fade" mode="out-in">
            <button v-if="loginForm" key="loginForm" class="button is-outlined is-primary" type="submit" @click="login(credentials)">Login</button>
            <button v-else key="register" class="button is-outlined is-primary" type="submit" @click="signup(credentials)">Register</button>
          </transition>

          <transition name="fade" mode="out-in">
            <a v-if="loginForm" key="loginForm" href="#" class="new-account" @click="loginForm = !loginForm">Create account</a>
            <a v-else key="register" href="#" class="new-account" @click="loginForm = !loginForm">Login</a>
          </transition>

        </form>

    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      loginForm: true,
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters([ 'getAuthErrors' ])
  },
  methods: {
    ...mapActions([ 'login', 'signup' ])
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

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
