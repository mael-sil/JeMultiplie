<script setup lang="ts">
import type { Result } from '@/models/result';
import { ref } from 'vue';

interface Props {
  result: Result;
}

const { result } = defineProps<Props>();

const date = new Date(result.date);

const day: string = String(date.getDate())
const month: string = String(date.getMonth())

const dateString = ref(day.padStart(2, '0') + '.' + month.padStart(2, '0') + '.' + date.getFullYear() + ' ' + date.toTimeString().substring(0, 5))
</script>

<template>

  <p>{{ dateString }}</p>
  <p>{{ result.nbrOp }}</p>
  <p>{{ result.nbrGoodAnswer }}</p>
  <p>{{ result.accuracy.toFixed(0) }}</p>
  <p>{{ result.meanTime.toFixed(2) }}</p>


</template>

<style scoped></style>
