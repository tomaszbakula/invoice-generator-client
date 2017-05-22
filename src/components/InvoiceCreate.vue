<template>
  <main class="section">
    <div class="container">

      <h1 class="title">New Invoice</h1>

      <article class="invoice is-clearfix">

        <div class="invoice__row is-clearfix">

          <!--| COMPANY |-->
          <div class="invoice__company">

            <!--| COMPANY DETAILS |-->
            <div class="company-details">
              <input class="input company-name" type="text" placeholder="Company" v-model="form.company.name">
              <input class="input company-phone" type="text" placeholder="Phone" v-model="form.company.phone">
            </div>

            <!--| COMPANY ADDRESS |-->
            <address class="company-address">
              <input class="input street" type="text" placeholder="Street" v-model="form.company.address.street">
              <input class="input city" type="text" placeholder="City" v-model="form.company.address.city">
              <input class="input postcode" type="text" placeholder="Postcode" v-model="form.company.address.postcode">
              <input class="input state" type="text" placeholder="State" v-model="form.company.address.state">
              <input class="input country" type="text" placeholder="Country" v-model="form.company.address.country">
            </address>

          </div>

        </div>

        <br>

        <div class="invoice__row is-clearfix">

          <!--| CLIENT |-->
          <div class="invoice__client">

            <h5 class="title is-6">Billed to</h5>

            <!--| CLIENT DETAILS |-->
            <div class="client-details">
              <input class="input client-fname" type="text" placeholder="First Name" v-model="form.client.firstName">
              <input class="input client-lname" type="text" placeholder="Last Name" v-model="form.client.lastName">
            </div>

            <!--| CLIENT ADDRESS |-->
            <address class="client-address">
              <input class="input street" type="text" placeholder="Street" v-model="form.client.address.street">
              <input class="input city" type="text" placeholder="City" v-model="form.client.address.city">
              <input class="input postcode" type="text" placeholder="Postcode" v-model="form.client.address.postcode">
              <input class="input state" type="text" placeholder="State" v-model="form.client.address.state">
              <input class="input country" type="text" placeholder="Country" v-model="form.client.address.country">
            </address>

          </div>

          <!--| DATE OF ISSUE |-->
          <div class="invoice__date">
            <h5 class="title is-6">Date of Issue</h5>
            <datepicker :date="date" :option="option"></datepicker>
          </div>

          <!--| INVOICE NUMBER |-->
          <div class="invoice__number">
            <h5 class="title is-6">Invoice Number</h5>
            <input class="input invoice-number" type="text" placeholder="#0000000001" v-model="form.invoiceNumber">
          </div>

        </div>

        <!--| ITEMS |-->
        <div class="invoice__row is-clearfix">

          <h5 class="title is-6">Items</h5>

          <table class="table item-list">
            <thead>
              <tr>
                <th class="item-list__position">#</th>
                <th>Description</th>
                <th class="item-list__price">Rate</th>
                <th class="item-list__qty">Qty</th>
                <th class="item-list__total">Line Total</th>
                <th class="item-list__actions"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in form.items">
                <td>{{ index + 1 }}</td>
                <td>
                  <input type="text" class="input" placeholder="Enter an Item Name" v-model="item.name">
                </td>
                <td>

                  <div class="field has-addons">
                    <p class="control price">£</p>
                    <p class="control">
                      <input type="text" class="input" placeholder="0.00" v-model="item.price">
                    </p>
                  </div>

                </td>
                <td>
                  <input type="text" class="input" placeholder="0" v-model="item.qty">
                </td>
                <td>{{ item.total = item.price * item.qty || '0.00' }}</td>
                <td>
                  <i class="fa fa-trash item-list__remove" @click="removeItem(index)"></i>
                </td>
              </tr>
            </tbody>
          </table>

          <button class="button is-outlined add-item" @click="addItem()">
            <i class="fa fa-plus-square-o"></i>Add Item
          </button>

        </div>

        <div class="invoice__row is-clearfix">
          {{ totalAmount }}
        </div>

        <hr>

        <button class="button is-primary is-medium is-pulled-right" @click="save()">Save</button>

      </article>

    </div>
  </main>
</template>

<script>
import { API_URL } from '@/config'
import datepicker from 'vue-datepicker/vue-datepicker-es6.vue'
import moment from 'moment'

export default {
  data () {
    return {
      form: {
        company: { address: {} },
        client: { address: {} },
        items: []
      },
      date: {
        time: moment().format('YYYY/MM/DD')
      },
      option: {
        type: 'day',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY/MM/DD',
        color: {
          header: '#e2202c',
          headerText: '#fff'
        }
      }
    }
  },
  computed: {
    totalAmount () {
      // NOTE: Check if there is no batter way to do it.
      let sum = 0
      this.form.items.forEach(function (item) {
        sum += parseInt(item.total)
      })

      return sum
    }
  },
  methods: {
    addItem () {
      this.form.items.push({ price: '', qty: '', total: '' })
    },
    removeItem (index) {
      this.form.items.splice(index, 1)
    },
    save () {
      // Set invoice issue date.
      this.form.issueDate = Date.parse(this.date.time)

      this.axios.post(API_URL + 'invoices/', this.form).then(res => {
        this.$router.push('/invoices')
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    datepicker
  }
}
</script>
