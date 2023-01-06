<script lang="ts" setup>
import { computed } from "vue";

// components
import GErrorMsg from "../../atoms/ErrorMsg.vue";

// interfaces
import type { ErrorObject } from "@vuelidate/core";

interface RangeInputConfig {
  min: number;
  max: number;
  step: number;
  value: number;
}

interface Props {
  inputConfig?: RangeInputConfig;
  errors?: ErrorObject[];
  name?: string;
}

const props = withDefaults(defineProps<Props>(), {
  inputConfig: () => ({
    min: 2000,
    max: 20000,
    step: 500,
    value: 5000,
  }),
  errors: () => [],
  name: "",
});
const emit = defineEmits(["update:input-config"]);

const range = computed({
  get: () => props.inputConfig,
  set: (newValue: RangeInputConfig) => emit("update:input-config", newValue),
});
</script>

<template>
  <div>
    <label class="g-range-wrapper">
      <slot name="text-before" />
      <input
        v-model="range.value"
        :min="range.min"
        :max="range.max"
        :step="range.step"
        :name="name"
        class="range"
        type="range"
      />
      <slot name="text-after" />
    </label>
    <GErrorMsg
      v-for="(error, i) in props.errors"
      :key="`range-input-validation-error-${i}`"
      :error-message="error.$message.toString()"
    />
  </div>
</template>

<style lang="scss" scoped>
.g-range-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .range {
    margin: 0.5rem 0;
    cursor: pointer;
  }
}
</style>
