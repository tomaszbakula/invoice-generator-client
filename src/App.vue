<template>
  <div id="app">

    <app-header></app-header>

    <router-view></router-view>

    <app-footer></app-footer>

  </div>
</template>

<script>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'

export default {
  name: 'app',
  components: {
    appHeader: Header,
    appFooter: Footer
  }
}
</script>

<style lang="scss" src="./assets/scss/style.scss"></style>
