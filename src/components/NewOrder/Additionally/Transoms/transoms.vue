<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-10 mt-10">{{ this.select.name }}</h2>
      </v-col>

      <!-- Глубина -->
      <v-col cols="12">
        <v-text-field label="Глубина" outlined v-model="trans.deep">
          <span slot="append">м</span>
        </v-text-field>
      </v-col>
      <!-- Глубина -->

      <!-- Площадь -->
      <v-col cols="12">
        <v-text-field readonly label="Площадь" outlined v-model="getSquare">
          <span slot="append">м</span>
        </v-text-field>
      </v-col>
      <!-- Площадь -->

      <v-col cols="12">
        <v-text-field readonly label="Итого" v-model="getTotal" outlined>
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
import { IAdditionParams, ISelectDoor } from "../../../../types/Store";
import { TransomsType, TransomsForm } from "../../../../types/Main";

name: "transoms";
@Component
export default class Transoms extends Vue {
  @Prop()
  select!: TransomsForm;

  private trans = {
    square: null,
    deep: null,
    total: null,
  } as TransomsType;

  @Action
  saveAdditionallyInState;

  public calculateSquare(): number {
    if (this.selectDoor.length && this.selectDoor.width && this.trans.deep) {
      return (this.trans.square =
        this.selectDoor.length * this.selectDoor.width * this.trans.deep);
    } else {
      return 0;
    }
  }

  public calculateTotal(): number {
    if (this.trans.square && this.select.price) {
      return (this.trans.total = this.trans.square * this.select.price);
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
      deep: this.trans.deep,
      square: this.trans.square,
      total: this.trans.total,
    } as TransomsForm;
    this.saveAdditionallyInState(form);
    this.closeCreateModal();
    this.trans.square = null;
    this.trans.deep = null;
    this.trans.total = null;
  }

  @Getter
  selectDoor!: ISelectDoor;

  get getSquare(): number {
    return this.calculateSquare();
  }
  get getTotal(): number {
    return this.calculateTotal();
  }
}
</script>

<style>
</style>