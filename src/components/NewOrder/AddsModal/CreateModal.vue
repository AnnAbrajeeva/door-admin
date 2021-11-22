<template>
  <v-row justify="center">
    <v-dialog v-model="createModal" persistent max-width="600px">
      <v-card>
        <v-card-text>
          <v-container>
            <component
              @closeCreateModal="closeCreateModal"
              :select="select"
              v-if="this.select"
              v-bind:is="this.select.type.toLowerCase()"
            ></component>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import transoms from "../Additionally/Transoms/transoms.vue";
import castle from "../Additionally/Castle/castle.vue";
import cornice from "../Additionally/Cormice/cornice.vue";
import cube from "../Additionally/Cube/cube.vue";
import platband from "../Additionally/Platband/platband.vue";
import pimpernel from "../Additionally/Pimpernel/pimpernel.vue";
import { IAdditionally } from "../../../types/Store";

@Component({
  components: {
    transoms,
    castle,
    cornice,
    cube,
    platband,
    pimpernel,
  },
})
export default class CreateModal extends Vue {

  @Prop()
  createModal!: boolean;
  @Prop()
  select!: IAdditionally;

  public closeCreateModal(): void {
    this.$emit("closeCreateModal");
  }
}
</script>
