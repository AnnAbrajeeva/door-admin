import { IStoreAdds, IAddition, IAdditionParams } from './../../types/Store';
import axios from "../../services/axios"
import { Commit } from 'vuex';

const state: IStoreAdds = {
    // addId: {},
    allAdds: [],
    addsType: [
        {
            name: 'Добор',
            type: 'TRANSOMS'
        },
        {
            name: 'Замок',
            type: 'CASTLE'
        },
        {
            name: 'Карниз',
            type: 'CORNICE'
        },
        {
            name: 'Кубик',
            type: 'CUBE'
        },
        {
            name: 'Наличник',
            type: 'PLATBAND'
        },
        {
            name: 'Сапожок',
            type: 'PIMPERNEL'
        },
    ]
}

const actions = {
    async getAllAdds({ commit }: { commit: Commit }): Promise<Array<IAddition>> {
        try {
            const { data }: { data: Array<IAddition> } = await axios.get('/api/v1/additionally')
            return data
        } catch (error: any) {
            const err: string = error.response.data.title
            commit('setMessage', err, { root: true })
            throw new Error(err)
        }
    },
    async createAdd({ commit }: { commit: Commit }, add: IAddition) {
        try {
            axios.post('/api/v1/additionally', add)
            commit('createAdd', add)
        } catch (error: any) {
            const err: string = error.response.data.title
            commit('setMessage', err, { root: true })
            throw new Error(err)
        }
    },
    async editedAdditionally({ commit }: { commit: Commit }, add: IAdditionParams) {
        try {
            axios.put('/api/v1/additionally', add)
            commit('editedAdditionally', add)
        } catch (error: any) {
            const err: string = error.response.data.title
            commit('setMessage', err, { root: true })
            throw new Error(err)
        }
    },
    async deleteAdditionally({ commit }: { commit: Commit }, id: string) {
        try {
            axios.delete(`/api/v1/additionally/${id}`)
            commit('deleteAdditionally', id)
        } catch (error: any) {
            const err: string = error.response.data.title
            commit('setMessage', err, { root: true })
            throw new Error(err)
        }
    },
}

const mutations = {
    createAdd(state: IStoreAdds, add: IAdditionParams) {
        state.allAdds.push(add)
    },
    editedAdditionally(state: IStoreAdds, addEdit: IAdditionParams) {
        const addIndex: number = state.allAdds.findIndex(add => addEdit.id == add.id)
        state.allAdds[addIndex] = addEdit
    },
    deleteAdditionally(state: IStoreAdds, addId: string) {
        const addIndex = state.allAdds.findIndex(add => add.id == addId)
        state.allAdds.splice(addIndex, 1)
    }
}

const getters = {
    allAdds(state: IStoreAdds) {
        return state.allAdds
    },

    addsType(state: IStoreAdds) {
        return state.addsType},
}


export default {
    state,
    actions,
    mutations,
    getters
}

