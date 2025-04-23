<script setup lang="ts">
import headerTemplate from "@/components/headerTemplate.vue";
import NumPad from "@/components/questionPad.vue";
import StartMenu from "./components/startMenu.vue";
import { ref } from "vue";

const start = ref(true);

function listenStart(): void {
  start.value = false;
}

</script>

<template>
  <header>
    <headerTemplate />
  </header>

  <main>
    <StartMenu v-if="start" @start="listenStart" />
    <NumPad v-else />
  </main>
</template>

<style scoped>
main {
  flex: 1;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
}

header {
  box-shadow: 0px 0px 10px lightgrey;
}
</style>
