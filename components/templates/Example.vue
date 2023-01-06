<script lang="ts" setup>
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="container py-4">{{ props.title }}</div>
</template>

<style lang="scss" scoped></style>
