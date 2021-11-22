<template>
  <v-container>
    <v-row>
      <v-simple-table class="additionally-table">
        <template>
          <h4 class="mb-5 mt-10">Дополнительные параметры</h4>
          <tbody>
            <tr v-for="add in order.addition" :key="add.id">
              <td>{{ add.addition.name }}</td>
              <td v-if="add.addition.type === 'TRANSOMS'">
                Глубина: {{ add.depth }} м., Площадь:
                {{ add.area }} м<sup>2</sup>, Сумма: {{ add.additionSum }} сум
              </td>
              <td
                v-if="
                  add.addition.type === 'PLATBAND' ||
                  add.addition.type === 'CORNICE'
                "
              >
                Длина: {{ add.length }} м., Сумма: {{ add.additionSum }} сум
              </td>
              <td
                v-if="
                  add.addition.type === 'CUBE' ||
                  add.addition.type === 'PIMPERNEL' ||
                  add.addition.type === 'CASTLE'
                "
              >
                Количество: {{ add.piece }} шт., Сумма:
                {{ add.additionSum }} сум
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {IOrdersResponse} from '../../types/Store'
import { Component, Vue, Prop } from "vue-property-decorator";

name: "AddsInfo"
@Component({})

export default class AddsInfo extends Vue {

@Prop({required: true})
order!: IOrdersResponse
  
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
