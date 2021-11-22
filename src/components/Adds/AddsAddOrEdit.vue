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
    <v-row v-else justify="center">
      <v-card
        width="100%"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{
              `${
                this.isEdit ? "Редактировать" : "Создать"
              } дополнительные параметры`
            }}</v-toolbar-title>

            <v-spacer></v-spacer>
          </v-toolbar>

          <template>
            <v-container>
              <v-form ref="form" v-model="valid" class="mt-10 mb-10">
                <v-text-field
                  v-model="additionally.name"
                  :rules="nameRules"
                  label="Наименование"
                  class="mb-10"
                  required
                ></v-text-field>

                <v-select
                  v-model="additionally.type"
                  :items="addsType"
                  label="Тип"
                  item-text="name"
                  item-value="type"
                  return-object
                  class="mb-10"
                ></v-select>

                <v-text-field
                  v-model="additionally.price"
                  :rules="nameRules"
                  label="Стоимость"
                  class="mb-10"
                  required
                ></v-text-field>
                <v-switch
                  class="mb-10"
                  v-model="additionally.status"
                  label="Статус"
                  color="success"
                  hide-details
                ></v-switch>

                <v-btn
                  color="success"
                  class="mr-4"
                  @click="addOrEdit"
                  :loading="isSubmitting"
                >
                  {{ `${this.isEdit ? "Сохранить" : "Создать"}` }}
                </v-btn>

                <v-btn color="error" class="mr-4" @click="close">
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
import { Component, Vue } from 'vue-property-decorator'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
import {IAdditionParams, IAddType} from '../../types/Store'
import {VForm} from '../../types/Main'
import axios from '../../services/axios'
import {errorFunc} from '../../utils/errorFunc'

@Component
export default class AddsAddOrEdit extends Vue {

   private additionally = {
      name: "",
      price: null,
      status: false,
      type: {
        name: '',
        type: ''
      },
      id: "",
    } as IAdditionParams;

    loading = true;
    isSubmitting = false;
    valid = false;
    nameRules:any = [(v) => !!v || "Это поле не может быть пустым"];


 get isEdit(): boolean {
      if (this.$route.params.id) {
        return true;
      } else {
        return false;
      }
    }

    get addOrEdit() {
      if (this.isEdit) {
        return this.editAdditionally;
      } else {
        return this.addNewAdd;
      }
    }

    get form(): VForm {
    return this.$refs.form as VForm
    }


    public async editAdditionally(): Promise<any> {
      this.isSubmitting = true;
      await this.$store.dispatch("editedAdditionally", {
        name: this.additionally.name,
        type: this.additionally.type,
        price: this.additionally.price,
        status: this.additionally.status,
        id: this.additionally.id,
      });
      this.isSubmitting = false;
      this.close();
      this.$forceUpdate()
    }

    public async addNewAdd(): Promise<any> {
      this.form.validate();
      if (this.valid) {
        try {
          this.isSubmitting = true;
          await this.$store
            .dispatch("createAdd", {
              name: this.additionally.name,
              type: this.additionally.type.type,
              price: this.additionally.price,
              status: this.additionally.status,
            })
            .then(() => {
              this.$router.push("/reference/additionally");
            });
          this.isSubmitting = false;
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
        this.isSubmitting = false;
        return;
      }
    }

    public close(): void {
      this.$router.push("/reference/additionally");
    }



  @Getter
  public allAdds!: Array<IAdditionParams>

  @Getter
  public addsType!: Array<IAddType>

  async created() {
    if (this.$route.params.id) {
      try {
        this.loading = true;
        const { data } = await axios.get(
          `/api/v1/additionally/${this.$route.params.id}`
        );
        this.additionally = data;
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
