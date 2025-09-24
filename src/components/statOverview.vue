<script setup lang="ts">
import buttonMain from './basic/buttonMain.vue'
import CardInfo from './basic/cardInfo.vue'
import type { CardInfoContent } from './model/CardInfoContent'
import type { MainStat } from './model/mainStat'

const props = defineProps<{
  stat: MainStat
}>()

const cardInfoContentTab: CardInfoContent[] = [
  {
    title: props.stat.totalOperation.toString(),
    text: 'Calcul total',
    img: 'lightning-symbol.svg',
  },
  {
    title: props.stat.meanAccuracy.toFixed(2) + ' %',
    text: 'Précision',
    img: 'bullseye-symbol.svg',
  },
  {
    title: props.stat.meanTime.toFixed(2) + ' sec',
    text: 'Temps de réponse moyen',
    img: 'time-symbol.svg',
  },
  {
    title: props.stat.streak.toString(),
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
  text-align: center;
}

p {
  margin-top: 0rem;
  text-align: center;
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

@media (max-width: 1182px) {
  .card-info-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
