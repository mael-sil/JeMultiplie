<script setup lang="ts">
import type { Result } from '@/models/result';
import { computed, ref } from 'vue';
import progressBar from './progressBar.vue';

interface Props {
  result: Result;
}

const { result: result } = defineProps<Props>();


console.log(result)

const groups = computed(() => {
  const g: { [key: number]: typeof result.operationsResult } = {};

  for (const op of result.operationsResult) {
    if (!g[op.operation.a]) {
      g[op.operation.a] = [];
    }
    g[op.operation.a].push(op);
  }

  return g;
});
console.log(groups)

</script>


<template>
  <div v-for="group of groups">
    <div class="operation-result" v-for="elt of group">
      <p>{{ elt.operation.a }} x {{ elt.operation.b }}</p>
      <progressBar :time="elt.meanTime" />
      <p v-if="elt.meanTime > 0">{{ elt.meanTime.toFixed(2) }} s</p>
    </div>
  </div>
</template>

<style scoped>
.operation-result {

  width: 100%;

  display: grid;
  grid-template-columns: repeat(3, auto);

  align-items: center;
  justify-items: start;

  gap: 0rem 0.5rem;
}

p {
  width: 4rem;
}
</style>
