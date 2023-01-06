<script lang="ts" setup>
// components
import GIcon from "../atoms/Icon.vue";

// enums
import { Icon, IconColor } from "../../enums/Icon";
import { Size } from "../../enums/Size";

interface Props {
  text: string;
  tooltipText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tooltipText: "",
});
</script>

<template>
  <div class="flex gap-1 items-center">
    <span v-safe-html="props.text" />

    <GIcon
      v-if="props.tooltipText"
      v-tooltip="props.tooltipText"
      :icon="Icon.QUESTION"
      :size="Size.SM"
      :color="IconColor.LIGHT_GRAY"
    />
  </div>
</template>

<style lang="scss" scoped></style>
