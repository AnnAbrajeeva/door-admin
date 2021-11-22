<template>
    <v-row>

      <!-- Длина -->
      <v-col cols="12" sm="6" md="6">
        <v-text-field readonly label="Длина" outlined v-model="add.length">
          <span slot="append">м.</span>
        </v-text-field>
      </v-col>
      <!-- Длина -->


      <v-col cols="12" sm="6" md="6">
        <v-text-field readonly label="Цена" v-model="add.total" outlined>
          <span slot="append">сум</span>
        </v-text-field>
      </v-col>
    </v-row>

</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { IAdditionParams } from "../../../../types/Store";
import { PlatbandType, PlatbandForm } from "../../../../types/Main";
import { ISelectDoor } from "../../../../types/Store";

name: "platbandPrint";
@Component
export default class PlatbandPrint extends Vue {

@Prop()
add!: PlatbandForm
}
</script>

<style>
</style>