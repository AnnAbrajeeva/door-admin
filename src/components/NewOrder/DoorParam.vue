<template>
  <v-container>
    <v-row>
      <!-- Дверь -->
      <v-col class="d-flex" cols="12" sm="10">
        <v-select
          label="Двери"
          outlined
          v-model="getSelectDoor"
          :items="this.allDoors"
          item-text="name"
          item-value="price"
          return-object
          single-line
        ></v-select>
      </v-col>
      <!-- Дверь -->

      <v-col cols="12" sm="6" md="2">
        <v-text-field
          label="Колличество"
          outlined
          value="1"
          v-model="getDoorCount"
          type="number"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <!-- Длина -->
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          label="Длина"
          outlined
          v-model="getDoorLength"
          type="number"
        >
          <span slot="append">м</span>
        </v-text-field>
      </v-col>
      <!-- Длина -->

      <!-- Ширина -->
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          label="Ширина"
          outlined
          type="number"
          v-model="getDoorWidth"
        >
          <span slot="append">м</span>
        </v-text-field>
      </v-col>
      <!-- Ширина -->

      <!-- Площадь -->
      <v-col cols="12" sm="6" md="3">
        <v-text-field label="Площадь" v-model="getDoorSquare" outlined>
          <span slot="append">м<sup>2</sup></span>
        </v-text-field>
      </v-col>
      <!-- Площадь -->

      <!-- Цена за дверь без дополнений -->
      <v-col cols="12" sm="6" md="3">
        <v-text-field label="Итого" v-model="getDoorPrice" outlined>
          <span slot="append">сум</span>
        </v-text-field>
      </v-col>
      <!-- Цена за дверь без дополнений -->
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { IDoor, ISelectDoor } from "../../types/Store";

name: "DoorParam";

@Component({})
export default class DoorParam extends Vue {
  allDoors: IDoor[] = [];
  numberRules = [
    (v) => !!v || "Это поле не может быть пустым",
    (v) => /^[ 0-9]+$/.test(v) || "Введите верное число",
  ];

  @Watch("getDoorSquare") changeGetDoorSquare(value) {
    this.$store.dispatch('setDoorSquare', value);
  }

  @Watch("getDoorPrice") changeGetDoorPrice(value) {
    this.$store.dispatch('setDoorPrice', value);
  }

  @Getter
  selectDoor!: ISelectDoor;

  get getDoorSquare(): number {
    if (this.selectDoor.length && this.selectDoor.width) {
      return this.selectDoor.length * this.selectDoor.width;
    } else {
      return 0;
    }
  }

  get getDoorPrice(): number {
    if (
      this.selectDoor.count &&
      this.selectDoor.price &&
      this.selectDoor.square
    ) {
      return (
        this.selectDoor.count * (this.selectDoor.price * this.selectDoor.square)
      );
    } else {
      return 0;
    }
  }

  get getSelectDoor() {
    return this.selectDoor;
  }
  set getSelectDoor(value) {
    this.$store.dispatch('setSelectDoor', value);
  }

  get getDoorCount() {
    return this.selectDoor.count;
  }
  set getDoorCount(value) {
    this.$store.dispatch('setDoorCount', value);
  }

  get getDoorLength() {
    return this.selectDoor.length;
  }
  set getDoorLength(value) {
    this.$store.dispatch('setDoorLength', value);
  }

  get getDoorWidth() {
    return this.selectDoor.width;
  }
  set getDoorWidth(value) {
    this.$store.dispatch('setDoorWidth', value);
  }

  async created() {
    const doors = await this.$store.dispatch("getAllDoors");
    this.allDoors = doors;
  }
}
</script>

<style scoped>
</style>
