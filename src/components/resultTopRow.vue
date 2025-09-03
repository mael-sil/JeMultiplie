<template>
  <div class="resultTopRow">
    <p> Date</p>
    <p> Nombre question</p>
    <p> Bonne réponse</p>
    <p> % Bonne réponse</p>
    <p> Temps moyen (s)</p>
  </div>
</template>

<style scoped>
.resultTopRow {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
</style>
