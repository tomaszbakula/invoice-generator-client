<template>
  <main class="section">
    <div class="container">

      <h1 class="title">New Invoice</h1>

      <article class="invoice is-clearfix">

        <div class="invoice__row is-clearfix">

          <!--| COMPANY LOGO |-->
          <img v-if="logo" :src="logo" alt="Client Logo" class="invoice__logo">

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

            <div class="client-search">
              <div class="field has-addons">
                <p class="control">
                  <!-- CLIENTS SEARCH -->
                  <input type="text"
                         placeholder="Search for client"
                         autocomplete="off"
                         class="input client-search__input"
                         v-model="query"
                         @keydown.down="down"
                         @keydown.up="up"
                         @keydown.enter="hit"
                         @keydown.esc="reset"
                         @blur="reset"
                         @input="update"/>
                </p>
                <p class="control">
                  <a class="button client-search__clear" @click="clearClient()">
                    Clear
                  </a>
                </p>
              </div>

              <!-- CLIENTS LIST -->
              <ul class="client-search__results" v-if="hasItems">
                <li v-for="(item, $item) in items" :class="activeClass($item)" @mousedown="hit" @mousemove="setActive($item)">
                  {{ item.firstName }} {{ item.lastName }}
                </li>
              </ul>
            </div>


            <input v-if="form.client.id" type="hidden" name="" v-model="form.client.id">

            <!--| CLIENT DETAILS |-->
            <div class="client-details">
              <input class="input client-fname" type="text" placeholder="First Name" v-model="form.client.firstName" :disabled="form.client.id">
              <input class="input client-lname" type="text" placeholder="Last Name" v-model="form.client.lastName" :disabled="form.client.id">
            </div>

            <!--| CLIENT ADDRESS |-->
            <address class="client-address">
              <input class="input street" type="text" placeholder="Street" v-model="form.client.address.street" :disabled="form.client.id">
              <input class="input city" type="text" placeholder="City" v-model="form.client.address.city" :disabled="form.client.id">
              <input class="input postcode" type="text" placeholder="Postcode" v-model="form.client.address.postcode" :disabled="form.client.id">
              <input class="input state" type="text" placeholder="State" v-model="form.client.address.state" :disabled="form.client.id">
              <input class="input country" type="text" placeholder="Country" v-model="form.client.address.country" :disabled="form.client.id">
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
                    <p class="control price">{{ currency }}</p>
                    <p class="control">
                      <input type="text" class="input" placeholder="0.00" v-model="item.price">
                    </p>
                  </div>

                </td>
                <td>
                  <input type="text" class="input" placeholder="0" v-model="item.qty">
                </td>
                <td>{{ item.total = item.price * item.qty | formatPrice }}</td>
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

        <div class="invoice__row invoice__total is-clearfix">
          <strong>Total:</strong>
          <span class="price">{{ totalAmount | formatPrice }}</span>
        </div>

        <hr>

        <button class="button is-primary is-medium is-pulled-right" @click="save()">Save</button>

      </article>

    </div>
  </main>
</template>

<script>
import { BASE_URL, API_URL, USER_PROFILE_URL } from '@/config'
import { zeroPad, emptyObject } from '@/helpers'
import datepicker from 'vue-datepicker/vue-datepicker-es6.vue'
import moment from 'moment'
import VueTypeahead from 'vue-typeahead'

export default {
  extends: VueTypeahead,
  data () {
    return {
      logo: false,
      src: API_URL + '/clients',
      limit: 5,
      minChars: 3,
      currency: '£',
      form: {
        company: {
          name: '',
          address: {}
        },
        client: {
          firstName: '',
          address: {}
        },
        invoiceNumber: '',
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
      let total = 0

      this.form.items.forEach(function (item) {
        total += item.total
      })

      return total
    }
  },
  methods: {
    clearClient () {
      emptyObject(this.form.client)
      this.form.client.id = false
    },
    onHit (client) {
      this.form.client.id = client._id
      delete client._id
      Object.assign(this.form.client, client)
    },
    addItem () {
      this.form.items.push({ price: '', qty: '', total: '' })
    },
    removeItem (index) {
      this.form.items.splice(index, 1)
    },
    save () {
      // Set invoice issue date.
      this.form.issueDate = Date.parse(this.date.time)
      this.form.total = this.totalAmount

      if (!this.form.client.id) {
        delete this.form.client.id
      }

      this.axios.post(API_URL + 'invoices', this.form).then(res => {
        this.$router.push({
          path: '/invoices',
          query: {
            type: 'success',
            message: 'New invoice has been created.'
          }
        })
      })
      .catch(err => { console.log(err) })
    },
    getProfile () {
      this.axios.get(USER_PROFILE_URL).then(res => {
        this.form.company.name = res.data.companyName
        this.form.company.phone = res.data.phone
        this.form.company.address.street = res.data.street
        this.form.company.address.city = res.data.city
        this.form.company.address.postcode = res.data.postcode
        this.form.company.address.state = res.data.state
        this.form.company.address.country = res.data.country

        this.logo = BASE_URL + res.data.logo
      })
    },
    getInvoiceNumber () {
      this.axios.get(API_URL + 'invoices').then(res => {
        let latest = res.data.shift()
        let no = latest ? parseInt(latest.invoiceNumber) + 1 : 0
        this.form.invoiceNumber = zeroPad(no, 8)
      })
    }
  },
  created () {
    this.getProfile()
    this.getInvoiceNumber()
  },
  components: {
    datepicker
  }
}
</script>
