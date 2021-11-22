<template>
  <v-data-table
    :headers="headers"
    :items="orders"
    :items-per-page="10"
    class="elevation-1"
    calculate-widths
    :headers-length="5"
    :loading="loading"
    :key="toString(Date.now())"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Список заказов</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          @click="$router.push({ name: 'newOrder' })"
          color="primary"
          dark
          class="mb-2"
        >
          Создать
        </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="showItem(item)"> mdi-eye</v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete</v-icon>
      <v-icon small @click="printOrder(item, printing)"> mdi-printer</v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { IOrdersResponse, INewOrder } from "../types/Store";
import { ITableOrderComp, IOrder, TableOrderHeaders } from "../types/Main";
import router from "../router/index";

name: "TableOrder";

@Component({})
export default class TableOrder extends Vue {
  dialog = false;
  orders: IOrder[] = [];
  headers: TableOrderHeaders[] = [
    {
      text: "#",
      align: "start",
      sortable: true,
      value: "contractId",
    },
    { text: "Клиент", sortable: true, value: "clientName" },
    { text: "Дверь", sortable: true, value: "door.name" },
    { text: "Стоимость", sortable: true, value: "price" },
    { text: "Действие", value: "actions", sortable: false },
  ];
  printing = "print";
  loading = true;

  async mounted(): Promise<any> {
    try {
      this.loading = true;
      let orders = await this.$store.dispatch("loadOrders");
      this.orders = orders;
      this.loading = false;
    } catch (error) {
      let msg = this.$store.state.error;
      let toast = this.$toasted.error(msg, {
        theme: "bubble",
        position: "top-center",
        duration: 5000,
      });
      this.loading = false;
    }
  }

  public printOrder(item: IOrder): void {
    const thisData = this.$data as ITableOrderComp;
    router.push({
      name: "Order",
      params: {
        id: item.contractId,
        printing: thisData.printing,
      },
    });
  }

  public deleteItem(item: IOrder): void {
    const thisData = this.$data as ITableOrderComp;
    // this.$store.dispatch('deleteOrder', item)
    const orderIndex: number = thisData.orders.findIndex(
      (order: IOrder) => order.id == item.id
    );
    thisData.orders.splice(orderIndex, 1);
  }

  public showItem(item: IOrder): void {
    router.push({
      name: "Order",
      params: {
        id: item.contractId,
      },
    });
  }
}
</script>



  


<style lang="scss">
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
  border: thin solid rgba(0, 0, 0, 0.12) !important;
  text-align: center;
}

.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  background-color: #f0f0f0;
  text-align: center !important;
}

.v-data-table > .v-data-table__wrapper > table > thead > tr > th > span {
  font-size: 14px;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td:last-child {
  justify-content: space-evenly;
  display: flex;
}
</style>
