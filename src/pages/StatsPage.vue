<script setup lang="ts">
import { getSave } from '@/composables/save'
import type { Result } from '@/models/result'
import { ref } from 'vue'
import LineChart from '@/components/lineChart.vue'
import StatOverview from '@/components/statOverview.vue'
import type { MainStat } from '@/components/model/mainStat'

// Rename component to satisfy multi-word rule
defineOptions({
  name: 'StatsPage',
})

const getStreak = (resultHistory: Result[]) => {
  const uniqueDates = new Map()

  for (const elt of resultHistory.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )) {
    const date = new Date(elt.date).toISOString().split('T')[0]

    if (!uniqueDates.has(date)) {
      uniqueDates.set(date, [])
    }
  }

  let streak = 0
  let currentCheckDate = new Date()
  let currentCheckDateISO = currentCheckDate.toISOString().split('T')[0]

  for (const elt of uniqueDates) {
    console.log(elt[0])
    console.log(currentCheckDateISO)
    if (elt[0] === currentCheckDateISO) {
      streak++
    } else {
      break
    }

    currentCheckDate.setDate(currentCheckDate.getDate() - 1)
    currentCheckDateISO = currentCheckDate.toISOString().split('T')[0]
  }

  return streak
}

const resultHistory = ref<Result[]>(getSave())

const sumAccuracy = resultHistory.value.reduce(
  (accumulator, currentValue) => accumulator + currentValue.accuracy,
  0,
)

const meanAccuracy = sumAccuracy / resultHistory.value.length

const sumTime = resultHistory.value.reduce(
  (accumulator, currentValue) => accumulator + currentValue.meanTime,
  0,
)

const meanTime = sumTime / resultHistory.value.length

const sumOperation = resultHistory.value.reduce(
  (accumulator, currentValue) => accumulator + currentValue.totalAttempts,
  0,
)

const statGlobal: MainStat = {
  totalOperation: sumOperation,
  meanAccuracy: meanAccuracy,
  meanTime: meanTime,
  streak: getStreak(resultHistory.value),
}
</script>
<template>
  <div id="stat" v-if="resultHistory.length !== 0">
    <StatOverview :stat="statGlobal" />
    <LineChart :result="resultHistory" />
  </div>
  <div v-else>
    <p>Pas de stat disponible</p>
  </div>
</template>
