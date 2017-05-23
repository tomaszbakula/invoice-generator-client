import Vue from 'vue'
import numeral from 'numeral'

Vue.filter('formatPrice', function (price) {
  return '£' + numeral(price).format('0,0.00')
})
