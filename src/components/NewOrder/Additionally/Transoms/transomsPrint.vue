<template>
  <v-row>
    <!-- Глубина -->
    <v-col cols="12" sm="6" md="4">
      <v-text-field readonly label="Глубина" outlined v-model="add.deep">
        <span slot="append">м</span>
      </v-text-field>
    </v-col>
    <!-- Глубина -->

    <!-- Площадь -->
    <v-col cols="12" sm="6" md="4">
      <v-text-field readonly label="Площадь" outlined v-model="add.square">
        <span slot="append">м</span>
      </v-text-field>
    </v-col>
    <!-- Площадь -->

    <v-col cols="12" sm="6" md="4">
      <v-text-field readonly label="Итого" v-model="add.total" outlined>
        <span slot="append">сум</span>
      </v-text-field>
    </v-col>
  </v-row>
</template>


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import { IAdditionParams, ISelectDoor } from "../../../../types/Store";
import { TransomsType, TransomsForm } from "../../../../types/Main";

name: "transomsPrint";
@Component
export default class transomsPrint extends Vue {
  @Prop()
  add!: TransomsForm;
}
</script>

<style>
</style>