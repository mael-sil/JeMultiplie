<script setup lang="ts">
import { getSave } from '@/composables/save';
import type { Result } from '@/models/result';
import { ref } from 'vue';
import { useRouter } from "vue-router";
import StartMenu from "@/components/startMenu.vue";
import ResultTemplate from "@/components/lastResultTemplate.vue";
import headerTemplate from '@/components/headerTemplate.vue';

const router = useRouter();

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

  <header>
    <headerTemplate />
  </header>
  <main>
    <StartMenu @start="listenStart" />
    <ResultTemplate v-if="resultHistory.length !== 0" :lastResult="resultHistory[resultHistory.length - 1]"
      @more="listenMore" />
  </main>
</template>
