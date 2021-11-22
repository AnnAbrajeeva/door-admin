<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-10 mt-10">{{ this.trans.name }}</h2>
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
      <v-btn color="blue darken-1" text @click="closeEditModal"> Отмена </v-btn>
      <v-btn color="blue darken-1" text @click="edit"> Сохранить </v-btn>
    </v-card-actions>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { IAdditionParams, ISelectDoor } from "../../../../types/Store";
import { TransomsType, TransomsForm } from "../../../../types/Main";

name: "transomsEdit";
@Component
export default class TransomsEdit extends Vue {
  @Prop()
  id!: string;

  private trans = {} as TransomsForm;

  public calculateSquare(): number {
    if (this.selectDoor.length && this.selectDoor.width && this.trans.deep) {
      return (this.trans.square =
        this.selectDoor.length * this.selectDoor.width * this.trans.deep);
    } else {
      return 0;
    }
  }

  public calculateTotal(): number {
    if (this.trans.square && this.trans.price) {
      return (this.trans.total = this.trans.square * this.trans.price);
    } else {
      return 0;
    }
  }

  closeEditModal(): void {
    this.$emit("closeEditModal");
  }

  public edit(): void {
    this.$store.dispatch("updateAdditionallyInState", this.trans);
    this.closeEditModal();
  }

  created(): void {
    const trans = this.selectDoor.additionally.find(
      (add) => add.id === this.id
    );
    if (trans) {
      this.trans = trans;
    }
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