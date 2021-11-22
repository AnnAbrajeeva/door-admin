<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-10 mt-10">{{ this.pimpernel.name }}</h2>
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
      <v-btn color="blue darken-1" text @click="closeEditModal"> Отмена </v-btn>
      <v-btn color="blue darken-1" text @click="edit"> Сохранить </v-btn>
    </v-card-actions>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { PimpernelType, PimpernelForm } from "../../../../types/Main";

name: "pimpernelEdit";
@Component
export default class PimpernelEdit extends Vue {
  @Prop()
  id;

  private pimpernel = {} as PimpernelForm;

  @Action
  saveAdditionallyInState;

  public calculateTotal(): number {
    return (this.pimpernel.total =
      this.pimpernel.number * this.pimpernel.price);
  }

  closeEditModal(): void {
    this.$emit("closeEditModal");
  }

  edit(): void {
    this.$store.dispatch("updateAdditionallyInState", this.pimpernel);
    this.closeEditModal();
  }

  created(): void {
    const pimpernel = this.selectDoor.additionally.find(
      (add) => add.id === this.id
    );
    if (pimpernel) {
      this.pimpernel = pimpernel;
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