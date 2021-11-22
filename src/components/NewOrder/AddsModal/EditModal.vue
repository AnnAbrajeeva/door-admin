<template>
  <v-row justify="center" v-if="add">
    <v-dialog v-model="editModal" persistent max-width="600px">
      <v-card>
        <v-card-text>
          <v-container>
            <component 
              :id="add.id"
              @closeEditModal="closeEditModal"
              v-bind:is="add.type.toLowerCase() + '-edit'"
            ></component>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import transomsEdit from "../Additionally/Transoms/transomsEdit.vue";
import castleEdit from "../Additionally/Castle/castleEdit.vue";
import corniceEdit from "../Additionally/Cormice/corniceEdit.vue";
import cubeEdit from "../Additionally/Cube/cubeEdit.vue";
import platbandEdit from "../Additionally/Platband/platbandEdit.vue";
import pimpernelEdit from "../Additionally/Pimpernel/pimpernelEdit.vue";
import { IAdditionally } from "../../../types/Store";

@Component({
  components: {
    transomsEdit,
    castleEdit,
    corniceEdit,
    cubeEdit,
    platbandEdit,
    pimpernelEdit,
  }
})
export default class EditModal extends Vue {
  @Prop()
  editModal!: boolean;
  @Prop()
  add!: IAdditionally;

  
  public closeEditModal(): void {
      this.$emit("closeEditModal");
    }
}
</script>

  

  <style scoped>
</style>
