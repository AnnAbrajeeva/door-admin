<template>
  <v-data-table
    :headers="headers"
    :items="doors"
    :items-per-page="10"
    class="elevation-1"
    calculate-widths
    :headers-length="5"
    :loading="loading"
    :key="toString(Date.now())"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Список дверей</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          @click="$router.push({ name: 'doorNew' })"
          color="primary"
          dark
          class="mb-2"
        >
          Создать
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.status="{ item }">
      <v-chip :color="getColor(item.status)" dark :key="toString(Date.now())">
        {{ getStatusValue(item.status) }}
      </v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>


<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { IDoor } from "../../types/Store";
import { TableOrderHeaders } from "../../types/Main";
import { errorFunc } from "../../utils/errorFunc";

name: "Door";

@Component({})
export default class Door extends Vue {
  loading = true;
  doors: IDoor[] = [];
  headers: TableOrderHeaders[] = [
    {
      text: "Наименование",
      align: "start",
      sortable: true,
      value: "name",
    },
    { text: "Цена", sortable: true, value: "price" },
    { text: "Статус", sortable: true, value: "status" },
    { text: "Действие", value: "actions", sortable: false },
  ];

  async created() {
    try {
      const doors = await this.$store.dispatch("getAllDoors");
      this.doors = doors;
      this.loading = false;
    } catch (error) {
      let msg = errorFunc(this.$store.state.error);
      this.loading = false;
      let toast = this.$toasted.error(msg, {
        theme: "bubble",
        position: "top-center",
        duration: 5000,
      });
    }
  }

  public getColor(status: boolean): string {
    if (status === true) return "green";
    else return "silver";
  }

  public getStatusValue(status: boolean): string {
    if (status === true) return "Включен";
    else return "Отключен";
  }

  public editItem(item: IDoor): void {
    this.$router.push({
      name: "doorEdit",
      params: {
        id: item.id,
      },
    });
  }

  async deleteItem(item: IDoor): Promise<any> {
    await this.$store.dispatch("deleteDoor", item.id);
    this.$forceUpdate()
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
.v-chip.v-size--default {
  display: block;
  margin: 0 auto;
  width: fit-content;
}
</style>
