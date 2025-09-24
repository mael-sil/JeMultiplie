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
const meanTimeMap = new Map<number, number[]>()

for (const elt of result) {
  const date = new Date(elt.date)
  const normalizedDate = date.setHours(2, 0, 0, 0)

  if (!accuracyMap.has(normalizedDate)) {
    accuracyMap.set(normalizedDate, [])
  }

  if (!meanTimeMap.has(normalizedDate)) {
    meanTimeMap.set(normalizedDate, [])
  }

  accuracyMap.get(normalizedDate)!.push(elt.accuracy)
  meanTimeMap.get(normalizedDate)!.push(elt.meanTime)
}

const accuracy: [Date, number][] = []

for (const [timestamp, accuracies] of accuracyMap) {
  const average = accuracies.reduce((sum, val) => sum + val, 0) / accuracies.length
  accuracy.push([new Date(timestamp), average])
}

const meanTime: [Date, number][] = []

for (const [timestamp, meanTimes] of meanTimeMap) {
  const average = meanTimes.reduce((sum, val) => sum + val, 0) / meanTimes.length
  meanTime.push([new Date(timestamp), average])
}

const maxMeanTime = Math.max(...meanTime.map((x) => x[1]))

accuracy.sort((a, b) => a[0].getTime() - b[0].getTime())
meanTime.sort((a, b) => a[0].getTime() - b[0].getTime())

const paddingMs = accuracy.length <= 2 ? 62 * 60 * 60 * 1000 : 30 * 60 * 60 * 1000
const timestamps = accuracy.map(([date]) => date.getTime())
const minTimestamp = Math.min(...timestamps)
const maxTimestamp = Math.max(...timestamps)

const projectionStepMs = 24 * 60 * 60 * 1000 // 1 jour
const projectedAccuracy: [Date, number][] = []
const projectedMeanTime: [Date, number][] = []

const [lastDate, lastAccuracyValue] = accuracy[accuracy.length - 1]
const lastMeanTimeValue = meanTime[accuracy.length - 1][1]
projectedAccuracy.push([lastDate, lastAccuracyValue])
projectedMeanTime.push([lastDate, lastMeanTimeValue])
const afterDate = new Date(lastDate.getTime() + 3 * projectionStepMs)
const afterAccuracyValue = Math.min(100, lastAccuracyValue + 40)
const afterMeanTimeValue = Math.max(1, lastMeanTimeValue - 2)
projectedAccuracy.push([afterDate, afterAccuracyValue])
projectedMeanTime.push([afterDate, afterMeanTimeValue])

const series = [
  {
    name: 'Accuracy',
    data: accuracy,
    zIndex: 10,
  },
  {
    name: 'Preticted Accuracy',
    data: projectedAccuracy,
  },
  {
    name: 'Mean time',
    data: meanTime,
  },
  {
    name: 'Preticted mean time',
    data: projectedMeanTime,
  },
]

const options = ref(getChartOptions(themeStore.isDarkMode, minTimestamp, maxTimestamp + paddingMs))

watch(
  () => themeStore.isDarkMode,
  (isDark) => {
    options.value = getChartOptions(isDark, minTimestamp, maxTimestamp + paddingMs)
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
      toolbar: {
        show: false,
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    grid: {
      borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
    },
    tooltip: {
      marker: {
        fillColors: isDark
          ? ['#fbbf24', '#fbbf24', '#67C090', '#67C090']
          : ['#ce4257', '#ce4257', '#26667F', '#26667F'],
      },
      y: {
        formatter: (val: number) => val.toFixed(2),
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
      dashArray: [0, 5, 0, 5],
      colors: isDark
        ? ['#fbbf24', '#fbbf24', '#67C090', '#67C090']
        : ['#ce4257', '#ce4257', '#26667F', '#26667F'],
    },
    markers: {
      size: [5, 0, 5, 0],
      colors: isDark
        ? ['#fbbf24', '#fbbf24', '#67C090', '#67C090']
        : ['#ce4257', '#ce4257', '#26667F', '#26667F'],
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
    yaxis: [
      {
        seriesName: 'Accuracy',
        min: 0,
        max: 100,
        decimalsInFloat: 0,
        labels: {
          style: {
            colors: isDark ? '#fbbf24' : '#ce4257',
          },
        },
        title: {
          text: 'Précision',
          style: {
            color: isDark ? '#fbbf24' : '#ce4257',
            fontSize: '12px',
            fontWeight: 'bold',
          },
        },
      },
      {
        seriesName: 'Accuracy',
        show: false,
      },
      {
        opposite: true,
        min: 0,
        max: Math.floor(maxMeanTime + 1),
        decimalsInFloat: 2,
        seriesName: 'Mean time',
        title: {
          text: 'Temps de réponse moyen',
          style: {
            color: isDark ? '#67C090' : '#26667F',
            fontSize: '12px',
            fontWeight: 'bold',
          },
        },
        labels: {
          style: {
            colors: isDark ? '#67C090' : '#26667F',
          },
        },
      },
      {
        seriesName: 'Mean time',
        show: false,
      },
    ],
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
#chart-container {
  width: 100%;
  height: 400px;
  min-height: 200px;
}

.card {
  width: 80vw;
}

@media (max-width: 800px) {
  .card {
    padding: 0;
    width: 90vw;
  }
}
</style>

<style>
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
</style>
