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
  border-radius: 1rem;
  background-color: white;
  box-shadow: 0px 0px 10px lightgrey;
  padding: 1rem 2rem;
  margin: 1rem 2rem;


  font-size: 2rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  align-items: center;
}

button {
  text-align: center;
  background: white;

  border-radius: 1rem;
  border: 0.1rem solid lightgrey;

  padding: 0rem 3rem;

  font-size: 4rem;
}

button:hover {
  border: 0.1rem solid rgb(146, 90, 197);
}
</style>
