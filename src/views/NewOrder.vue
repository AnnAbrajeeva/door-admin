<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <v-form v-model="valid" ref="form" @submit.prevent="submit">
          <!--        Информация о клиенте-->
          <v-row>
            <!-- клиент -->
            <v-col cols="12" sm="6" md="2">
              <v-text-field
                label="Клиент"
                outlined
                :rules="nameRules"
                v-model="client"
                @input="getClient"
              ></v-text-field>
            </v-col>
            <!-- клиент -->

            <!-- Телефон -->
            <v-col cols="12" sm="6" md="2">
              <v-text-field
                label="Телефон"
                required
                outlined
                type="tel"
                :rules="phoneRules"
                @input="getPhone"
                v-model.trim="phone"
              ></v-text-field>
            </v-col>
            <!-- Телефон -->

            <!-- Дата -->
            <v-col cols="12" sm="6" md="2">
              <v-menu
                v-model="openGetDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="getDate"
                    label="Создан"
                    append-icon="mdi-calendar"
                    outlined
                    required
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="getDate"
                  @input="openGetDate = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <!-- //Дата -->

            <!-- Дата окончания -->
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="openGetRangeDates"
                v-model="openGetRangeDates"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    v-model="dateRangeText"
                    label="Начальная и конечная дата"
                  ></v-text-field>
                </template>

                <v-date-picker v-model="rangeDates" no-title scrollable range>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="openGetRangeDates = false"
                  >
                    Отменить
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="getRangeDates(rangeDates)"
                  >
                    Сохранить
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <!-- //Дата -->

            <!-- Итого -->
            <v-col cols="12" sm="6" md="2">
              <v-text-field
                readonly
                label="Итого"
                v-model="finishTotal"
                outlined
              ></v-text-field>
            </v-col>
            <!-- Итого -->
          </v-row>

          <!--   //     Информация о клиенте-->

          <!-- Модалка на двери -->

          <v-row justify="center">
            <v-dialog
              v-model="doorModal"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Добавить дверь
                </v-btn>
              </template>
              <v-card>
                <v-toolbar dark color="primary">
                  <v-btn icon dark @click="doorModal = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                  <v-toolbar-title>Параметры</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-toolbar-items>
                    <v-btn dark text @click="addDoorParams">Сохранить</v-btn>
                  </v-toolbar-items>
                </v-toolbar>

                <!--Параметры двери-->
                <door-param :key="Math.random()"></door-param>
                <!-- //Параметры двери-->

                <!--Дополнительные параметры-->

                <add-door-additionally
                  :key="Math.random()"
                ></add-door-additionally>
              </v-card>
            </v-dialog>
          </v-row>

          <door-table :key="Math.random()"></door-table>

          <v-btn type="submit" class="mt-10 primary"> Создать заказ</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import DoorParam from "../components/NewOrder/DoorParam.vue";
import addDoorAdditionally from "../components/NewOrder/AddDoorAdditionally.vue";
import DoorTable from "../components/NewOrder/DoorTable.vue";
import { INewOrderComp } from "../types/Main";
import { IStoreOrders, ISelectDoor, IAdditionParams, IAdditionally } from "../types/Store";
import store from "../store/index";


name: "NewOrder"

@Component({
   components: {
    DoorTable,
    DoorParam,
    addDoorAdditionally,
  }
})
export default class NewOrder extends Vue {
      doorModal = false
      dialog = false
      valid = false
      client = ""
      phone = ""
      openGetDate = false
      openGetRangeDates = false
      rangeDates: string[] = ["", ""]
      total = ""
      nameRules = [(v: string) => !!v || "Это поле не может быть пустым"]
      phoneRules = [
        (v: string) => !!v || "Это поле не может быть пустым",
        (v: string) => /^[+0-9]+$/.test(v) || "Введите верный номер",
      ]

  @Getter
  stateOrder
  selectDoor


    get finishTotal(): number {
      let doorPrice = 0;
      let adds = 0;
      let result = 0;

      if (this.stateOrder.doors.length > 0) {
        this.stateOrder.doors.forEach((elem: ISelectDoor) => {
          doorPrice = elem.total;
          elem.additionally.forEach((elem: IAdditionally) => {
            adds += elem.total;
          });
        });
        result = doorPrice + adds;
        return result;
      } else {
        return 0;
      }
    }

    get dateRangeText() {
      return this.rangeDates.join(" - ");
    }

   
      get getDate() {
        return this.stateOrder.date;
      }
      set getDate(value: string) {
        store.dispatch('updateDate', value);
      }
   
  @Action
  updateDate

    public getRangeDates(date: Array<string>) {
      store.dispatch('saveRangeDates', date);
      this.openGetRangeDates = false;
    }
    public getClient(value: string) {
      store.dispatch("updateClient", value);
    }
    public getPhone(value: string) {
      store.dispatch("updatePhone", value);
    }

    async submit() {
      (this.$refs.form as Vue & { validate: () => boolean }).validate()

      if (!this.valid) {
        return;
      }
      store.dispatch("addOrder");
      this.$router.push("/");
    }

    addDoorParams(): void {
      store.dispatch("saveDoorInOrder");
      this.doorModal = false;
    } 
}
</script>

<style lang="scss" scoped>
</style>
