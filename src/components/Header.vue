<template>
  <nav class="row red darken-2">
    <div class="nav-wrapper container">

      <router-link to="/" class="brand-logo">Invoice Generator</router-link>

      <ul id="nav-mobile" class="right hide-on-med-and-down">

        <template v-if="authenticated">
          <router-link to="/dashboard" activeClass="active" tag="li"><a>Dashboard</a></router-link>
          <router-link to="/invoices" activeClass="active" tag="li"><a>Invoices</a></router-link>
          <router-link to="/profile" activeClass="active" tag="li"><a>Profile</a></router-link>
          <li><a @click="logout">Logout</a></li>
        </template>
        <template v-else>
          <router-link to="/login" activeClass="active" tag="li"><a>Login</a></router-link>
        </template>

      </ul>

    </div>
  </nav>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    computed: {
      authenticated () {
        return this.$store.getters.isAuthenticated
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
