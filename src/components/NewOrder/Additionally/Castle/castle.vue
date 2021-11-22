<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-10 mt-10">{{ this.select.name }}</h2>
      </v-col>

      <!-- Колличество -->
      <v-col cols="12">
        <v-text-field label="Колличество" outlined v-model="castle.number">
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
import {
  CastleType,
  CastleForm,
  saveAdditionallyInState,
} from "../../../../types/Main";

name: "castle";
@Component
export default class Castle extends Vue {
  private castle = {
    number: 0,
    total: 0,
  } as CastleType;

  @Prop()
  select!: CastleForm;

  public closeEditModal(): void {
      this.$emit('closeEditModal')
    }

  public calculateTotal(): number {
    if (this.castle.number) {
      return (this.castle.total = this.castle.number * this.select.price);
    } else {
      return 0
    }
  }

  closeCreateModal(): void {
    this.$emit("closeCreateModal");
  }

  saveAddition(): void {
    const form = {
      id: this.select.id,
      name: this.select.name,
      price: this.select.price,
      status: this.select.status,
      type: this.select.type,
      number: this.castle.number,
      total: this.castle.total,
    } as CastleForm;
    this.saveAdditionallyInState(form);
    this.closeCreateModal();
    this.castle.number = 0;
    this.castle.total = 0;
  }

  get getTotal(): number {
    return this.calculateTotal();
  }

  @Action
  public saveAdditionallyInState;
}
</script>



<style>
</style>