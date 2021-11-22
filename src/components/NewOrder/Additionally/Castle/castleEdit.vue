<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-10 mt-10">{{ this.castle.name }}</h2>
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
      <v-btn color="blue darken-1" text @click="closeEditModal"> Отмена </v-btn>
      <v-btn color="blue darken-1" text @click="edit"> Сохранить </v-btn>
    </v-card-actions>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Getter} from "vuex-class";
import { CastleForm } from "../../../../types/Main";

name: "castleEdit";
@Component
export default class CastleEdit extends Vue {
  private castle = {} as CastleForm;

  @Prop()
  id

  public calculateTotal(): number {
    return (this.castle.total = this.castle.number * this.castle.price);
  }

  public closeEditModal(): void {
    this.$emit("closeEditModal");
  }

  public edit(): void {
    this.$store.dispatch("updateAdditionallyInState", this.castle);
    this.closeEditModal();
  }

  public created(): void {
    const castle = this.selectDoor.additionally.find(
      (add) => add.id === this.id
    );
    if (castle) {
      this.castle = castle;
    }
  }

  get getTotal():number {
    return this.calculateTotal();
  }

  @Getter
  selectDoor;
}

</script>

<style>
</style>