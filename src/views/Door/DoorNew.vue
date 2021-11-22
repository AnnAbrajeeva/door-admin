<template>
  <door-add-or-edit />
</template>

<script lang="ts">
import Vue from "vue";
import DoorAddOrEdit from "../../components/Doors/DoorAddOrEdit.vue";

export default Vue.extend({
name: "doorNew",
  components: {
    DoorAddOrEdit,
  },
});
</script>