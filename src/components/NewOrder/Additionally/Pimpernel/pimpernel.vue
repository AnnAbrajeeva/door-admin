<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-10 mt-10">{{ this.select.name }}</h2>
      </v-col>

      <!-- Колличество -->
      <v-col cols="12">
        <v-text-field label="Колличество" outlined v-model="pimpernel.number">
          <span slot="append">шт.</span>
        </v-text-field>
      </v-col>
      <!-- Колличество -->

      <v-col cols="12">
        <v-text-field readonly label="Цена" v-model="getTotal" outlined>
          <span slot="append">сум</span>
        </v-text-field>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeCreateModal">
        Отмена
      </v-btn>
      <v-btn color="blue darken-1" text @click="saveAddition">
        Сохранить
      </v-btn>
    </v-card-actions>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { PimpernelType, PimpernelForm } from "../../../../types/Main";

name: "pimpernel";
@Component
export default class Pimpernel extends Vue {
  @Prop()
  select;

  private pimpernel = {
    number: null,
    total: null,
  } as PimpernelType;

  @Action
  saveAdditionallyInState;

  public calculateTotal(): number {
    if(this.pimpernel.number) {
      return (this.pimpernel.total = this.pimpernel.number * this.select.price);
    } else {
      return 0
    }
    
  }

  public closeCreateModal(): void {
    this.$emit("closeCreateModal");
  }

  public saveAddition(): void {
    const form = {
      id: this.select.id,
      name: this.select.name,
      price: this.select.price,
      status: this.select.status,
      type: this.select.type,
      number: this.pimpernel.number,
      total: this.pimpernel.total,
    } as PimpernelForm;
    this.saveAdditionallyInState(form);
    this.closeCreateModal();
    this.pimpernel.number = null;
    this.pimpernel.total = null;
  }

  @Getter
  selectDoor;

  get getTotal(): number {
    return this.calculateTotal();
  }
}
</script>

<style>
</style>