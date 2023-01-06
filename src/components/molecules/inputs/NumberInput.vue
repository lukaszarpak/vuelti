<script lang="ts" setup>
import { computed } from "vue";

// components
import GErrorMsg from "@/components/atoms/ErrorMsg.vue";

// interfaces
import type { ErrorObject } from "@vuelidate/core";

interface Props {
  value: number;
  errors?: ErrorObject[];
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  floatingLabel?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
  disabled: false,
  name: "",
  placeholder: "",
  floatingLabel: false,
});
const emit = defineEmits(["update:value"]);

const modelValue = computed({
  get: () => props.value,
  set: (newValue: number) => emit("update:value", newValue),
});
</script>

<template>
  <div>
    <label
      class="g-number-input-wrapper"
      :class="{ 'floating-label': props.floatingLabel }"
    >
      <slot name="text-before" />
      <input
        v-model="modelValue"
        class="number-input"
        type="number"
        :disabled="disabled"
        :placeholder="placeholder"
        :name="name"
      />
      <span v-if="props.floatingLabel" class="floating-label__content">
        <slot name="floating-label" />
      </span>
      <slot name="text-after" />
    </label>
    <GErrorMsg
      v-for="(error, i) in props.errors"
      :key="`number-input-validation-error-${i}`"
      :error-message="error.$message.toString()"
    />
  </div>
</template>

<style lang="scss" scoped>
.g-number-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .number-input {
    padding: 1rem 1.5rem;
    border: 1px solid theme("colors.gray.300");
    border-radius: 0.5rem;
    display: block;
    width: 100%;

    &::placeholder {
      color: theme("colors.gray.500");
      opacity: 1;
    }

    // Hide Arrows From Input Number
    // Chrome, Safari, Edge, Opera
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    // Firefox
    &[type="number"] {
      -moz-appearance: textfield;
    }
  }
}
</style>
