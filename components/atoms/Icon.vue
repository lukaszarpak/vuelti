<script lang="ts" setup>
import { computed } from "vue";

// composables
import { useI18n } from "vue-i18n";

// enums
import { Size } from "../../enums/Size";
import { Icon, IconColor } from "../../enums/Icon";

const { t } = useI18n();

interface Props {
  icon: Icon;
  size?: Size;
  alt?: string;
  color?: IconColor;
}

const props = withDefaults(defineProps<Props>(), {
  size: Size.MD,
  alt: "",
  color: IconColor.DARK_GRAY,
});

const iconSrc = computed(() => `/images/svg/icons/${props.icon}.svg`);
</script>

<template>
  <img
    :class="[
      'g-icon',
      `g-icon--size-${props.size}`,
      `g-icon--color-${props.color}`,
    ]"
    :src="iconSrc"
    :alt="props.alt || t('icon.alt_text')"
    loading="lazy"
  />
</template>

<style lang="scss" scoped>
@import "../../assets/scss/mixins/_svg-bg-filter";

.g-icon {
  // sizes
  &--size-xs {
    width: 0.75rem;
    height: 0.75rem;
  }
  &--size-sm {
    width: 1.25rem;
    height: 1.25rem;
  }
  &--size-md {
    width: 1.5rem;
    height: 1.5rem;
  }
  &--size-lg {
    width: 2rem;
    height: 2rem;
  }
  &--size-xl {
    width: 2.5rem;
    height: 2.5rem;
  }

  // colors
  &--color-white {
    @include svg-white-bg;
  }
  &--color-light-gray {
    @include svg-light-gray-bg;
  }
  &--color-dark-gray {
    @include svg-dark-gray-bg;
  }
  &--color-success-green {
    @include svg-success-green;
  }
  &--color-link-blue {
    @include svg-link-blue;
  }
}
</style>
