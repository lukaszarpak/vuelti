<script lang="ts" setup>
// components
import Example from "@/components/templates/Example.vue";
import GButton from "@/components/atoms/Button.vue";

// enums
import { PageName } from "@/enums/PageName";
import { Page1RouteName } from "@/enums/RouteName";
import { ButtonVariant } from "@/enums/Button";
</script>

<template>
  <Example :title="PageName.PAGE_1" />
  <Example :title="Page1RouteName.MAIN" />
  <GButton
    :button-variant="ButtonVariant.TRANSPARENT"
    :href="{
      name: Page1RouteName.ABOUT,
    }"
  >
    Go to About Route
  </GButton>
</template>

<style lang="scss" scoped></style>
