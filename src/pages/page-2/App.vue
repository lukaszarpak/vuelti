<script setup lang="ts">
import { RouterView } from "vue-router";

// components
import GFooter from "@/components/atoms/Footer.vue";
import GNavbar from "@/components/molecules/Navbar.vue";
</script>

<template>
  <GNavbar />

  <main class="min-h-screen">
    <RouterView />
  </main>

  <GFooter />
</template>

<style scoped lang="scss"></style>
