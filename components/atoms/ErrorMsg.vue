<script lang="ts" setup>
// enums
import { ErrorMsgVariant } from "../../enums/ErrorMsgVariant";

interface Props {
  errorMessage: string;
  variant?: ErrorMsgVariant;
  centered?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: ErrorMsgVariant.ERROR,
  centered: false,
});
</script>

<template>
  <div
    class="error-msg"
    :class="[`error-msg--${variant}`, { 'error-msg--centered': centered }]"
  >
    {{ errorMessage }}
  </div>
</template>

<style lang="scss" scoped>
.error-msg {
  background-color: theme("colors.gray.100");
  border-top: 2px solid;
  padding: 0.3125rem;
  width: 100%;
  margin: 0.5rem 0;
  font-size: theme("fontSize.sm");
  font-weight: theme("fontWeight.medium");

  &--error {
    border-top-color: theme("colors.red.500");
    color: theme("colors.red.500");
  }

  &--success {
    border-top-color: theme("colors.green.500");
    color: theme("colors.green.500");
  }

  &--warning {
    border-top-color: theme("colors.yellow.500");
    color: theme("colors.yellow.500");
  }

  &--transparent {
    background-color: transparent;
  }

  &--centered {
    text-align: center;
  }
}
</style>
