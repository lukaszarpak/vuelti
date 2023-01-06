<script lang="ts" setup>
// svg source: https://codepen.io/nikhil8krishnan/pen/rVoXJa

// enums
import { Size } from "../../enums/Size";
import { LoaderColor } from "../../enums/LoaderColor";

interface Props {
  size?: Size;
  color?: LoaderColor;
  isAbsolutePosition?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: Size.SM,
  color: LoaderColor.RED,
  isAbsolutePosition: false,
});
</script>

<template>
  <div
    class="g-loader"
    :class="[
      props.color,
      { 'g-loader__absolute-position': props.isAbsolutePosition },
    ]"
  >
    <svg
      id="L9"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      xml:space="preserve"
      :class="props.size"
    >
      <path
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
$defaultSize: 6rem;

.g-loader {
  svg {
    display: block;
    width: $defaultSize;
    height: $defaultSize;
    margin: 0 auto;

    &.sm {
      width: calc($defaultSize / 2);
      height: calc($defaultSize / 2);
    }

    &.md {
      width: $defaultSize;
      height: $defaultSize;
    }

    &.lg {
      width: calc($defaultSize * 1.5);
      height: calc($defaultSize * 1.5);
    }
  }

  &.red svg path {
    fill: red;
  }

  &.white svg path {
    fill: white;
  }

  &__absolute-position {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.425);
    z-index: 1;

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
