import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

Vue.config.productionTip = false

//set credential axios with true
axios.defaults.withCredentials = true

Vue.use(Vuelidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
