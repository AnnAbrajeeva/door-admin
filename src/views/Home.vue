<template>
  <v-layout row mt40>
    <v-flex>
      <table-order></table-order>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import TableOrder from "../components/TableOrder.vue";

export default {
  name: 'Home',

  components: {
    TableOrder
  },
}
</script>

