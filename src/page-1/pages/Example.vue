<script lang="ts" setup>
// components
import Example from "@/components/templates/Example.vue";

// enums
import { Route } from "@/enums/Route";
</script>

<template>
  <Example :title="Route.PAGE_1" />
</template>

<style lang="scss" scoped></style>
