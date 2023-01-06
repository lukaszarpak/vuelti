<script lang="ts" setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { onClickOutside } from "@vueuse/core";

// Components
import GButton from "@/components/atoms/Button.vue";

// enums
import { ButtonVariant } from "@/enums/Button";
import { Icon } from "@/enums/Icon";
import { Size } from "@/enums/Size";

interface Props {
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (event: "update:is-open", value: boolean): void;
}>();

const { t } = useI18n();

const innerModalElement = ref(null);

const isOpenModelValue = computed({
  get: () => props.isOpen,
  set: (value: boolean) => emit("update:is-open", value),
});

const closeModal = () => {
  isOpenModelValue.value = false;
};

onClickOutside(innerModalElement, closeModal);
</script>

<template>
  <Transition>
    <div v-if="isOpenModelValue" class="g-modal--backdrop">
      <div class="g-modal__outer-wrapper">
        <div ref="innerModalElement" class="g-modal__inner-wrapper">
          <div class="g-modal__header">
            <slot name="header" />
            <GButton
              :button-variant="ButtonVariant.TRANSPARENT"
              :icon="Icon.CLOSE"
              :icon-size="Size.XS"
              class="g-modal__close-modal-button"
              @click="closeModal"
            >
              {{ t("btn.close") }}
            </GButton>
          </div>
          <div class="g-modal__content">
            <slot name="content" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.g-modal--backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100vw;
  height: 100vh;

  &::before {
    content: "";
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: theme("colors.black");
    opacity: 0.5;
  }

  .g-modal {
    &__outer-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      max-width: 500px;
      padding: 20px;
      overflow: hidden;

      @screen sm {
        max-width: 700px;
      }

      @screen md {
        max-width: 1000px;
      }
    }

    &__inner-wrapper {
      display: flex;
      flex-direction: column;
      background-color: theme("colors.white");
      border: 1px solid theme("colors.gray.300");
      border-radius: 5px;
      max-height: 90vh;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: theme("colors.gray.100");
      border-bottom: 1px solid theme("colors.gray.300");
      font-size: theme("fontSize.lg");
      padding: 1rem;
      gap: 1rem;
    }

    &__close-modal-button {
      margin-left: auto;
      font-size: theme("fontSize.sm");
      align-self: flex-start;
      min-width: fit-content;
    }

    &__content {
      overflow-x: hidden;
      overflow-y: auto;
      padding: 1rem;
      max-height: 90%;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease-in;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
