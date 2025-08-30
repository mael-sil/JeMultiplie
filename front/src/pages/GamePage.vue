<script setup lang="ts">
import QuestionPad from '@/components/questionPad.vue';
import headerTemplate from '@/components/headerTemplate.vue';

// Rename component to satisfy multi-word rule
defineOptions({
  name: 'GamePage'
})
</script>

<template>

  <header>
    <headerTemplate />
  </header>
  <main>
    <QuestionPad />
  </main>
</template>
