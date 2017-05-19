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
              <input class="input company-name" type="text" placeholder="Company" v-model="form.companyName">
              <input class="input company-phone" type="text" placeholder="Phone" v-model="form.companyPhone">
            </div>

            <!--| COMPANY ADDRESS |-->
            <address class="company-address">
              <input class="input street" type="text" placeholder="Street" v-model="form.companyStreet">
              <input class="input city" type="text" placeholder="City" v-model="form.companyCity">
              <input class="input postcode" type="text" placeholder="Postcode" v-model="form.companyPostcode">
              <input class="input state" type="text" placeholder="State" v-model="form.companyState">
              <input class="input country" type="text" placeholder="Country" v-model="form.companyCountry">
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
              <input class="input client-fname" type="text" placeholder="First Name" v-model="form.clientFirstName">
              <input class="input client-lname" type="text" placeholder="Last Name" v-model="form.clientLastName">
            </div>

            <!--| CLIENT ADDRESS |-->
            <address class="client-address">
              <input class="input street" type="text" placeholder="Street" v-model="form.clientStreet">
              <input class="input city" type="text" placeholder="City" v-model="form.clientCity">
              <input class="input postcode" type="text" placeholder="Postcode" v-model="form.clientPostcode">
              <input class="input state" type="text" placeholder="State" v-model="form.clientState">
              <input class="input country" type="text" placeholder="Country" v-model="form.clientCountry">
            </address>

          </div>

          <!--| DATE OF ISSUE |-->
          <div class="invoice__date">
            <h5 class="title is-6">Date of Issue</h5>
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
                <th class="item-list__rate">Rate</th>
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
                      <input type="text" class="input" placeholder="0.00" v-model="item.rate">
                    </p>
                  </div>

                </td>
                <td>
                  <input type="text" class="input" placeholder="0" v-model="item.qty">
                </td>
                <td>{{ item.total = item.rate * item.qty || '0.00' }}</td>
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
export default {
  data () {
    return {
      form: {
        items: []
      }
    }
  },
  computed: {
    totalAmount () {
      let sum = 0
      this.form.items.forEach(function (item) {
        sum += parseInt(item.total)
      })

      return sum
    }
  },
  methods: {
    addItem () {
      this.form.items.push({ rate: '', qty: '', total: '' })
    },
    removeItem (index) {
      console.log('Remove', index)
      this.form.items.splice(index, 1)
    },
    totalPrice (index) {
      return this.form.items[index].rate * this.form.items[index].qty || '0.00'
    },
    save () {
      console.log(this.form.items)
    }
  }
}
</script>
