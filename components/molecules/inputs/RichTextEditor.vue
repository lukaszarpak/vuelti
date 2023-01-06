<script lang="ts" setup>
import { computed } from "vue";

// CKEditor
import { component as CKEditor } from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// components
import GErrorMsg from "../../atoms/ErrorMsg.vue";

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

const editorConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "undo",
      "redo",
    ],
  },
};
</script>

<template>
  <div>
    <div
      class="g-rich-text-editor"
      :class="{ 'floating-label': props.floatingLabel }"
    >
      <slot name="text-before" />

      <CKEditor
        v-model="modelValue"
        :editor="ClassicEditor"
        :config="editorConfig"
      />

      <span v-if="props.floatingLabel" class="floating-label__content">
        <slot name="floating-label" />
      </span>
      <slot name="text-after" />
    </div>
    <GErrorMsg
      v-for="(error, i) in props.errors"
      :key="`text-input-validation-error-${i}`"
      :error-message="error.$message.toString()"
    />
  </div>
</template>

<style lang="scss" scoped>
.g-rich-text-editor {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
