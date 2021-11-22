<template>
  <div class="loader-wrapper" v-if="this.loading" row>
    <ring-loader
      class="loader"
      color="#36D7B7"
      loading="loading"
      :size="150"
      sizeUnit="px"
    ></ring-loader>
  </div>
  <v-layout v-else row mt40>
    <v-flex>
      <v-row class="mb-10">
        <v-btn
          @click="$router.go(-1)"
          color="primary"
          dark
          class="mb-2 d-block"
        >
          <v-icon left dark> mdi-arrow-left-thick </v-icon>
          Назад
        </v-btn>

        <v-btn @click="print" color="primary" dark class="mb-2 ml-auto d-block">
          Печать
        </v-btn>
      </v-row>

      <div id="print" class="mb-10">
        <order-info :order="order" />

        <door-info :order="order" />

        <adds-info :order="order" />

        <v-divider class="mt-10 mb-10 fat"></v-divider>
      </div>
    </v-flex>
  </v-layout>
  <!-- Таблица -->
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import axios from "../services/axios";
import { mapGetters } from "vuex";
import OrderInfo from "../components/Order/OrderInfo.vue";
import DoorInfo from "../components/Order/DoorInfo.vue";
import AddsInfo from "../components/Order/AddsInfo.vue";
import { PropType } from "vue";
import { IOrdersResponse } from "../types/Store";
import { IOrderComp } from "../types/Main";

name: "Order"

@Component({
  components: {
    OrderInfo,
    DoorInfo,
    AddsInfo,
  }
  })
export default class Order extends Vue {
@Prop({ type: String, default: ''})
printing

        order = {} as IOrdersResponse
        loading = true
  
  
  async created() {

    try {
      const { data }: { data: IOrdersResponse } = await axios.get(
        `/api/v1/order/find-by-contract/${this.$route.params.id}`
      );
      this.order = data;
      this.loading = false;
    } catch (error: any) {
      this.loading = false;
      this.$router.push({ name: "notFound" });
    }
  }

  updated(): void {
    if (!this.loading && this.printing) {
      this.print();
    }
  }

 
    print(): void {
      const prtHtml = document.getElementById("print");
      let stylesHtml = "";
      for (const node of [
        ...document.querySelectorAll('link[rel="stylesheet"], style'),
      ]) {
        stylesHtml += node.outerHTML;
      }

      const WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );
      if (WinPrint && prtHtml) {
        WinPrint.document.write(`<!DOCTYPE html>
        <html>
        <head>
            ${stylesHtml}
        </head>
        <body>
            ${prtHtml.innerHTML}
        </body>
        </html>`);

        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
        WinPrint.close();
      }
    } 
}
</script>


<style scoped>
.loader-wrapper {
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media print {
  table {
    display: block;
  }
}
</style>
