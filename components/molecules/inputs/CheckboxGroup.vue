<script lang="ts" setup>
import { computed } from "vue";

// components
import GCheckboxInput from "./CheckboxInput.vue";
import GErrorMsg from "../../atoms/ErrorMsg.vue";

// interfaces
import type { SelectOption } from "../../../interfaces/SelectOption";
import type { ErrorObject } from "@vuelidate/core";

interface SelectOptionWithSelectedValue extends SelectOption {
  selected: boolean;
}

interface Props {
  selectedValues: string[];
  options: SelectOption[];
  errors?: ErrorObject[];
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
});

const emit = defineEmits<{
  (event: "update:selected-values", value: string[]): void;
}>();

const optionsWithSelectedValues = computed<SelectOptionWithSelectedValue[]>(
  () =>
    props.options.map((option) => ({
      ...option,
      selected: props.selectedValues.includes(option.value),
    }))
);
</script>

<template>
  <div>
    <div class="g-checkbox-picker">
      <slot name="text-before" />

      <div class="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        <GCheckboxInput
          v-for="(option, index) in optionsWithSelectedValues"
          :key="`g-checkbox-picker-option-${option.value}-${index}`"
          :value="option.selected"
          @update:value="
            emit(
              'update:selected-values',
              option.selected
                ? props.selectedValues.filter((value) => value !== option.value)
                : [...props.selectedValues, option.value]
            )
          "
        >
          <template #text-after>
            {{ option.label }}
          </template>
        </GCheckboxInput>
      </div>
      <slot name="text-after" />
    </div>
    <GErrorMsg
      v-for="(error, i) in props.errors"
      :key="`checkbox-group-validation-error-${i}`"
      :error-message="error.$message.toString()"
    />
  </div>
</template>

<style lang="scss" scoped>
.g-checkbox-picker {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
