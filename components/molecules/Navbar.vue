<script lang="ts" setup>
// composables
import { useI18n } from "vue-i18n";

// components
import GButton from "../atoms/Button.vue";

// enums
import { ButtonVariant } from "../../enums/Button";
import { PageName } from "../../.vuelti/PageName";

const { t } = useI18n();

const logoSrc = `/images/svg/logo.svg`;
</script>

<template>
  <nav class="g-navbar py-4 bg-white shadow-md">
    <div class="container">
      <a class="g-navbar__logo" href="/">
        <img class="g-navbar__logo--img" :alt="t('example')" :src="logoSrc" />
      </a>
      <div class="flex gap-2">
        <GButton
          :button-variant="ButtonVariant.TRANSPARENT"
          :href="`/${PageName.PAGE_1}`"
        >
          {{ PageName.PAGE_1 }}
        </GButton>
        <GButton
          :button-variant="ButtonVariant.TRANSPARENT"
          :href="`/${PageName.PAGE_2}`"
        >
          {{ PageName.PAGE_2 }}
        </GButton>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.g-navbar {
  position: sticky;
  top: 0;
  z-index: 1000;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    &--img {
      height: 3rem;
    }
  }
}
</style>
