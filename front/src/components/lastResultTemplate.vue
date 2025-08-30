<script setup lang="ts">
import type { Result } from '@/models/result'

interface Props {
  result: Result[]
}

const { result } = defineProps<Props>()

console.log(result)

const accuracy = []

for (const elt of result) {
  accuracy.push([elt.date, elt.accuracy])
}

console.log(accuracy)

const emit = defineEmits<{
  more: []
}>()

function listenMore(): void {
  emit('more')
}

const series = [
  {
    name: 'Accuracy',
    data: accuracy,
  },
]

const options = {
  chart: {
    height: 200,
    type: 'line',
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MMM yyyy',
        day: 'dd MMM',
        hour: 'HH:mm',
      },
    },
  },
  yaxis: {
    min: 0,
    max: 100,
    decimalsInFloat: 0,
    title: {
      text: 'Accuracy',
    },
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy',
    },
  },
}
</script>

<template>
  <div id="resultTemplate">
    <h2>Résultat</h2>
    <div>
      <apexchart
        width="600"
        height="300"
        type="line"
        :options="options"
        :series="series"
      ></apexchart>
    </div>
    <button @click="listenMore">Voir plus</button>
  </div>
</template>

<style scoped>
#resultTemplate {
  width: 100%;
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

p:nth-last-child(-n + 3) {
  border-bottom: none;
}
</style>
