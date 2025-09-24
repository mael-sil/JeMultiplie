<script setup lang="ts">
import { ref } from 'vue'
import buttonMain from '@/components/basic/buttonMain.vue'
import CardInfo from './basic/cardInfo.vue'
import type { CardInfoContent } from './model/CardInfoContent'

const number1 = ref<number>(Math.floor(Math.random() * 7 + 2))
const number2 = ref<number>(Math.floor(Math.random() * 7 + 2))
const result = ref<number>(number1.value * number2.value)

setInterval(() => {
  number1.value = Math.floor(Math.random() * 7 + 2)
  number2.value = Math.floor(Math.random() * 7 + 2)
  result.value = number1.value * number2.value
}, 1000)

const cardInfoContentTab: CardInfoContent[] = [
  {
    title: 'Entraînement Intelligent',
    text: 'Système de révision des difficulté',
    img: 'bullseye-symbol.svg',
  },
  {
    title: 'Statistique détaillé',
    text: 'Analysez votre progression',
    img: 'chart-symbol.svg',
  },
]
</script>

<template>
  <div class="hero-container">
    <div class="left">
      <div class="card multiplication">
        <p>{{ number1 }}</p>
        <p class="operande">x</p>
        <p>{{ number2 }}</p>
        <p class="operande">=</p>
        <p>{{ result }}</p>
      </div>
      <div class="bottom">
        <CardInfo v-for="value in cardInfoContentTab" :content="value" />
      </div>
    </div>
    <div class="right">
      <h2 id="hero-title"><span>Devenez un</span><span>génie du calcul mental</span></h2>
      <p>
        Transformez votre cerveau en calculatrice ultra-rapide avec notre entraînement intélligent
      </p>
      <router-link to="/game">
        <buttonMain class="button-main">Lancez l'entrainement</buttonMain>
      </router-link>
    </div>
  </div>
</template>

<style lang="css" scoped>
.hero-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  padding: 0rem 4rem;
}

img {
  width: 40px;
  height: 40px;
}

.left .bottom {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.card-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}

.card-info img {
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.5);
}

.card-info h3 {
  margin-bottom: 0;
}

.card.multiplication {
  display: flex;
  margin-left: 0.5rem;
  flex-direction: row;
  gap: 1rem;
  font-size: 3rem;
  justify-content: center;
}

.card.multiplication .operande {
  color: var(--text-accent-one);
}

.right {
  text-align: center;
}

.right h2 {
  display: flex;
  flex-direction: column;
}

#hero-title :first-child {
  font-size: 3rem;
}

#hero-title :nth-child(2) {
  color: var(--text-accent-two);
}

.button-main {
  margin-top: 2rem;
}

@media (max-width: 860px) {
  .hero-container {
    display: flex;
    flex-direction: column-reverse;
  }

  .card.multiplication {
    display: none;
  }

  #hero-title :first-child {
    font-size: 2rem;
  }

  #hero-title :nth-child(2) {
    font-size: 1.5rem;
  }

  .right button {
    font-size: 1rem;
  }
}
</style>
