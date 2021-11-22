<template>
  <v-container v-if="this.stateOrder.doors.length">
      <v-row v-for="(door, index) in this.stateOrder.doors" :key="index">
        <v-simple-table >
          <template>
            <h4 class="mb-5 mt-10">
              Дверь №{{index+1}}
            </h4>
            <tbody>
            <tr>
              <td>Название</td>
              <td>{{ door.name }}</td>
              <td>Длина</td>
              <td>{{ door.length }} м.</td>
            </tr>
            <tr>
              <td>Цена</td>
              <td>{{ door.price }} сум</td>
              <td>Ширина</td>
              <td>{{ door.width}} м.</td>
            </tr>
            <tr>
              <td>Итого</td>
              <td>{{ door.total }} сум</td>
              <td>Площадь</td>
              <td>{{ door.square }} м<sup>2</sup></td>
            </tr>
            <tr><h4 class="mb-5 mt-10">Дополнительные параметры</h4></tr>
            <tr v-for="add in door.additionally" :key="add.id">
              <td>{{ add.name }}</td>
              <td colspan="3" v-if="add.type === 'TRANSOMS'">Глубина: {{ add.depth }} м., Площадь: {{ add.square }} м<sup>2</sup>, Сумма: {{ add.total }} сум</td>
              <td colspan="3" v-if="add.type === 'PLATBAND' || add.type === 'CORNICE'">Длина: {{ add.length }} м., Сумма: {{ add.total }} сум</td>
              <td colspan="3" v-if="add.type === 'CUBE'  || add.type === 'PIMPERNEL' || add.type === 'CASTLE'">Количество: {{ add.count }} шт., Сумма: {{ add.total }} сум</td>
              <td style="display: none"></td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { IOrdersResponse } from "../../types/Store"

 name: "DoorTable"

 @Component({})

export default class DoorTable extends Vue {

@Getter
stateOrder!: IOrdersResponse[]
 
}
</script>

<style scoped>
.theme--light.v-data-table {
  width: 100%;
}

.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:nth-child(odd),
.v-data-table > .v-data-table__wrapper > table > thead > tr > td:nth-child(odd),
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td:nth-child(odd) {
  background-color: #f0f0f0;
}

.additionally-table.v-data-table > .v-data-table__wrapper > table > tbody > tr > td[data-v-3c1ef684]:nth-child(odd),
.v-data-table > .v-data-table__wrapper > table > thead > tr > td[data-v-3c1ef684]:nth-child(odd),
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td[data-v-3c1ef684]:nth-child(odd) {
  background-color: #fff;
}
.additionally-table.v-data-table > .v-data-table__wrapper > table > tbody > tr > td[data-v-3c1ef684]:first-child,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td[data-v-3c1ef684]:first-child,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td[data-v-3c1ef684]:first-child {
  background-color: #f0f0f0;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr > td:last-child {
  align-items: center;
  justify-content: center;
  display: revert;
}
</style>
