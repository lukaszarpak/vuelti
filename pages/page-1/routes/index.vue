<script lang="ts" setup>
// components
import Example from "../../../components/templates/Example.vue";
import GButton from "../../../components/atoms/Button.vue";

// enums
import { PageName } from "../../../.vuelti/PageName";
import { Route } from "@/pages/page-1/enums/Route";
import { ButtonVariant } from "../../../enums/Button";
</script>

<template>
  <Example :title="PageName.PAGE_1" />
  <Example :title="Route.MAIN" />
  <GButton
    :button-variant="ButtonVariant.TRANSPARENT"
    :href="{
      name: Route.ABOUT,
    }"
  >
    Go to About Route
  </GButton>
</template>

<style lang="scss" scoped></style>
