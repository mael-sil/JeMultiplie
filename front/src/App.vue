<script setup lang="ts">
import headerTemplate from "@/components/headerTemplate.vue";
import NumPad from "@/components/questionPad.vue";
import StartMenu from "./components/startMenu.vue";
import { ref } from "vue";
import ResultTemplate from "./components/resultTemplate.vue";
import { getSave } from "./composables/save";
import type { Result } from "./models/result";

const start = ref(true);

const resultHistory = ref<Result[]>(getSave())

function listenStart(): void {
  start.value = false;
}

function listenStop(): void {
  start.value = true;
  resultHistory.value = getSave();
}





</script>

<template>
  <header>
    <headerTemplate />
  </header>

  <main>
    <StartMenu v-if="start" @start="listenStart" />
    <NumPad v-else @stop="listenStop" />
    <ResultTemplate v-if="start && resultHistory.length !== 0" :lastResult="resultHistory[resultHistory.length - 1]" />
  </main>
</template>

<style scoped>
main {
  flex: 1;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;


  width: fit-content;
}

header {
  box-shadow: 0px 0px 10px lightgrey;
  width: 100%;
}
</style>
