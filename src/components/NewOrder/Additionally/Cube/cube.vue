<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-10 mt-10">{{ this.select.name }}</h2>
      </v-col>

      <!-- Колличество -->
      <v-col cols="12">
        <v-text-field label="Колличество" outlined v-model="cube.number">
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
import { IAdditionParams } from "../../../../types/Store";
import { CubeForm, CubeType } from "../../../../types/Main";

name: "cube";
@Component
export default class Cube extends Vue {
  @Prop()
  select;

  private cube = {
    number: 0,
    total: 0,
  } as CubeType;

  @Action
  public saveAdditionallyInState;

  public calculateTotal(): number {
    return (this.cube.total = this.cube.number * this.select.price);
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
      number: this.cube.number,
      total: this.cube.total,
    } as CubeForm;
    this.saveAdditionallyInState(form);
    this.closeCreateModal();
    this.cube.number = 0;
    this.cube.total = 0;
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