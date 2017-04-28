<template>
  <div id="app">

    <app-header></app-header>

    <div class="row container">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    appHeader: Header
  }
}
</script>
