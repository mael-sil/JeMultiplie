<script setup lang="ts">
import { endSaveStorage, getOperation, reset, saveResult } from '@/composables/operationFunction'
import type { Operation } from '@/models/operation'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const input = ref('')

const isResultTrue = ref(false)
const isResultFalse = ref(false)

const mean = ref<number | null>(null)
const accuracy = ref<number | null>(null)

const operation = ref<Operation>(getOperation(2, 9))

const order = ref<boolean>(!!Math.round(Math.random()))

function verifResult() {
  console.log('test')

  if (parseInt(input.value) === operation.value.result) {
    isResultTrue.value = true
  } else {
    isResultFalse.value = true
  }

  setTimeout(() => {
    ;[mean.value, accuracy.value] = saveResult(operation.value, isResultTrue.value, compteur.value)

    isResultTrue.value = false
    isResultFalse.value = false

    compteur.value = 0
    input.value = ''
    operation.value = getOperation(2, 9)
    order.value = !!Math.round(Math.random())

    console.log(order.value)
  }, 200)
}

function listenNumPad(event: Event): void {
  const target = event.target as HTMLElement

  if (target.tagName.toLowerCase() !== 'button') {
    return
  }

  const stringEvent = target.textContent ?? ''

  if (stringEvent === '←') {
    input.value = input.value.slice(0, -1)
    return
  }
  input.value = input.value + stringEvent

  if (input.value.length === operation.value.result.toString().length) {
    console.log('testNumPad')
    verifResult()
  }

  console.log('listenNumPad')
}

function listenKeyboard(event: KeyboardEvent) {
  const key = event.key

  if (key >= '0' && key <= '9') {
    input.value += key

    if (input.value.length === operation.value.result.toString().length) {
      console.log('testKeyboard')
      verifResult()
    }
  } else if (key === 'Backspace') {
    input.value = input.value.slice(0, -1)
  }

  console.log('listenKeyboard')
}

onMounted(() => {
  window.addEventListener('keydown', listenKeyboard)
})

onUnmounted(() => {
  window.removeEventListener('keydown', listenKeyboard)
})

const compteur = ref(0)

const interval = setInterval(() => {
  compteur.value += 1
}, 1000)

function listenReset(): void {
  mean.value = null
  accuracy.value = null
  compteur.value = 0

  reset()
  operation.value = getOperation(2, 9)
}

const router = useRouter()

function listenStop(): void {
  clearInterval(interval)
  endSaveStorage()
  reset()

  mean.value = null
  accuracy.value = null
  compteur.value = 0

  console.log('test stop')
  router.push('/')
}
</script>

<template>
  <div id="question">
    <div id="topPart">
      <button @click="listenReset">reset</button>
      <p id="temps">{{ compteur }} sec</p>
      <button @click="listenStop">stop</button>
    </div>

    <p id="operation" v-if="order">{{ operation.a }} &times; {{ operation.b }}</p>
    <p id="operation" v-else>{{ operation.b }} &times; {{ operation.a }}</p>
    <input
      id="display"
      :value="input"
      disabled
      :class="{ juste: isResultTrue, faux: isResultFalse }"
    />
    <p id="resultat" :style="{ visibility: mean === null ? 'hidden' : 'visible' }">
      Moyenne: {{ mean !== null ? mean.toFixed(2) : '' }} sec , Précision:{{
        accuracy !== null ? accuracy.toFixed(0) : ''
      }}%
    </p>
    <div id="numPad" @click="listenNumPad">
      <button type="button">7</button>
      <button type="button">8</button>
      <button type="button">9</button>

      <button type="button">4</button>
      <button type="button">5</button>
      <button type="button">6</button>

      <button type="button">1</button>
      <button type="button">2</button>
      <button type="button">3</button>

      <button type="button">0</button>
      <button type="button">&larr;</button>
    </div>
  </div>
</template>

<style scoped>
#question {
  gap: 0.5rem;
  font-size: 3rem;
}

#temps,
#resultat,
#topPart button {
  margin: 0;
  font-size: 1rem;
  color: darkgrey;
}

#topPart button {
  padding: 0rem 1rem;
}

#topPart {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;

  width: 100%;
}

#topPart button:first-child {
  justify-self: start;
}

#topPart button:last-child {
  justify-self: end;
}

#numPad {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem 0.5rem;
}

.juste {
  color: green !important;
}

.faux {
  color: red !important;
}

button:nth-last-child(2) {
  grid-column: span 2;
}

#operation {
  margin-top: 4rem;
  margin-bottom: 0rem;
  font-size: 3rem;
}

#display {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 4rem;
  width: 10rem;
  border: none;
  color: rgb(108, 19, 190);
}
</style>
