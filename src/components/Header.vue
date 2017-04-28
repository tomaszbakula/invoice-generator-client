<template>
  <nav class="row red darken-2">
    <div class="nav-wrapper container">

      <router-link to="/" class="brand-logo">Invoice Generator</router-link>

      <ul id="nav-mobile" class="right hide-on-med-and-down">

        <router-link v-if="authenticated" to="/dashboard" activeClass="active" tag="li"><a>Dashboard</a></router-link>
        <router-link v-if="authenticated" to="/profile" activeClass="active" tag="li"><a>Profile</a></router-link>
        <router-link v-if="!authenticated" to="/login" activeClass="active" tag="li"><a>Login</a></router-link>
        <li v-if="authenticated"><a @click="logout">Logout</a></li>

      </ul>

    </div>
  </nav>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    computed: {
      authenticated () {
        return this.$store.state.authenticated
      }
    },
    methods: {
      ...mapMutations(['logout'])
    }
  }
</script>

<style>
  #menu-account { top: auto !important; }
</style>
