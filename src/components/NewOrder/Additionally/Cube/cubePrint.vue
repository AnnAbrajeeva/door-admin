<template>
    <v-row>

      <!-- Колличество -->
      <v-col cols="12" sm="6" md="6">
        <v-text-field readonly label="Колличество" outlined v-model="add.number">
          <span slot="append">шт.</span>
        </v-text-field>
      </v-col>
      <!-- Колличество -->


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

name: "cubePrint";
@Component
export default class cubePrint extends Vue {

@Prop()
add

}
</script>

<style>
</style>