<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-10 mt-10">{{ this.cube.name }}</h2>
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
      <v-btn color="blue darken-1" text @click="closeEditModal"> Отмена </v-btn>
      <v-btn color="blue darken-1" text @click="edit"> Сохранить </v-btn>
    </v-card-actions>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { IAdditionParams } from "../../../../types/Store";
import { CubeForm, CubeType } from "../../../../types/Main";

name: "cubeEdit";
@Component
export default class CubeEdit extends Vue {
  @Prop()
  id;

  private cube = {} as CubeForm;

  public calculateTotal(): number {
    return (this.cube.total = this.cube.number * this.cube.price);
  }

  public closeEditModal(): void {
    this.$emit("closeEditModal");
  }

  public edit(): void {
    this.$store.dispatch("updateAdditionallyInState", this.cube);
    this.closeEditModal();
  }

  created() {
    const cube = this.selectDoor.additionally.find((add) => add.id === this.id);
    if (cube) {
      this.cube = cube;
    }
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