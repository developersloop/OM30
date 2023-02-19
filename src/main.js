import Vue from 'vue'
import store from '../src/store/store'
import router from './routes/router'

import App from './App.vue'

import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'

import VueMask from 'v-mask'
Vue.use(VueMask);

// Or as a directive-only
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

// Or only as a filter-only
import { VueMaskFilter } from 'v-mask'

Vue.filter('VMask', VueMaskFilter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
