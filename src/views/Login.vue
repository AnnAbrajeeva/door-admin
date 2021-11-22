<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid> 
        <login-form />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import LoginForm from "../components/LoginForm.vue";


export default Vue.extend({
  name: "AppLogin",
  components: {
    LoginForm
  },
    
});
</script>