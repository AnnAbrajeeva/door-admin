<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-10 mt-10">{{ this.select.name }}</h2>
      </v-col>

      <!-- Длина -->
      <v-col cols="12">
        <v-text-field readonly label="Длина" outlined v-model="getLength">
          <span slot="append">м.</span>
        </v-text-field>
      </v-col>
      <!-- Длина -->

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
import { PlatbandType, PlatbandForm } from "../../../../types/Main";
import { ISelectDoor } from "../../../../types/Store";

name: "platband";
@Component
export default class Platband extends Vue {
  @Prop()
  select!: PlatbandForm;

  private platband = {
    length: null,
    total: null,
  } as PlatbandType;

  @Action
  saveAdditionallyInState;

  public calculateLength(): number {
    if (this.selectDoor.length && this.selectDoor.width) {
      return (this.platband.length =
        this.selectDoor.length * 2 + this.selectDoor.width);
    } else {
      return 0
    }
  }

  public calculateTotal(): number {
    if (this.platband.length) {
      return (this.platband.total = this.platband.length * this.select.price);
    } else {
      return 0;
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
      length: this.platband.length,
      total: this.platband.total,
    } as PlatbandForm;
    this.saveAdditionallyInState(form);
    this.closeCreateModal();
    this.platband.length = null;
    this.platband.total = null;
  }

  @Getter
  selectDoor!: ISelectDoor

  get getTotal(): number {
    return this.calculateTotal();
  }

  get getLength(): number {
    return this.calculateLength();
  }
}
</script>

<style>
</style>