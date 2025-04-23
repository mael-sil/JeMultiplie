<script setup lang="ts">
import headerTemplate from "@/components/headerTemplate.vue";
import NumPad from "@/components/questionPad.vue";

</script>

<template>
  <header>
    <headerTemplate />
  </header>

  <main>
    <NumPad />
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
