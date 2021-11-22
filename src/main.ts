import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import toasted from 'vue-toasted';
import { VueSpinners } from '@saeris/vue-spinners'

Vue.use(VueSpinners)
import '@/assets/main.css'

Vue.use(toasted);




Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
