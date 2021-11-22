import axios from "../../services/axios"
import { StoreAuth } from "@/types/Store"
import { IUser } from "../../types/User"
import { IUserData } from "../../types/User"
import { Commit } from "vuex";
import router from '../../router/index'


const state: StoreAuth = {
    token: localStorage.getItem('token') || null,
}

const actions = {
    async login({ commit }: { commit: Commit }, user: IUser): Promise<IUserData | undefined> {
        try {
            const { data } = await axios
                .post("/api/authenticate", user)
            commit('setToken', data.idToken)
            commit('clearMessage', null, { root: true })
            return (data as IUserData)
        } catch (error: any) {
            const err: string = error.response.data.title
            commit('setMessage', err, { root: true })
            throw new Error(err)
        }
    },
}

const mutations = {
    setToken(state: StoreAuth, token: string) {
        state.token = token
        localStorage.setItem('token', token)
    },

    logout(state: StoreAuth) {
        state.token = null
        localStorage.removeItem('token')
    }
}

const getters = {
    isAuthenticated(state: StoreAuth) {
        return !!state.token
    }
}


export default {
    state,
    actions,
    mutations,
    getters
}
