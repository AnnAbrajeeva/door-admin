<template>
  <v-container>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Меню </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.url">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>

      <v-list-item class="hidden-sm-and-down">
        <v-btn v-for="item in items" :key="item.title" :to="item.url">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-list-item>

      <v-spacer></v-spacer>

      <v-btn v-if="isLoggedIn" @click="logout">
        <v-icon left>mdi-exit-to-app</v-icon>
        Выход
      </v-btn>
    </v-app-bar>
  </v-container>
</template>


<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { HeadersLink } from "../types/Main";

name: "Header";

@Component({})
export default class DoorParam extends Vue {
  private items: HeadersLink[] = [
    { title: "Dashboard", icon: "mdi-view-dashboard", url: "/" },
    { title: "Заказ", icon: "mdi-clipboard-plus-outline", url: "/new" },
    { title: "Справочники", icon: "mdi-book-outline", url: "/reference" },
  ];
  drawer = false;

  public logout(): void {
    this.$store.commit("logout");
    this.$router.push({ name: "login" });
  }

  get isLoggedIn(): boolean {
    return this.$store.getters.isAuthenticated;
  }
}
</script>