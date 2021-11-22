<template>
  <v-container>
    <v-row>
      <v-simple-table>
        <template>
          <h4 class="mb-5 mt-10">Дверь</h4>
          <tbody>
            <tr>
              <td>Название</td>
              <td>{{ order.door.name }}</td>
              <td>Длина</td>
              <td>{{ order.doorLength }} м.</td>
            </tr>
            <tr>
              <td>Цена</td>
              <td>{{ order.door.price }} сум</td>
              <td>Ширина</td>
              <td>{{ order.doorWidth }} м.</td>
            </tr>
            <tr>
              <td>Итого</td>
              <td>{{ order.doorPrice }} сум</td>
              <td>Площадь</td>
              <td>{{ order.doorArea }} м<sup>2</sup></td>
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

name: "DoorInfo";
@Component({})
export default class DoorInfo extends Vue {
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