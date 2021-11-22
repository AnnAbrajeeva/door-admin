import { IOrdersResponse, IAdditionally, INewOrder, ISelectDoor, IAddType } from "../types/Store";



export interface IOrderComp {
    order: IOrdersResponse | {},
    loading: boolean,
}

export interface INewOrderComp {
    doorModal: boolean,
    dialog: boolean,
    valid: boolean,
    client: string,
    phone: string,
    openGetDate: boolean,
    openGetRangeDates: boolean,
    rangeDates: Array<string>,
    total: number,
    nameRules: Array<string>,
    phoneRules: Array<string>,
}

export type VForm = Vue & { validate: () => boolean }

export interface IAdditionallyComp {
    expanded: [],
    allAdds: IAdditionally[],
    headers: [
      {
        text: string,
        align: string,
        sortable: boolean,
        value: string,
      },
    ],
    loading: boolean
}

export interface ITableOrderComp {
    dialog: boolean,
    orders: Array<IOrder>,
    headers: [
      {
        text: string,
        align: string,
        sortable: boolean,
        value: string,
      },
    ],
    printing: string,
    loading: boolean,
}

export interface IOrder {
    client: string,
    date: string,
    phone: string,
    getRangeDates: Array<string>,
    contractId: string
    doors: ISelectDoor[], 
    id: null  
}

export interface IAdditionParamsComp {
  id: string
  name: string
  price: number | null
  status: boolean
  type: {type: IAddType}
}

export interface CastleType {
  number: number
  total: number
}

export interface CastleForm {
  id: string,
  name: string,
  price: number,
  status: boolean,
  type: string,
  number: number,
  total: number,
}

export interface saveAdditionallyInState {
  saveAdditionallyInState(): void
}

export interface CorniceType {
  length: number
  total: number
}

export interface CorniceForm {
  id: string,
  name: string,
  price: number,
  status: boolean,
  type: string,
  length: number,
  total: number,
}

export interface CubeType {
  number: number
  total: number
}

export interface CubeForm {
  id: string,
  name: string,
  price: number,
  status: boolean,
  type: string,
  number: number,
  total: number,
}

export interface PimpernelType {
  number: number | null
  total: number | null
}

export interface PimpernelForm {
  id: string,
  name: string,
  price: number,
  status: boolean,
  type: string,
  number: number,
  total: number,
}

export interface PlatbandType {
  length: number | null
  total: number | null
}

export interface PlatbandForm {
  id: string,
  name: string,
  price: number,
  status: boolean,
  type: string,
  length: number | null,
  total: number,
}

export interface TransomsType {
  square: number | null,
  deep: number | null,
  total: number | null,
}

export interface TransomsForm {
  id: string,
  name: string,
  price: number,
  status: boolean,
  type: string,
  deep: number | null,
  square: number | null,
  total: number,
}

export interface HeadersLink {
  title: string
  icon: string
  url: string
}

export interface ReferenceLink {
  action: string,
  title: string,
  path: {name: string}
}

export interface TableOrderHeaders {
  align?: string
  text: string
  sortable: boolean
  value: string 
}