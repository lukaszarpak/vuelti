<script lang="ts" setup>
// components
import Example from "../../../../components/templates/Example.vue";

// enums
import { PageName } from "../../../../.vuelti/PageName";
import { Route } from "@/pages/page-1/enums/Route";
</script>

<template>
  <Example :title="PageName.PAGE_1" />
  <Example :title="Route.ABOUT" />
</template>

<style lang="scss" scoped></style>
