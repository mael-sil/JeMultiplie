<script setup lang="ts">
import type { Result } from '@/models/result';


interface Props {
  lastResult: Result;
}

const { lastResult } = defineProps<Props>();

console.log(lastResult.accuracy);


</script>

<template>
  <div>
    <h2>Dernier résultat</h2>
    <div id="lastResult">
      <p> Questions</p>
      <p> Temps moyen (s)</p>
      <p> Précision (%)</p>
      <p> {{ lastResult.nbrOp }}</p>
      <p> {{ lastResult.meanTime.toFixed(2) }} </p>
      <p> {{ lastResult.accuracy.toFixed(0) }}</p>
    </div>
    <button> Voir plus</button>
  </div>


</template>


<style scoped>
#lastResult {
  display: grid;
  grid-template-columns: auto auto auto;

  align-items: stretch;
  justify-items: stretch;
}

h2 {
  grid-column: span 3;
}

button {
  font-size: 2rem;
  margin-top: 2rem;
}

p {
  margin: 0;
  padding: 0.5rem 1rem;
  border-right: 0.12rem solid lightgrey;
  border-bottom: 0.12rem solid lightgrey;
  text-align: center;
}

p:nth-child(3n) {
  border-right: none;
}

p:nth-last-child(-n+3) {
  border-bottom: none;
}
</style>
