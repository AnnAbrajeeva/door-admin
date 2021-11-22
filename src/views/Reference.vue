<template>
  <v-layout>
    <reference-nav></reference-nav>
  </v-layout>
</template>



<script lang="ts">
import Vue from "vue";
import ReferenceNav from "../components/ReferenceNav.vue";

export default Vue.extend({
  components: { ReferenceNav },

  name: "Reference",
 
});
</script>


<style scoped>
a {
  text-decoration: none;
}
</style>