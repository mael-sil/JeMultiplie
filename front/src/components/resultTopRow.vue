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
  grid-template-columns: 1.6fr repeat(4, 1fr);
}
</style>
