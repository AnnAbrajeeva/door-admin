<template>
  <div>
    <Header></Header>
    <v-main class="mt-10">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import Header from "../components/Header.vue";
export default {
  components: { Header },
  name: "MainLayout",
};
</script>
