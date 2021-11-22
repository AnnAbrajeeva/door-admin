<template>
    <adds-add-or-edit />
</template>

<script lang="ts">
import AddsAddOrEdit from '../../components/Adds/AddsAddOrEdit.vue'
import Vue from 'vue'
export default Vue.extend({
    name: "additionallyNew",
    components: {
        AddsAddOrEdit
    }
})
</script>