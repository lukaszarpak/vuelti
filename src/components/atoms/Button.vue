<script lang="ts" setup>
// interfaces
import { useRouter } from "vue-router";

// components
import GLoader from "@/components/atoms/Loader.vue";
import GIcon from "@/components/atoms/Icon.vue";

// enums
import {
  ButtonIconPlacement,
  ButtonHrefTarget,
  ButtonType,
  ButtonVariant,
} from "@/enums/Button";
import { Size } from "@/enums/Size";
import { computed } from "vue";
import { LoaderColor } from "@/enums/LoaderColor";
import { Icon, IconColor } from "@/enums/Icon";

// @TODO: update href prop interface to string | RouteLocationRaw from "vue-router" when Vue 3 supports external types while defining Props interface
// https://stackoverflow.com/questions/72847772/vue-3-typescript-props-vue-warn-invalid-prop-type-check-failed-for-prop-or
interface Props {
  buttonVariant?: ButtonVariant;
  rounded?: boolean;
  disabled?: boolean;
  type?: ButtonType;
  href?: any;
  icon?: Icon;
  iconPlacement?: ButtonIconPlacement;
  iconSize?: Size;
  loading?: boolean;
  selected?: boolean;
  hrefTarget?: ButtonHrefTarget;
}

const props = withDefaults(defineProps<Props>(), {
  buttonVariant: ButtonVariant.PRIMARY,
  rounded: false,
  disabled: false,
  type: ButtonType.BUTTON,
  href: "",
  icon: Icon.NONE,
  iconPlacement: ButtonIconPlacement.BEFORE,
  iconSize: Size.MD,
  loading: false,
  selected: false,
  hrefTarget: ButtonHrefTarget.SELF,
});

const emit = defineEmits(["click"]);

const router = useRouter();

const loaderColor = computed(() =>
  props.buttonVariant === ButtonVariant.BLUE ||
  props.buttonVariant === ButtonVariant.DARK_GRAY
    ? LoaderColor.WHITE
    : LoaderColor.RED
);

const iconColor = computed(() =>
  props.buttonVariant === ButtonVariant.BLUE ||
  props.buttonVariant === ButtonVariant.DARK_GRAY
    ? IconColor.WHITE
    : props.buttonVariant === ButtonVariant.LINK
    ? IconColor.LINK_BLUE
    : IconColor.DARK_GRAY
);

const link = computed(() =>
  typeof props.href === "string" ? props.href : router.resolve(props.href).href
);

const onBtnClick = (event: Event) => {
  if (props.loading || props.disabled) return;

  emit("click", event);
};

const handleHrefClick = async (event: Event) => {
  if (props.loading || props.disabled) return;

  emit("click", event);

  if (typeof props.href === "string") {
    window.open(link.value, props.hrefTarget);

    return;
  }

  await router.push(props.href);
};
</script>

<template>
  <a
    v-if="props.href && !props.disabled"
    class="g-button"
    :class="[
      props.buttonVariant,
      { rounded: props.rounded },
      { loading: props.loading },
    ]"
    :href="link"
    @click.prevent="handleHrefClick"
  >
    <GLoader
      v-if="props.loading"
      :size="Size.SM"
      :is-absolute-position="true"
      :color="loaderColor"
    />
    <GIcon
      v-if="props.icon && props.iconPlacement === ButtonIconPlacement.BEFORE"
      :icon="props.icon"
      :size="props.iconSize"
      :color="iconColor"
    />
    <slot />
    <GIcon
      v-if="props.icon && props.iconPlacement === ButtonIconPlacement.AFTER"
      :icon="props.icon"
      :size="props.iconSize"
      :color="iconColor"
    />
  </a>
  <button
    v-else
    :type="props.type"
    class="g-button"
    :class="[
      props.buttonVariant,
      { rounded: props.rounded },
      { loading: props.loading },
      { 'font-bold': props.selected },
    ]"
    :disabled="props.disabled"
    @click="onBtnClick"
  >
    <GLoader
      v-if="props.loading"
      :size="Size.SM"
      :is-absolute-position="true"
      :color="loaderColor"
    />
    <GIcon
      v-if="props.icon && props.iconPlacement === ButtonIconPlacement.BEFORE"
      :icon="props.icon"
      :size="props.iconSize"
      :color="iconColor"
    />
    <slot />
    <GIcon
      v-if="props.icon && props.iconPlacement === ButtonIconPlacement.AFTER"
      :icon="props.icon"
      :size="props.iconSize"
      :color="iconColor"
    />
  </button>
</template>

<style lang="scss" scoped>
.g-button {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  color: theme("colors.white");
  background-color: theme("colors.gray.500");
  border: 1px solid theme("colors.gray.500");
  border-radius: 0.5rem;
  transition: 0.2s ease-out;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  width: fit-content;
  text-align: center;

  &:hover {
    translate: 0 -0.2rem;

    @apply shadow-md;
  }

  &.blue {
    color: theme("colors.white");
    background-color: theme("colors.blue.500");
    border-color: theme("colors.blue.500");

    &.loading:deep(.g-loader.absolute-position) {
      background-color: rgba(#fff, 0.85);
    }
  }

  &.disabled,
  &[disabled],
  fieldset[disabled] {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      translate: 0;
      box-shadow: none;
    }

    &:focus {
      border: none;
    }
  }

  &.transparent {
    color: theme("colors.gray.800");
    background-color: theme("colors.transparent");
    border-color: theme("colors.transparent");

    &.loading:deep(.g-loader.absolute-position) {
      background-color: rgba(#fff, 0.85);
    }
  }

  &.text {
    color: theme("colors.gray.800");
    background-color: theme("colors.transparent");
    border: none;
    padding: 0;

    &:hover {
      @apply shadow-none;
    }

    &.loading:deep(.g-loader.absolute-position) {
      background-color: rgba(#fff, 0.85);
    }
  }

  &.white {
    color: theme("colors.gray.800");
    background-color: theme("colors.white");
    border-color: theme("colors.gray.800");

    &.loading:deep(.g-loader.absolute-position) {
      background-color: rgba(#fff, 0.85);
    }
  }

  &.dark-gray {
    color: theme("colors.white");
    background-color: theme("colors.gray.800");
    border-color: theme("colors.gray.800");

    &.loading:deep(.g-loader.absolute-position) {
      background-color: theme("colors.gray.800");
    }
  }

  &.link {
    display: inline;
    text-align: center;
    color: theme("colors.blue.500");
    border-color: theme("colors.transparent");
    background-color: theme("colors.transparent");
    padding: 0;

    &:hover {
      translate: 0 0;
      text-decoration: underline;

      @apply shadow-none;
    }

    &.loading:deep(.g-loader.absolute-position) {
      background-color: rgba(#fff, 0.85);
    }
  }

  &.rounded {
    border-radius: 999px;
  }

  &.loading {
    cursor: not-allowed;
    position: relative;

    :deep(.g-loader.absolute-position) {
      background-color: theme("colors.gray.300");
    }
  }
}
</style>
