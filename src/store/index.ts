import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import auth from './Modules/auth';
import orders from './Modules/orders';
import doors from './Modules/doors';
import additionally from './Modules/additionally';
import newOrder from './Modules/newOrder';
import {IStoreMain} from '../types/Store'

Vue.use(Vuex)

const store: StoreOptions<IStoreMain> = {
 
  state: {
    error: null
  },
  mutations: {
   setMessage(state, error) {
     state.error = error
   },
   clearMessage(state, error) {
     state.error = null
   }
  },
  actions: {
   setMessage({commit}, error) {
     commit('setMessage', error)
   }
  },
  modules: {
    auth,
    orders,
    doors,
    additionally, 
    newOrder
  }
}

export default new Vuex.Store(store)
