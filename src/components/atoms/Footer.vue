<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const copyrightText = computed(() =>
  t("footer.copyright", { date: new Date().getFullYear() })
);
</script>

<template>
  <footer class="g-footer">
    <div class="g-footer__content">
      {{ copyrightText }}
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.g-footer {
  &__content {
    border-top: 1px solid theme("colors.gray.300");

    @apply container py-8 text-center text-gray-500;
  }
}
</style>
