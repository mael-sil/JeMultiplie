<script setup lang="ts">
import { getSave } from '@/composables/save'
import type { Result } from '@/models/result'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import StartMenu from '@/components/startMenu.vue'
import ResultTemplate from '@/components/lastResultTemplate.vue'

// Rename component to satisfy multi-word rule
defineOptions({
  name: 'HomePage',
})

const router = useRouter()

const resultHistory = ref<Result[]>(getSave())

function listenStart(): void {
  router.push('game')
}

function listenMore(): void {
  router.push('stats')
}

console.log(resultHistory.value)
</script>

<template>
  <StartMenu @start="listenStart" />
  <ResultTemplate v-if="resultHistory.length !== 0" :result="resultHistory" @more="listenMore" />
</template>
