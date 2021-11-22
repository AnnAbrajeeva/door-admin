<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-10 mt-10">{{ this.cornice.name }}</h2>
      </v-col>

      <!-- Длина -->
      <v-col cols="12">
        <v-text-field label="Длина" outlined v-model="cornice.length">
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
      <v-btn color="blue darken-1" text @click="closeEditModal"> Отмена </v-btn>
      <v-btn color="blue darken-1" text @click="edit"> Сохранить </v-btn>
    </v-card-actions>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";
import {
 CorniceForm
} from "../../../../types/Main";

  name: 'corniceEdit'
@Component
export default class CorniceEdit extends Vue {

  @Prop()
  id

  private cornice = {} as CorniceForm
  
    public calculateTotal(): number {
      return this.cornice.total = this.cornice.length * this.cornice.price
    }

    public closeEditModal(): void {
      this.$emit('closeEditModal')
    }

    public edit(): void {
      this.$store.dispatch('updateAdditionallyInState', this.cornice)
      this.closeEditModal()
    }

  public created(): void {
    const cornice = this.selectDoor.additionally.find(add => add.id === this.id)
    if (cornice) {
      this.cornice = cornice
    }
  }


  @Getter
  selectDoor
    
    get getTotal(): number {
      return this.calculateTotal()
    }
  
}
</script>

<style>
</style>