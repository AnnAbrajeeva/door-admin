<template>
  <v-app>
    <component :is="`${layout}-layout`" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import AuthLayout from "./layouts/AuthLayout.vue";
import MainLayout from "./layouts/MainLayout.vue";

name: "App";

@Component({
  components: {
    AuthLayout,
    MainLayout,
  },
})
export default class App extends Vue {
  get layout() {
    if (this.$route.meta) {
      return this.$route.meta.layout || 'main';
    }
  }
}
</script>
