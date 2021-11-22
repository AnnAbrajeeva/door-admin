import { IAdditionParams, IDoor, IAdditionally } from './../../types/Store';
import { IStoreNewOrder, IStoreOrders } from "@/types/Store";
import { Commit } from 'vuex';

export default {
    state: {
        order: {
            client: "",
            date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10),
            phone: "",
            getRangeDates: ["", ""],
            doors: [],
        },
        selectDoor: {
            id: '',
            name: '',
            price: null,
            status: true,
            count: null,
            length: null,
            width: null,
            square: null,
            total: 0,
            additionally: []
        },

    } as IStoreNewOrder,
    mutations: {
        updateClient: (state: IStoreNewOrder, value: string): void => {
            state.order.client = value;
        },
        updatePhone: (state: IStoreNewOrder, value: string): void => {
            state.order.phone = value;
        },
        updateDate: (state: IStoreNewOrder, value: string): void => {
            state.order.date = value;
        },
        saveRangeDates: (state: IStoreNewOrder, value: Array<string>): void => {
            state.order.getRangeDates = value;
        },
        setSelectDoor: (state: IStoreNewOrder, value: IDoor): void => {
            state.selectDoor.id = value.id
            state.selectDoor.name = value.name
            state.selectDoor.price = value.price
            state.selectDoor.status = value.status
        },
        setDoorCount: (state: IStoreNewOrder, value: number): void => {
            state.selectDoor.count = value
        },
        setDoorLength: (state: IStoreNewOrder, value: number): void => {
            state.selectDoor.length = value
        },
        setDoorWidth: (state: IStoreNewOrder, value: number): void => {
            state.selectDoor.width = value
        },
        setDoorSquare: (state: IStoreNewOrder, value: number): void => {
            state.selectDoor.square = value
        },
        setDoorPrice: (state: IStoreNewOrder, value: number): void => {
            state.selectDoor.total = value
        },
        deleteAddFromSelectDoor(state: IStoreNewOrder, id: string): void {
            const index = state.selectDoor.additionally.findIndex(item => item.id === id)
            state.selectDoor.additionally.splice(index, 1)
        },
        saveAdditionallyInState(state: IStoreNewOrder, value: IAdditionally): void {
            state.selectDoor.additionally.push({...value})
        },
        updateAdditionallyInState(state: IStoreNewOrder, value: IAdditionally): void {
            const index = state.selectDoor.additionally.findIndex(item => item.id === value.id)
            state.selectDoor.additionally.splice(index, 1, value)
        },
        saveDoorInOrder(state: IStoreNewOrder): void {
            state.order.doors.push({...state.selectDoor})
            state.selectDoor.id = ''
            state.selectDoor.name = ''
            state.selectDoor.price = null
            state.selectDoor.status = false
            state.selectDoor.count = 1
            state.selectDoor.length = null
            state.selectDoor.width = null
            state.selectDoor.square = null
            state.selectDoor.total = 0
            state.selectDoor.additionally = []
            },
        addOrder(state: IStoreNewOrder) {
           console.log(state.order)
        },
    },
    actions: {
        updateClient({commit}: {commit: Commit}, value: string) {
            commit('updateClient', value);
        },
        updatePhone({commit}: {commit: Commit}, value: string) {
            commit('updatePhone', value);
        },
        updateDate({commit}: {commit: Commit}, value: string) {
            commit('updateDate', value);
        },
        saveRangeDates({commit}: {commit: Commit}, value: Array<string>) {
            commit('saveRangeDates', value);
        },
        setSelectDoor({commit}: {commit: Commit}, value: IDoor) {
            commit('setSelectDoor', value)
        },
        setDoorCount({commit}: {commit: Commit}, value: number) {
            commit('setDoorCount', value)
        },
        setDoorLength({commit}: {commit: Commit}, value: number) {
            commit('setDoorLength', value)
        },
        setDoorWidth({commit}: {commit: Commit}, value: number) {
            commit('setDoorWidth', value)
        },
        setDoorSquare({commit}: {commit: Commit}, value: number) {
            commit('setDoorSquare', value)
        },
        setDoorPrice({commit}: {commit: Commit}, value:number) {
            commit('setDoorPrice', value)
        },
        setSelectAdditionally({commit}: {commit: Commit}, value: IAdditionParams) {
            commit('setSelectAdditionally', value)
        },
        deleteAddFromSelectDoor({commit}: {commit: Commit}, value: string) {
            commit('deleteAddFromSelectDoor', value)
        },
        saveAdditionallyInState({commit}: {commit: Commit}, value: IAdditionParams) {
            commit('saveAdditionallyInState', value)
        },
        updateAdditionallyInState({commit}: {commit: Commit}, value: IAdditionally) {
            commit('updateAdditionallyInState', value)
        },
        saveDoorInOrder({commit}: {commit: Commit}) {
            commit('saveDoorInOrder')
        },
        async addOrder(context: any) {
            const id = context.rootState.orders.orders.length
            await context.rootState.orders.orders.push({...context.state.order, contractId: id})
            context.commit('addOrder')
            context.state.order.client = ''
            context.state.order.phone = ''
            context.state.order.date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)
            context.state.order.getRangeDates = ["", ""]
            context.state.order.doors = []
        }
    },
    getters: {
        stateOrder(state: IStoreNewOrder) {
            return state.order;
        },
        selectDoor(state: IStoreNewOrder) {
            return state.selectDoor
        },

    }
};
