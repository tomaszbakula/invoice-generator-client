<template>
  <main class="section">
    <div class="container">

      <app-notification></app-notification>

      <h1 class="title">
        Invoices
        <router-link to="/invoices/create" class="button is-primary is-pulled-right">New Invoice</router-link>
      </h1>

      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th><abbr title="Invoice Number">INO</abbr></th>
            <th>Client</th>
            <th>Total</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          <template v-if="invoices.length">

            <tr v-for="(invoice, index) in invoices">
              <th>{{ index + 1 }}</th>
              <td>{{ invoice.invoiceNumber }}</td>
              <td>{{ invoice.client.firstName + '  ' + invoice.client.lastName }}</td>
              <td>{{ invoice.total | formatPrice }}</td>
              <td>{{ invoice.issueDate | formatDate }}</td>
              <td class="actions">
                <button class="button is-info" @click="edit(invoice._id)"><i class="fa fa-pencil"></i></button>
                <button class="button is-danger" @click="remove(invoice._id, index)"><i class="fa fa-trash"></i></button>
              </td>
            </tr>

          </template>
          <template v-else>
            <tr>
              <td colspan="6">
                <br><h4 class="subtitle has-text-centered">There is no invoices here.</h4><br>
              </td>
            </tr>
          </template>

        </tbody>
      </table>

      <!--| PAGINATION |-->
      <nav class="pagination is-small">
        <ul class="pagination-list">
          <li v-for="index in count">
            <a class="pagination-link" @click="page = index - 1">{{ index }}</a>
          </li>
        </ul>
      </nav>

    </div>
  </main>
</template>

<script>
import { API_URL } from '@/config'
import moment from 'moment'
import Notifications from './layout/Notification.vue'

export default {
  data () {
    return {
      invoices: [],
      page: 0,
      count: 0
    }
  },
  methods: {
    fetchData () {
      this.axios.get(API_URL + 'invoices', { params: { page: this.page } }).then(res => {
        // Set pagination
        let count = res.data[res.data.length - 1].count
        this.count = count > 1 ? count : 0
        res.data.pop()

        // Populate invoices array
        this.invoices = res.data
      })
    },
    edit (id) {
      this.$router.push('/invoices/' + id)
    },
    remove (id, index) {
      this.axios.delete(API_URL + 'invoices/' + id).then(res => {
        this.invoices.splice(index, 1)
      })
    }
  },
  watch: {
    page () {
      this.fetchData()
    }
  },
  created () {
    this.fetchData()
  },
  filters: {
    formatDate (date) {
      if (!date) return ''
      return moment(date).format('YYYY/MM/DD')
    }
  },
  components: {
    appNotification: Notifications
  }
}
</script>
