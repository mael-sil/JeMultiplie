<script setup lang="ts">
import { dateFormating } from '@/composables/date';
import type { Result } from '@/models/result';
import { ref } from 'vue';

interface Props {
  result: Result;
  selected: boolean;
}

const { result, selected } = defineProps<Props>();

const date = new Date(result.date);

const dateString = ref(dateFormating(date))


const emit = defineEmits<{
  'isSelected': [result: Result]
}>()


function listenSelected(event: Event) {
  emit("isSelected", result)
}
</script>

<template>
  <div class="resultRow" :class="{ selected: selected }" @click="listenSelected">
    <p>{{ dateString }}</p>
    <p>{{ result.totalAttempts }}</p>
    <p>{{ result.totalCorrects }}</p>
    <p>{{ result.accuracy.toFixed(0) }}</p>
    <p>{{ result.meanTime.toFixed(2) }}</p>
  </div>

</template>

<style scoped>
.resultRow {
  display: grid;
  grid-template-columns: 1.6fr repeat(4, 1fr);
}

.selected {
  background-color: rgba(131, 131, 131, 0.315);
}
</style>
