<script setup lang="ts">
import type { Result } from '@/models/result'
import { useThemeStore } from '@/stores/theme'
import { ref, watch } from 'vue'

const themeStore = useThemeStore()

interface Props {
  result: Result[]
}

const { result } = defineProps<Props>()

console.log(result)

const accuracyMap = new Map<number, number[]>()

for (const elt of result) {
  const date = new Date(elt.date)
  const normalizedDate = date.setHours(2, 0, 0, 0)

  if (!accuracyMap.has(normalizedDate)) {
    accuracyMap.set(normalizedDate, [])
  }

  accuracyMap.get(normalizedDate)!.push(elt.accuracy)
}

const accuracy: [Date, number][] = []

for (const [timestamp, accuracies] of accuracyMap) {
  const average = accuracies.reduce((sum, val) => sum + val, 0) / accuracies.length
  accuracy.push([new Date(timestamp), average])
}

accuracy.sort((a, b) => a[0].getTime() - b[0].getTime())

const paddingMs = 36 * 60 * 60 * 1000 // 1 jour et demi en ms
const timestamps = accuracy.map(([date]) => date.getTime())
const minTimestamp = Math.min(...timestamps)
const maxTimestamp = Math.max(...timestamps)

const projectionStepMs = 24 * 60 * 60 * 1000 // 1 jour
const projectedSeries: [Date, number][] = []
const beforeSeries: [Date, number][] = []

const [lastDate, lastValue] = accuracy[accuracy.length - 1]
projectedSeries.push([lastDate, lastValue])
const afterDate = new Date(lastDate.getTime() + 2 * projectionStepMs)
const afterValue = Math.min(100, lastValue + 20)
projectedSeries.push([afterDate, afterValue])

const [firstDate, firstValue] = accuracy[0]
beforeSeries.push([firstDate, firstValue])
const beforeDate = new Date(firstDate.getTime() - 2 * projectionStepMs)
const beforeValue = Math.max(0, firstValue - 20)
beforeSeries.push([beforeDate, beforeValue])

const series = [
  {
    name: 'Accuracy',
    data: accuracy,
    zIndex: 10,
  },
  {
    data: projectedSeries,
  },
  {
    data: beforeSeries,
  },
]

const options = ref(
  getChartOptions(themeStore.isDarkMode, minTimestamp - paddingMs, maxTimestamp + paddingMs),
)

watch(
  () => themeStore.isDarkMode,
  (isDark) => {
    options.value = getChartOptions(isDark, minTimestamp - paddingMs, maxTimestamp + paddingMs)
  },
)

function getChartOptions(isDark: boolean, min?: number, max?: number) {
  const textColor = isDark ? '#fff' : '#000'

  return {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      foreColor: textColor,
    },
    grid: {
      borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
    },
    tooltip: {
      marker: {
        fillColors: isDark ? ['#fbbf24'] : ['#ff7b54'],
      },
      y: {
        formatter: (val: number) => val.toFixed(2) + ' % ', // format y value, e.g., 2 decimals
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      dashArray: [0, 5, 5],
      colors: isDark ? ['#fbbf24', '#fbbf24', '#fbbf24'] : ['#ff7b54', '#ff7b54', '#ff7b54'],
    },
    markers: {
      size: [5, 0, 0],
      colors: isDark ? '#fbbf24' : '#ff7b54',
      strokeWidth: 0,
    },
    xaxis: {
      type: 'datetime',
      min: min,
      max: max,
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
      title: {
        text: 'Date',
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      decimalsInFloat: 0,
      title: {
        text: 'Précision',
      },
    },
  }
}
</script>

<template>
  <div class="card">
    <div id="chart-container">
      <apexchart
        width="100%"
        height="100%"
        type="line"
        :options="options"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<style lang="css" scoped>
.apexcharts-tooltip,
.apexcharts-tooltip.apexcharts-theme-light,
.apexcharts-tooltip .apexcharts-tooltip-title,
.apexcharts-xaxistooltip {
  border: none;
  background: rgba(255, 255, 255, 0.96) !important;
  color: #000000 !important;
  font-weight: 600;
}

.dark .apexcharts-tooltip,
.dark .apexcharts-tooltip.apexcharts-theme-light,
.dark .apexcharts-tooltip .apexcharts-tooltip-title,
.dark .apexcharts-xaxistooltip {
  border: none;
  background: rgba(0, 0, 0, 0.96) !important;
  color: #ffffff !important;
}

#chart-container {
  width: 90vw;
  height: 30vw;
  min-height: 200px;
}

.card {
  padding: 5vw 2vw;
}
</style>
