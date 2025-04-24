<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
</script>

<template>
  <RouterView :key="$route.fullPath" />
</template>
