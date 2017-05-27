<template>
  <nav class="nav has-shadow no-print">
    <div class="container">

      <div class="nav-left">
        <router-link to="/" class="nav-item is-brand">
          <img src="../../assets/logo.png" alt="Invoice Generator">
        </router-link>
      </div>

      <div class="nav-right nav-menu">

        <template v-if="authenticated">

          <router-link to="/invoices" activeClass="is-active" class="nav-item is-tab">Invoices</router-link>
          <router-link to="/profile" activeClass="is-active" class="nav-item is-tab">Profile</router-link>
          <router-link to="/logout" class="nav-item is-tab">Log out</router-link>

        </template>
        <template v-else>

          <router-link to="/login" activeClass="is-active" class="nav-item is-tab">Login</router-link>

        </template>

      </div>

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
