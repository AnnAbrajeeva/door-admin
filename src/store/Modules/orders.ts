import axios from "../../services/axios"
import { Commit } from "vuex";
import { IOrdersResponse, IStoreOrders } from "@/types/Store";


const state: IStoreOrders = {
    orders: [],
}

const actions = {
    async loadOrders({commit}: { commit: Commit }): Promise<IOrdersResponse> {
        try {
            const {data}: {data: IOrdersResponse} = await axios.get('/api/v1/order')
            commit('setOrders', data)
            return data
        } catch (error: any) {
            const err: string = error.response.data.title
            commit('setMessage', err, { root: true })
            throw new Error(err)
        }
    }
}

const mutations = {
  setOrders(state: IStoreOrders, orders: IOrdersResponse[]) {
      state.orders = orders
  }
}

const getters = {
  
}


export default {
    state,
    actions,
    mutations,
    getters
}
