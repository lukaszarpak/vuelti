<script lang="ts" setup>
import { computed } from "vue";

// components
import GErrorMsg from "@/components/atoms/ErrorMsg.vue";

// interfaces
import type { ErrorObject } from "@vuelidate/core";
import type { SelectOption } from "@/interfaces/SelectOption";

// enums
import { RadioInputVariant } from "@/enums/RadioInputVariant";

interface Props {
  value: string;
  errors?: ErrorObject[];
  options: SelectOption[];
  variant?: RadioInputVariant;
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
  variant: RadioInputVariant.VERTICAL,
});

const emit = defineEmits<{
  (event: "update:value", value: string): void;
}>();

const modelValue = computed({
  get: () => props.value,
  set: (newValue: string) => emit("update:value", newValue),
});
</script>

<template>
  <div>
    <div
      class="g-radio-input-wrapper"
      :class="`g-radio-input-wrapper__variant-${props.variant}`"
    >
      <slot name="text-before" />
      <label
        v-for="(option, index) in props.options"
        :key="`g-radio-input-${option.value}-${index}`"
        class="g-radio-input__single"
      >
        <input
          v-model="modelValue"
          class="radio-input"
          type="radio"
          :value="option.value"
        />

        <span>{{ option.label }}</span>
      </label>
      <slot name="text-after" />
    </div>
    <GErrorMsg
      v-for="(error, i) in props.errors"
      :key="`radio-input-validation-error-${i}`"
      :error-message="error.$message.toString()"
    />
  </div>
</template>

<style lang="scss" scoped>
.g-radio-input-wrapper {
  display: flex;
  gap: 0.5rem;

  &__variant-vertical {
    flex-direction: column;

    .g-radio-input__single {
      margin-left: 0.5rem;
    }
  }

  &__variant-horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
  }

  .g-radio-input__single {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
}
</style>
