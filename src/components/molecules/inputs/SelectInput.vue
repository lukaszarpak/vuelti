<script lang="ts" setup>
import { computed } from "vue";

// components
import GErrorMsg from "@/components/atoms/ErrorMsg.vue";

// composables
import { useI18n } from "vue-i18n";

// interfaces
import type { Nullable } from "@/interfaces/Types";
import type { SelectOption } from "@/interfaces/SelectOption";
import type { ErrorObject } from "@vuelidate/core";

// enums
import { Icon } from "@/enums/Icon";
import { Size } from "@/enums/Size";

// components
import VSelect from "vue-select";
import GIcon from "@/components/atoms/Icon.vue";

interface Props {
  value: Nullable<SelectOption | SelectOption[]>;
  errors?: ErrorObject[];
  floatingLabel?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  taggable?: boolean;
  selectable?: (option: SelectOption) => boolean;
  name?: string;
  placeholder?: string;
  options?: SelectOption[];
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
  floatingLabel: false,
  disabled: false,
  multiple: false,
  taggable: false,
  selectable: () => true,
  name: "",
  placeholder: "",
  options: () => [],
});
const emit = defineEmits([
  "update:value",
  "search",
  "input",
  "option:selecting",
  "option:selected",
  "option:deselecting",
  "option:deselected",
]);

const { t } = useI18n();

const modelValue = computed({
  get: () => props.value,
  set: (newValue) => emit("update:value", newValue),
});
</script>

<template>
  <div>
    <div
      class="g-select-input-wrapper"
      :class="{ 'floating-label': props.floatingLabel }"
    >
      <slot name="text-before" />
      <VSelect
        v-model="modelValue"
        class="select-input"
        :options="props.options"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :multiple="props.multiple"
        :taggable="props.taggable"
        :selectable="props.selectable"
        :create-option="(option: SelectOption) => ({ value: option, label: option })"
        @search="(inputValue: string, loadingStateFunction: any) => emit('search', inputValue, loadingStateFunction)"
        @input="(selectedOption: SelectOption) => emit('input', selectedOption)"
        @option:selecting="(selectedOption: SelectOption) => emit('option:selecting', selectedOption)"
        @option:selected="(selectedOption: SelectOption) => emit('option:selected', selectedOption)"
        @option:deselecting="(selectedOption: SelectOption) => emit('option:deselecting', selectedOption)"
        @option:deselected="(selectedOption: SelectOption) => emit('option:deselected', selectedOption)"
      >
        <template #no-options>
          <slot name="no-options">
            {{ t("btn.try_search") }}
          </slot>
        </template>
        <template #open-indicator="{ attributes }">
          <span v-bind="attributes">
            <GIcon :icon="Icon.CHEVRON_DOWN" :size="Size.SM" />
          </span>
        </template>
        <template #option="{ label }"> <span v-safe-html="label" /></template>
      </VSelect>
      <span v-if="props.floatingLabel" class="floating-label__content">
        <slot name="floating-label" />
      </span>
      <slot name="text-after" />
    </div>
    <GErrorMsg
      v-for="(error, i) in props.errors"
      :key="`select-input-validation-error-${i}`"
      :error-message="error.$message.toString()"
    />
  </div>
</template>

<style lang="scss" scoped>
.g-select-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .select-input {
    width: 100%;
  }
}
</style>
