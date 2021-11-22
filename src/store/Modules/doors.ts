import axios from '../../services/axios'
import {IDoor, IStoreDoors} from '../../types/Store'
import { Commit } from 'vuex'

const state: IStoreDoors = {
    allDoors: [],
    door: {}
}

const actions = {
    async getAllDoors({commit}: {commit: Commit}) {
        try {
            const {data} = await axios.get('/api/v1/door')
            commit('setAllDoors', data)
            return data
        } catch (error: any) {
            const err: string = error.response.data.title
            commit('setMessage', err, { root: true })
            throw new Error(err)
        }
    },

    async createDoor({commit}: {commit: Commit}, door: IDoor) {
        try {
            await axios.post('/api/v1/door', door)
            commit('createDoor', door)
        } catch (error: any) {
            const err: string = error.response.data.title
            commit('setMessage', err, { root: true })
            throw new Error(err)  
        }
    },
    async editedDoor({commit}: {commit: Commit}, door: IDoor) {
        try {
            await axios.put('/api/v1/door', door)
            commit('editedDoor', door)
        } catch (error: any) {
            const err: string = error.response.data.title
            commit('setMessage', err, { root: true })
            throw new Error(err)
        }
    },

    async deleteDoor({commit}: {commit: Commit}, id: string) {
        try {
            await axios.delete(`/api/v1/door/${id}`)
            commit('deleteDoor', id)
        } catch (error: any) {
            const err: string = error.response.data.title
            commit('setMessage', err, { root: true })
            throw new Error(err)
        }
       
    },
}

const mutations = {

    setAllDoors(state: IStoreDoors, doors: IDoor[]) {
        state.allDoors = doors
    },
 
    createDoor(state: IStoreDoors, door: IDoor) {
       state.allDoors.push(door)
    },
    editedDoor(state: IStoreDoors, doorEdit: IDoor) {
        const doorIndex: number = state.allDoors.findIndex(door => doorEdit.id == door.id)
        state.allDoors[doorIndex] = doorEdit
    },
    
    deleteDoor(state: IStoreDoors, doorId: string) {
        const doorIndex: number = state.allDoors.findIndex(door => door.id == doorId)
        state.allDoors.splice(doorIndex, 1)
    },

}

const getters = {
    doors(state: IStoreDoors) {
        return state.allDoors
    }
}


export default {
    state,
    actions,
    mutations,
    getters
}
