<template>
  <v-layout>
    <div class="loader-wrapper" v-if="loading" row>
      <ring-loader
        class="loader"
        color="#36D7B7"
        loading="loading"
        :size="150"
        sizeUnit="px"
      ></ring-loader>
    </div>
    <v-row v-if="!loading" justify="center">
      <v-card
        width="100%"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{
              `${this.isEdit ? "Редактировать" : "Создать новую"} дверь`
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <template>
            <v-container>
              <v-form ref="form" v-model="valid" class="mt-10 mb-10">
                <v-text-field
                  v-model="door.name"
                  :rules="nameRules"
                  label="Наименование"
                  class="mb-10"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="door.price"
                  :rules="nameRules"
                  label="Стоимость"
                  class="mb-10"
                  required
                ></v-text-field>
                <v-switch
                  class="mb-10"
                  v-model="door.status"
                  label="Статус"
                  color="success"
                  hide-details
                ></v-switch>

                <v-btn
                  color="success"
                  class="mr-4"
                  @click="this.viewMethod"
                  :disabled="load"
                  :loading="load"
                >
                  {{ `${this.isEdit ? "Сохранить" : "Создать"}` }}
                </v-btn>

                <v-btn
                  color="error"
                  class="mr-4"
                  @click="close"
                  :disabled="load"
                  :loading="load"
                >
                  Отменить
                </v-btn>
              </v-form>
            </v-container>
          </template>
        </v-card>
      </v-card>
    </v-row>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IDoor } from "../../types/Store";
import axios from "../../services/axios";
import { mapGetters } from "vuex";
import { errorFunc } from "../../utils/errorFunc";
import {VForm} from '../../types/Main'

name: "DoorAddOrEdit"

@Component
export default class DoorAddOrEdit extends Vue {
  private door = {
    name: "",
    price: null,
    status: false,
    id: "",
  } as IDoor;
  private valid = false;
  private nameRules = [(v) => !!v || "Это поле не может быть пустым"];
  private loading = true;
  private load = false;

  public close(): void {
    this.$router.push("/reference/door");
  }

  public editDoor(): void {
    this.$store.dispatch("editedDoor", {
      name: this.door.name,
      price: this.door.price,
      status: this.door.status,
      id: this.door.id,
    });
    this.close();
    this.$forceUpdate()
  }

  public async addNewDoor(): Promise<any> {
    this.form.validate();
    if (this.valid) {
      try {
        await this.$store
          .dispatch("createDoor", {
            name: this.door.name,
            price: this.door.price,
            status: this.door.status,
          })
          .then(() => {
            this.$router.push("/reference/door");
          });
          this.$forceUpdate()
      } catch (error) {
        let msg = errorFunc(this.$store.state.error);
        this.loading = false;
        let toast = this.$toasted.show(msg, {
          theme: "bubble",
          position: "top-center",
          duration: 5000,
        });
      }
    } else {
      return;
    }
  }

  get isEdit(): boolean {
    if (this.$route.params.id) {
      return true;
    } else {
      return false;
    }
  }

  get viewMethod() {
    if (this.isEdit) {
      return this.editDoor;
    } else {
      return this.addNewDoor;
    }
  }

  get form(): VForm {
    return this.$refs.form as VForm;
  }

  async created() {
    if (this.isEdit) {
      this.loading = true;
      try {
        let { data } = await axios.get(`/api/v1/door/${this.$route.params.id}`);
        this.door = data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.$router.push({ name: "notFound" });
      }
    } else {
      this.loading = false;
    }
  }
}
</script>


<style>
.loader-wrapper {
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  position: absolute;
  top: 50%;
  z-index: 999;
}
</style>
