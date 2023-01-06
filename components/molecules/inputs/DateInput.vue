<script lang="ts" setup>
import { computed } from "vue";

// components
import GErrorMsg from "../../atoms/ErrorMsg.vue";

// interfaces
import type { ErrorObject } from "@vuelidate/core";

interface Props {
  value: string;
  errors?: ErrorObject[];
  disabled?: boolean;
  name?: string;
  floatingLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
  disabled: false,
  name: "",
  floatingLabel: false,
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
      class="g-date-input-wrapper"
      :class="{ 'floating-label': props.floatingLabel }"
    >
      <slot name="text-before" />
      <input
        v-model="modelValue"
        class="date-input"
        type="date"
        :disabled="disabled"
        :name="name"
        onfocus="this.showPicker()"
      />
      <span v-if="props.floatingLabel" class="floating-label__content">
        <slot name="floating-label" />
      </span>
      <slot name="text-after" />
    </label>
    <GErrorMsg
      v-for="(error, i) in props.errors"
      :key="`date-input-validation-error-${i}`"
      :error-message="error.$message.toString()"
    />
  </div>
</template>

<style lang="scss" scoped>
.g-date-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date-input {
    padding: 1rem 1.5rem;
    border: 1px solid theme("colors.gray.300");
    border-radius: 0.5rem;
    display: block;
    width: 100%;
    color: theme("colors.gray.800");
  }
}
</style>
