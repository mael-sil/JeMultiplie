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
  clearInterval(interval)
  let timeoutValue: number = 200

  if (parseInt(input.value) === operation.value.result) {
    isResultTrue.value = true
  } else {
    isResultFalse.value = true
    timeoutValue = 1200
  }

  console.log('temps: ', compteur.value)

  setTimeout(() => {
    ;[mean.value, accuracy.value] = saveResult(operation.value, isResultTrue.value, compteur.value)
    console.log('temps: ', compteur.value)
    console.log('mean: ', mean.value)

    isResultTrue.value = false
    isResultFalse.value = false

    compteur.value = 0
    input.value = ''
    operation.value = getOperation(2, 9)
    order.value = !!Math.round(Math.random())

    interval = setInterval(() => {
      compteur.value += 1
    }, 1000)

    console.log(order.value)
  }, timeoutValue)
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

let interval = setInterval(() => {
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
  <div id="question" class="card">
    <div id="topPart">
      <button @click="listenReset">reset</button>
      <p id="temps">{{ compteur }} sec</p>
      <button @click="listenStop">stop</button>
    </div>

    <p id="operation" v-if="order">{{ operation.a }} &times; {{ operation.b }}</p>
    <p id="operation" v-else>{{ operation.b }} &times; {{ operation.a }}</p>
    <div id="display">
      <input :value="input" disabled :class="{ juste: isResultTrue, faux: isResultFalse }" />
      <p id="correct-answer" :class="{ hide: !isResultFalse }">
        {{ operation.result }}
      </p>
    </div>
    <p id="resultat" :style="{ visibility: mean === null ? 'hidden' : 'visible' }">
      Moyenne: {{ mean !== null ? mean.toFixed(2) : '' }} sec , Précision:{{
        accuracy !== null ? accuracy.toFixed(0) : ''
      }}%
    </p>
    <div id="numPad" @click="listenNumPad">
      <button v-for="value in 9" type="button">{{ 10 - value }}</button>
      <button type="button">&larr;</button>
      <button>0</button>
    </div>
  </div>
</template>

<style scoped>
#question {
  gap: 0.5rem;
  font-size: 3rem;
}

#temps,
#resultat {
  margin: 0;
  font-size: 1rem;
}

#topPart button {
  padding: 0rem 1rem;
  font-size: 1rem;
}

.dark #topPart button {
  color: white;
}

#topPart {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
}

#numPad {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.5rem 0.5rem;
  direction: rtl;
}

button {
  text-align: center;
  border-radius: 1rem;
  border: 0.14rem solid rgba(255, 255, 255, 0.5);
  padding: 0rem 3rem;
  font-size: 3rem;
  background-color: rgba(255, 255, 255, 0.1);
}

.dark #numPad button {
  color: white;
}

.juste {
  color: green !important;
}

.faux {
  color: red !important;
  text-decoration: line-through;
}

#numPad button:last-child {
  grid-column: span 2;
}

#operation {
  margin-top: 4rem;
  margin-bottom: 0rem;
  font-size: 3rem;
}

#display {
  text-align: center;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: row;
}

input,
#correct-answer {
  background: none;
  border: none;
  font-size: 3rem;
  color: var(--text-accent-one);
  width: 5rem;
  text-align: center;
  margin: 0;
}

#correct-answer {
  color: green;
}

.hide {
  display: none;
}
</style>
