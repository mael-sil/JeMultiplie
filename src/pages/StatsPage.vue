<script setup lang="ts">
import { getSave } from '@/composables/save'
import type { Result } from '@/models/result'
import { ref } from 'vue'
import LineChart from '@/components/lineChart.vue'
import StatOverview from '@/components/statOverview.vue'

// Rename component to satisfy multi-word rule
defineOptions({
  name: 'StatsPage',
})

const resultHistory = ref<Result[]>(getSave())
</script>
<template>
  <div id="stat" v-if="resultHistory.length !== 0">
    <StatOverview />
    <LineChart :result="resultHistory" />
  </div>
  <div v-else>
    <p>Pas de stat disponible</p>
  </div>
</template>
