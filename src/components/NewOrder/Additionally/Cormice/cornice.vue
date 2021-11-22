<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-10 mt-10"> {{this.select.name}}</h2>
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
      <v-btn
          color="blue darken-1"
          text
          @click="closeCreateModal"
      >
        Отмена
      </v-btn>
      <v-btn
          color="blue darken-1"
          text
          @click="saveAddition"
      >
        Сохранить
      </v-btn>
    </v-card-actions>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import {
 CorniceType,
 CorniceForm
} from "../../../../types/Main";

  name: 'cornice'
@Component
export default class Cornice extends Vue {


  @Prop()
  select;

  private cornice = {
    length: 0,
    total: 0,
  } as CorniceType;

  @Action
  public saveAdditionallyInState

    public calculateTotal(): number {
      return this.cornice.total = this.cornice.length * this.select.price
    }

    public closeCreateModal(): void {
      this.$emit('closeCreateModal')
    }

    public saveAddition(): void {
      const form = {
        id: this.select.id,
        name: this.select.name,
        price: this.select.price,
        status: this.select.status,
        type: this.select.type,
        length: this.cornice.length,
        total: this.cornice.total,
      } as CorniceForm

      this.saveAdditionallyInState(form)
      this.closeCreateModal()
      this.cornice.length = 0
      this.cornice.total = 0
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