<template>
  <v-container>
    <v-row>
      <v-simple-table>
        <template>
          <h4 class="mb-5">Заказ #{{ order.contractId }}</h4>
          <tbody>
            <tr :headers-length="6">
              <td>Заявка</td>
              <td>#{{ order.contractId }}</td>
              <td>Клиент</td>
              <td>{{ order.clientName }}</td>
              <td>Итого</td>
              <td>{{ order.price }}</td>
            </tr>
            <tr>
              <td>Создан</td>
              <td>{{ order.createdDate }}</td>
              <td>Телефон</td>
              <td>{{ order.clientPhone }}</td>
              <td>Срок</td>
              <td>
                <span v-if="order.periodDate"
                  >{{ order.periodDate[0].split("-").reverse().join(".") }} -
                  {{ order.periodDate[1].split("-").reverse().join(".") }}</span
                >
              </td>
            </tr>
            <tr>
              <td>Дополнительная стоимость</td>
              <td colspan="5">{{ order.customPrice }} сум</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { IOrdersResponse } from "../../types/Store";
import { Component, Vue, Prop } from "vue-property-decorator";

name: "OrderInfo";
@Component({})
export default class OrderInfo extends Vue {
  @Prop({ required: true })
  order!: IOrdersResponse;
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:nth-child(odd),
.v-data-table > .v-data-table__wrapper > table > thead > tr > td:nth-child(odd),
.v-data-table
  > .v-data-table__wrapper
  > table
  > tfoot
  > tr
  > td:nth-child(odd) {
  background-color: #f0f0f0;
}

.theme--light.v-data-table {
  width: 100%;
}

.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr
  > td:last-child {
  align-items: center;
  justify-content: center;
  display: revert;
}
</style>