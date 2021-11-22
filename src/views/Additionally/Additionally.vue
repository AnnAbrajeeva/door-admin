<template>
  <v-data-table
    :headers="headers"
    :items="allAdds"
    :expanded.sync="expanded"
    item-key="actions"
    group-by="type"
    :loading="loading"
    :headers-length="5"
    class="elevation-1"
    :items-per-page="10"
    :key="Date.now()"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Дополнительно</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
          @click="$router.push({ name: 'additionallyNew' })"
          color="primary"
          dark
          class="mb-2"
        >
          Создать
        </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:group.header="{ group, headers, toggle, isOpen }">
      <tr :colspan="headers.length">
        <v-btn @click="toggle" small icon :ref="group" :data-open="isOpen">
          <v-icon v-if="isOpen">mdi-chevron-up</v-icon>
          <v-icon v-else>mdi-chevron-down</v-icon>
        </v-btn>
        {{
          convertType(group)
        }}
      </tr>
    </template>

    <template v-slot:item.type="{ item }">
      <td>{{ convertType(item.type) }}</td>
    </template>

    <template v-slot:item.status="{ item }">
      <v-chip :color="getColor(item.status)" dark :key="Date.now()">
        {{ getStatusValue(item.status) }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { IAdditionParams, IAdditionally } from "../../types/Store";
import { IAdditionallyComp, TableOrderHeaders } from "../../types/Main";

name: "Additionally";

@Component({})
export default class Additionally extends Vue {
  expanded: IAdditionally[] = [];
  allAdds: IAdditionally[] = [];
  headers: TableOrderHeaders[] = [
    {
      text: "Наименование",
      align: "start",
      sortable: true,
      value: "name",
    },
    { text: "Цена", sortable: true, value: "price" },
    { text: "Тип", sortable: true, value: "type" },
    { text: "Статус", sortable: true, value: "status" },
    { text: "Действие", value: "actions", sortable: false },
  ];
  loading = true;

  async mounted() {
    const additionally = await this.$store.dispatch("getAllAdds");
    this.allAdds = additionally;
    this.loading = false;
  }

  public getColor(status: boolean): string {
    if (status === true) return "green";
    else return "silver";
  }

  public getStatusValue(status: boolean): string {
    if (status === true) return "Включен";
    else return "Отключен";
  }

  public convertType(type: string): string {
    if (type == "TRANSOMS") {
      return "Добор";
    } else if (type == "CASTLE") {
      return "Замок";
    } else if (type == "CORNICE") {
      return "Карниз";
    } else if (type == "CUBE") {
      return "Куб";
    } else if (type == "PLATBAND") {
      return "Наличник";
    } else if (type == "PIMPERNEL") {
      return "Сапожок";
    } else {
      return "Дополнение";
    }
  }

  public editItem(item: IAdditionally): void {
    this.$router.push({
      name: "AdditionallyEdit",
      params: { id: item.id },
    });
  }

  public deleteItem(item: IAdditionParams): void {
    this.$store.dispatch("deleteAdditionally", item.id);
    const addIndex = this.allAdds.findIndex((add) => add.id == item.id);
    this.allAdds.splice(addIndex, 1);
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
