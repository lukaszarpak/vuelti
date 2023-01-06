<script lang="ts" setup>
import { computed } from "vue";

// components
import GErrorMsg from "@/components/atoms/ErrorMsg.vue";

// interfaces
import type { ErrorObject } from "@vuelidate/core";

// enums
import { CheckboxInputType } from "@/enums/CheckboxInputType";

interface Props {
  value: boolean;
  errors?: ErrorObject[];
  disabled?: boolean;
  name?: string;
  type?: CheckboxInputType;
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
  disabled: false,
  name: "",
  type: CheckboxInputType.CHECKBOX,
});
const emit = defineEmits(["update:value"]);

const modelValue = computed({
  get: () => props.value,
  set: (newValue: boolean) => emit("update:value", newValue),
});
</script>

<template>
  <div>
    <label
      class="g-checkbox"
      :class="{ 'g-checkbox--disabled': props.disabled }"
    >
      <slot name="text-before" />
      <span
        v-if="props.type === CheckboxInputType.SWITCH"
        class="switch-checkbox-wrapper"
      >
        <input
          v-model="modelValue"
          class="switch-checkbox"
          type="checkbox"
          :disabled="props.disabled"
          :name="name"
        />
        <span class="slider" />
      </span>
      <input
        v-else
        v-model="modelValue"
        class="checkbox"
        type="checkbox"
        :disabled="props.disabled"
        :name="name"
      />
      <slot name="text-after" />
    </label>
    <GErrorMsg
      v-for="(error, i) in props.errors"
      :key="`checkbox-input-validation-error-${i}`"
      :error-message="error.$message.toString()"
    />
  </div>
</template>

<style lang="scss" scoped>
.g-checkbox {
  display: flex;
  align-items: center;
  margin: 0;
  cursor: pointer;

  &.g-checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .checkbox,
    .switch-checkbox-wrapper .slider {
      cursor: not-allowed;
    }
  }

  .checkbox {
    display: block;
    min-width: 1.25rem;
    min-height: 1.25rem;
    margin: 0 0.5rem;
    cursor: pointer;
  }

  .switch-checkbox-wrapper {
    position: relative;
    display: block;
    width: 2.25rem;
    height: 1.25rem;
    margin: 0 0.5rem;

    .switch-checkbox {
      opacity: 0;
      width: 0;
      height: 0;

      &:checked + .slider {
        background-color: theme("colors.green.500");
      }

      &:checked + .slider:before {
        transform: translateX(1rem);
      }
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: theme("colors.gray.300");
      border-radius: 2rem;
      transition: 0.2s;

      &:before {
        content: "";
        position: absolute;
        height: 1rem;
        width: 1rem;
        left: 0.125rem;
        bottom: 0.125rem;
        background-color: theme("colors.white");
        border-radius: 50%;
        transition: 0.2s;
      }
    }
  }
}
</style>
