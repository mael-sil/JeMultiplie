<script setup lang="ts">
import type { Result } from '@/models/result';
import { computed } from 'vue';
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

const getPercentageColor = (goodAnswers: number, totalAttempts: number) => {
  const percentage = (goodAnswers / totalAttempts) * 100;
  if (percentage >= 90) return 'good';
  if (percentage >= 80) return 'medium';
  return 'bad';
};
console.log(groups)

</script>


<template>
  <div v-for="(group, groupIndex) of groups" :key="groupIndex">
    <div class="operation-result" v-for="(elt, eltIndex) of group" :key="`${groupIndex}-${eltIndex}`">
      <p>{{ elt.operation.a }} x {{ elt.operation.b }}</p>
      <p v-if="elt.totalAttempts > 0" :class="getPercentageColor(elt.goodAnswers, elt.totalAttempts)">{{ (100 *
        elt.goodAnswers / elt.totalAttempts).toFixed(0) }}%</p>
      <p v-else></p>
      <progressBar :time="elt.meanTime" />
      <p v-if="elt.meanTime > 0">{{ elt.meanTime.toFixed(2) }} s</p>
      <p v-else></p>

    </div>
  </div>
</template>

<style scoped>
.operation-result {

  width: 100%;

  display: grid;
  grid-template-columns: repeat(4, auto);

  align-items: center;
  justify-items: start;

  gap: 0rem 0.5rem;
}

p {
  width: 4rem;
}


.good {
  color: limegreen;
}

.medium {
  color: dodgerblue;
}

.bad {
  color: orangered;
}
</style>
