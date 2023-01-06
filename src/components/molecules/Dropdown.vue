<script lang="ts" setup>
import { computed } from "vue";

// composables
import { useOpenState } from "@/composables/useOpenState";

// components
import GIcon from "@/components/atoms/Icon.vue";

// enums
import { Icon } from "@/enums/Icon";
import { Size } from "@/enums/Size";

interface Props {
  isOpen?: boolean;
  reversedOrder?: boolean;
  isHeaderVisible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  reversedOrder: false,
  isHeaderVisible: true,
});

const emit = defineEmits<{
  (event: "update:is-open", value: boolean): void;
}>();

const { isOpen: isDropdownOpen } = useOpenState();

const isOpenModelValue = computed({
  get: () => props.isOpen || isDropdownOpen.value,
  set: (value: boolean) => emit("update:is-open", value),
});

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<template>
  <div
    class="g-dropdown"
    :class="{
      'g-dropdown__open': isOpenModelValue,
      'g-dropdown__reversed-order': props.reversedOrder,
    }"
  >
    <header
      v-if="props.isHeaderVisible"
      class="g-dropdown__header"
      @click="toggleDropdown"
    >
      <slot name="header-before" />
      <GIcon :icon="Icon.CHEVRON_DOWN" class="down-arrow" :size="Size.SM" />
      <slot name="header-after" />
    </header>
    <Transition name="slide-down" mode="out-in">
      <div v-if="isOpenModelValue" class="g-dropdown__content">
        <div class="g-dropdown__content-inner">
          <slot name="content" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.g-dropdown {
  display: flex;
  flex-direction: column;

  &__reversed-order {
    flex-direction: column-reverse;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    .down-arrow {
      transition: 0.25s;
    }
  }

  &__content {
    border-top: 1px solid theme("colors.gray.300");
    margin-top: 0.5rem;

    &-inner {
      padding: 0.75rem 0;
    }
  }

  &__open .down-arrow {
    transform: rotate(180deg);
  }

  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: max-height 1s ease-in-out, opacity 0.5s ease-in-out;
    max-height: 1500px;
    opacity: 1;
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    max-height: 0;
    opacity: 0;
  }
}
</style>
