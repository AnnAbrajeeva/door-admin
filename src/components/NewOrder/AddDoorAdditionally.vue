<template>
  <v-container>
    <div v-if="this.selectDoor.total">
      <h2 class="mb-5 mt-10">Дополнительные параметры</h2>
      <v-row>
        <!-- Дополнительные параметры -->
        <v-col class="d-flex" cols="12" sm="10">
          <v-select
            label="Выберите дополнительные параметры"
            outlined
            v-model="select"
            :items="this.allAdditionally"
            item-text="name"
            item-value="price"
            return-object
            single-line
          ></v-select>
        </v-col>
        <!-- Дверь -->

        <v-col cols="12" sm="6" md="2">
          <v-btn :disabled="!select" class="btnAdd" outlined @click="openCreateModal"
            >Добавить</v-btn
          >
          <create-modal
            :select="select"
            :createModal="createModal"
            @closeCreateModal="closeCreateModal"
          ></create-modal>
        </v-col>
      </v-row>

      <div v-if="this.selectDoor.additionally.length > 0">
        <div v-for="add in this.selectDoor.additionally" :key="add.id">
          <h3 class="ml-3 mb-3">{{ add.name }}</h3>

          <edit-modal 
            v-if="editObj"
            :editModal="editModal"
            :add="editObj"
            @closeEditModal="closeEditModal"
          ></edit-modal>

          <v-col class="d-flex align-baseline flex-md-wrap" cols="12">
            <component
              :add="add"
              v-if="add"
              :is="add.type.toLowerCase() + '-print'"
            ></component>

            <v-col class="d-flex justify-end" cols="2">
              <v-btn
                @click="delAdd(add.id)"
                class="mx-2 align-content-end"
                fab
                dark
                color="indigo"
              >
                <v-icon dark> mdi-minus </v-icon>
              </v-btn>
              <v-btn @click="editAdd(add)" class="mx-2" fab dark color="indigo">
                <v-icon dark> mdi-pencil-outline </v-icon>
              </v-btn>
            </v-col>
          </v-col>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import CreateModal from "./AddsModal/CreateModal.vue";
import castlePrint from "./Additionally/Castle/castlePrint.vue";
import cornicePrint from "./Additionally/Cormice/cornicePrint.vue";
import cubePrint from "./Additionally/Cube/cubePrint.vue";
import pimpernelPrint from "./Additionally/Pimpernel/pimpernelPrint.vue";
import platbandPrint from "./Additionally/Platband/platbandPrint.vue";
import transomsPrint from "./Additionally/Transoms/transomsPrint.vue";
import EditModal from "./AddsModal/EditModal.vue";
import { IAdditionally, ISelectDoor } from "../../types/Store";

  name: "addDoorAdditionally"

@Component({
  components: {
   EditModal,
    CreateModal,
    castlePrint,
    cornicePrint,
    cubePrint,
    pimpernelPrint,
    platbandPrint,
    transomsPrint,
  },
})
export default class AddsModal extends Vue {


      allAdditionally: IAdditionally[] = []
      select: IAdditionally | null = null
      createModal = false
      editModal = false
      editObj: IAdditionally | null = null
  


  @Action
  setSelectAdditionally
  deleteAddFromSelectDoor

    
    public openCreateModal(): void {
      this.createModal = true;
    }

    public closeCreateModal(): void {
      this.createModal = false;
      this.select = null;
    } 

    public closeEditModal(): void {
      this.editObj = null
      this.editModal = false;
      this.select = null;
    }

    public editAdd(obj): void {
      this.editObj = obj
      this.editModal = true;
    }

    public delAdd(id): void {
      this.deleteAddFromSelectDoor(id);
    }

  @Getter
  selectDoor!: ISelectDoor

  async created() {
    const adds = await this.$store.dispatch("getAllAdds");
    this.allAdditionally = adds;
  }
}
</script>

<style scoped>
.btnAdd {
  height: 55px !important;
  width: 100%;
}
</style>
