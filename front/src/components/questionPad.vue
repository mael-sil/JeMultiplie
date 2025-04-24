<script setup lang="ts">
import { getOperation, saveResult } from '@/composables/operationFunction';
import type { Operation } from '@/models/operation';
import { ref } from 'vue';


const input = ref('');

const isResultTrue = ref(false);
const isResultFalse = ref(false);

const mean = ref();
const accuracy = ref();

const operation = ref<Operation>(getOperation(2, 9));

const order = ref<boolean>(!!Math.round(Math.random()))





function verifResult() {
  console.log('test');

  if (parseInt(input.value) === operation.value.result) {
    isResultTrue.value = true;
  } else {
    isResultFalse.value = true;
  }

  setTimeout(() => {
    [mean.value, accuracy.value] = saveResult(operation.value, isResultTrue.value, compteur.value);


    isResultTrue.value = false;
    isResultFalse.value = false;

    compteur.value = 0;
    input.value = "";
    operation.value = getOperation(2, 9);
    order.value = !!Math.round(Math.random());

    console.log(order.value);
  }, 200)
}

function listenNumPad(event: Event): void {

  const target = event.target as HTMLElement;

  if (target.tagName.toLowerCase() !== "button") {
    return;
  }

  const stringEvent = target.textContent ?? '';


  if (stringEvent === "←") {
    console.log('test')
    input.value = input.value.slice(0, -1);
    return;
  }
  input.value = input.value + stringEvent;

  if (input.value.length === operation.value.result.toString().length) {
    verifResult();
  }
}



const compteur = ref(0);

const interval = setInterval(() => {
  compteur.value += 1;
}, 1000)


</script>

<template>
  <div id="question">
    <p id="temps">{{ compteur }} sec</p>
    <p id="operation" v-if="order">{{ operation.a }} &times; {{ operation.b }}</p>
    <p id="operation" v-else>{{ operation.b }} &times; {{ operation.a }}</p>
    <input id="display" :value="input" disabled :class="{ juste: isResultTrue, faux: isResultFalse }">
    <p id="resultat">Moyenne: {{ parseFloat(mean).toFixed(2) }} sec , Précision:{{ parseFloat(accuracy).toFixed(0)
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
#temps,
#resultat {
  margin: 0;
  font-size: 1rem;
  color: darkgrey;
}

#question {
  border-radius: 1rem;
  background-color: white;
  box-shadow: 0px 0px 10px lightgrey;
  padding: 1rem 2rem;
  margin: 1rem 2rem;


  font-size: 3rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  align-items: center;

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


button {
  text-align: center;
  background: white;

  border-radius: 1rem;
  border: 0.1rem solid lightgrey;

  padding: 0rem 3rem;

  font-size: 3rem;
}

button:hover {
  border: 0.1rem solid rgb(146, 90, 197);
}

#operation {
  margin-top: 4rem;
  margin-bottom: 0rem;
}




#display {
  font-size: 3rem;
  text-align: center;

  margin-bottom: 4rem;


  width: 10rem;



  border: none;

  color: rgb(108, 19, 190);
  background-color: white;
}
</style>
