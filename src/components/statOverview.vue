<script setup lang="ts">
import buttonMain from './basic/buttonMain.vue'
import CardInfo from './basic/cardInfo.vue'
import type { CardInfoContent } from './model/CardInfoContent'

// TODO: à completer avec les vraie données
const cardInfoContentTab: CardInfoContent[] = [
  {
    title: '1014',
    text: 'Calcul total',
    img: 'lightning-symbol.svg',
  },
  {
    title: '89%',
    text: 'Précision',
    img: 'bullseye-symbol.svg',
  },
  {
    title: '5.5 seconde',
    text: 'Temps de réponse moyen',
    img: 'time-symbol.svg',
  },
  {
    title: '5',
    text: 'Jours consécutif',
    img: 'fire-symbol.svg',
  },
]
</script>
<template>
  <h2>Vos statistique</h2>
  <p>Analysez vos performances et progressez plus rapidement</p>
  <RouterLink to="/game"
    ><buttonMain class="button-main">Lancez un nouvel entrainement</buttonMain></RouterLink
  >
  <div class="card-info-container">
    <CardInfo class="card-info-stat" v-for="value in cardInfoContentTab" :content="value" />
  </div>
</template>
<style lang="css" scoped>
h2 {
  margin-bottom: 0.5rem;
  color: var(--text-accent-two);
}

p {
  margin-top: 0rem;
}

.button-main {
  margin: 1rem 0;
}

.card-info-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  padding-top: 2rem;
}
</style>
