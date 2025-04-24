<script setup lang="ts">

const emit = defineEmits<{
  'start': []
}>()

function listenStart(event: Event): void {
  emit('start')
}
</script>

<template>
  <div id="startMenu">
    <h2>Démarrer le jeu</h2>
    <button @click="listenStart">Start</button>




  </div>


</template>

<style scoped>
#startMenu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  align-items: center;

  width: 100%;
}

button {
  font-size: 2rem;
}
</style>
