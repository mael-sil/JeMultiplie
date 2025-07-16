<script lang="ts" setup>
import { ref } from 'vue'
import type { Result } from '@/models/result';
import { dateFormating } from '@/composables/date';

interface Props {
  result: Result;
}

const { result: result } = defineProps<Props>();

console.log(result)

const operation = ref<number[]>([])

const series = ref<{
  name: string;
  data: number[];
}[]>([
])

for (let i = 2; i < 10; i++) {
  operation.value.push(i)

  var data = Array(8);

  for (let elt of result.operationsResult) {
    if (elt.operation.a === i) {
      if (elt.totalAttempts === 0) {
        data[elt.operation.b - 2] = 0
      } else {
        data[elt.operation.b - 2] = 100 * elt.goodAnswers / elt.totalAttempts
      }

    }
    if (elt.operation.b === i) {
      if (elt.totalAttempts === 0) {
        data[elt.operation.a - 2] = 0
      } else {
        data[elt.operation.a - 2] = 100 * elt.goodAnswers / elt.totalAttempts
      }
    }
  }

  console.log(data)

  series.value.push({
    name: `${i}`,
    data: data
  })


}

console.log(operation)


const options = ref({
  chart: {
    id: 'vheatmap'
  },
  xaxis: {
    categories: operation.value,
    position: 'top',
  },
  legend: {
    show: false
  },
  plotOptions: {
    heatmap: {
      enableShades: false,
      colorScale: {
        ranges: [
          { from: 0, to: 4, color: '#1A33B3', name: 'step1' },    // x="0"
          { from: 4, to: 8, color: '#1E3BAE', name: 'step2' },    // x="1"
          { from: 8, to: 12, color: '#2242AA', name: 'step3' },   // x="2"
          { from: 12, to: 16, color: '#2549A7', name: 'step4' },  // x="3"
          { from: 16, to: 20, color: '#2950A3', name: 'step5' },  // x="4"
          { from: 20, to: 24, color: '#2C57A0', name: 'step6' },  // x="5"
          { from: 24, to: 28, color: '#305E9C', name: 'step7' },  // x="6"
          { from: 28, to: 32, color: '#346498', name: 'step8' },  // x="7"
          { from: 32, to: 36, color: '#396B93', name: 'step9' },  // x="8"
          { from: 36, to: 40, color: '#3F718D', name: 'step10' }, // x="9"
          { from: 40, to: 44, color: '#457788', name: 'step11' }, // x="10"
          { from: 44, to: 48, color: '#4C7E82', name: 'step12' }, // x="11"
          { from: 48, to: 52, color: '#54857F', name: 'step13' }, // x="12"
          { from: 52, to: 56, color: '#5C8E7C', name: 'step14' }, // x="13"
          { from: 56, to: 60, color: '#679879', name: 'step15' }, // x="14"
          { from: 60, to: 64, color: '#70A277', name: 'step16' }, // x="15"
          { from: 64, to: 68, color: '#7BAD74', name: 'step17' }, // x="16"
          { from: 68, to: 72, color: '#85B871', name: 'step18' }, // x="17"
          { from: 72, to: 76, color: '#90C26F', name: 'step19' }, // x="18"
          { from: 76, to: 80, color: '#9CCE6C', name: 'step20' }, // x="19"
          { from: 80, to: 84, color: '#ABDA69', name: 'step21' }, // x="20"
          { from: 84, to: 90, color: '#BCE567', name: 'step22' }, // x="21"
          { from: 90, to: 100, color: '#D2EF66', name: 'step23' }, // x="22"
        ]
      }
    }
  }
})
</script>

<template>
  <div>
    <apexchart width="1000" type="heatmap" :options="options" :series="series"></apexchart>
  </div>
</template>
