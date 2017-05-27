<template>
  <div v-if="display" :class="['notification', 'is-' + type]">
    <button class="delete" @click="remove"></button>
    {{ message }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      display: false,
      type: '',
      message: ''
    }
  },
  methods: {
    remove () {
      this.display = false
      this.type = ''
      this.message = ''
    }
  },
  created () {
    if (this.$route.query.message && this.$route.query.type) {
      this.display = true
      this.type = this.$route.query.type
      this.message = this.$route.query.message
    }
  }
}
</script>
