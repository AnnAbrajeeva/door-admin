export interface StoreAuth {
    token: string | null
}

export interface IStoreMain {
    error: string | null
}

export interface IStoreOrders {
    orders: IOrdersResponse[]
}

export interface IStoreDoors {
    allDoors: IDoor[],
    door: IDoor | unknown
}

export interface IStoreAdds {
    allAdds: Array<IAdditionParams>,
    addsType: IAddType[]
}

export interface IStoreNewOrder {
    order: INewOrder,
    selectDoor: ISelectDoor
}

export interface IOrdersResponse {
    addition: Array<IAddition>
    clientName: string
    clientPhone: string
    contractId: number
    createdDate: string
    customPrice: string
    door: IDoor
    doorArea: string
    doorLength: string
    doorPrice: string
    doorWidth: string
    id: string
    periodDate: string[]
    price: number
}

export interface IAddition {
    addition: IAdditionParams
    additionSum: number
    area: string | null
    depth: string | null
    length: string | null
    piece: string | null
}

export interface IAdditionally {
    deep: number | null
    length: number | null
    area: string | null
    id: string
    name: string
    price: number
    square: number | null
    status: boolean
    total: number
    type: string
}

export interface IAdditionParams {
    id: string
    name: string
    price: number | null
    status: boolean
    type: IAddType
}

export interface IDoor {
    id: string
    name: string
    price: number | null
    status: boolean
}

export interface IAddType {
    name: string,
    type: string
}

export interface INewOrder {
    client: string,
    date: string,
    phone: string,
    getRangeDates: Array<string>,
    doors: ISelectDoor[],   
}

export interface ISelectDoor {
    id: string | '',
    name: string | null,
    price: number | null,
    status: boolean,
    count: number | null,
    length: number | null,
    width: number | null,
    square: number | null,
    total: number,
    additionally: IAdditionally[]
}




