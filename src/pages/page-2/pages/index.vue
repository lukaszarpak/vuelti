<script lang="ts" setup>
// components
import Example from "@/components/templates/Example.vue";

// enums
import { PageName } from "@/enums/PageName";
import { Page1RouteName } from "@/enums/RouteName";
</script>

<template>
  <Example :title="PageName.PAGE_1" />
  <Example :title="Page1RouteName.MAIN" />
</template>

<style lang="scss" scoped></style>
