<script lang="ts" setup>
import { computed } from "vue";

// components
import GErrorMsg from "@/components/atoms/ErrorMsg.vue";

// interfaces
import type { ErrorObject } from "@vuelidate/core";

interface Props {
  value: string;
  errors?: ErrorObject[];
  floatingLabel?: boolean;
  disabled?: boolean;
  name?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
  floatingLabel: false,
  disabled: false,
  name: "",
  placeholder: "",
});
const emit = defineEmits(["update:value"]);

const modelValue = computed({
  get: () => props.value,
  set: (newValue: string) => emit("update:value", newValue),
});
</script>

<template>
  <div>
    <label
      class="g-text-input-wrapper"
      :class="{ 'floating-label': props.floatingLabel }"
    >
      <slot name="text-before" />
      <input
        v-model="modelValue"
        class="text-input"
        type="text"
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
      :key="`text-input-validation-error-${i}`"
      :error-message="error.$message.toString()"
    />
  </div>
</template>

<style lang="scss" scoped>
.g-text-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .text-input {
    padding: 1rem 1.5rem;
    border: 1px solid theme("colors.gray.300");
    border-radius: 0.5rem;
    display: block;
    width: 100%;

    &::placeholder {
      color: theme("colors.gray.500");
      opacity: 1;
    }
  }
}
</style>
