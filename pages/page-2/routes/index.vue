<script lang="ts" setup>
// components
import Example from "../../../components/templates/Example.vue";

// enums
import { PageName } from "../../../.vuelti/PageName";
import { Route } from "@/pages/page-2/enums/Route";
</script>

<template>
  <Example :title="PageName.PAGE_2" />
  <Example :title="Route.MAIN" />
</template>

<style lang="scss" scoped></style>
