<script setup lang="ts">
import { RouterView } from 'vue-router'
import headerTemplate from '@/components/headerTemplate.vue'
</script>

<template>
  <header>
    <headerTemplate />
  </header>
  <main>
    <RouterView :key="$route.fullPath" />
  </main>
</template>
