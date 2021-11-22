<template>
  <v-col cols="12" sm="12">
    <v-card>
      <v-subheader :inset="inset">Навигация</v-subheader>
      <v-list>
        <template v-for="(item, index) in items" >
          <router-link v-if="item.path" :to="item.path" :key="index">
            <v-list-item
                v-if="item.action"
                :key="item.title"
            >
              <v-list-item-action>
                <v-icon>{{ item.action }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="inset"
          ></v-divider>
          </router-link>
        </template>
      </v-list>
    </v-card>
  </v-col>
</template>


<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import {ReferenceLink} from '../types/Main'

   name: "Reference"

@Component({})
export default class Reference extends Vue {
  
      inset = true
      items = [
        {
          action: 'mdi-label',
          title: 'Двери',
          path: {name: 'Door'}
        } as ReferenceLink,
        {
          divider: true,
        },
        {
          action: 'mdi-label',
          title: 'Дополнительно',
          path: {name: 'Additionally'}
        } as ReferenceLink,
      ] 
}
</script>


<style scoped>
a {
  text-decoration: none;
}
</style>