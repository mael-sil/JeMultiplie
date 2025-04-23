<script setup lang="ts">
import type { Operation } from '@/models/operation';
import { ref } from 'vue';


const numInput = ref('');

const resultatJuste = ref(false);

const resultatFaux = ref(false);

const moyenne = ref();

const presicion = ref();


const operation = ref<Operation>({ a: 0, b: 0, result: 0 });

function sendResponse() {
  fetch('http://localhost:3000/api/response',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        result: resultatJuste.value,
        time: compteur.value
      })
    })
}

function actualiseScore() {
  fetch('http://localhost:3000/api/score',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }
  )
    .then(function (response) {
      if (response.ok) { return response.json(); }
      else { throw ("Err " + response.status); }
    })
    .then(function (data) {
      console.log(data);

      moyenne.value = data.mean;
      presicion.value = data.accuracy;

    })
    .catch(function (error) {
      console.log(error);
    });

}

function verifResult() {
  console.log('test');



  if (parseInt(numInput.value) === operation.value.result) {
    resultatJuste.value = true;
  } else {
    resultatFaux.value = true;
  }



  setTimeout(() => {
    sendResponse();
    actualiseScore();

    resultatJuste.value = false;
    resultatFaux.value = false;




    compteur.value = 0;
    numInput.value = "";
    fetchOperation();
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
    numInput.value = numInput.value.slice(0, -1);
    return;
  }
  numInput.value = numInput.value + stringEvent;

  if (numInput.value.length === operation.value.result.toString().length) {
    verifResult();
  }
}

function fetchOperation() {
  fetch('http://localhost:3000/api/generate',
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }
  )
    .then(function (response) {
      if (response.ok) { return response.json(); }
      else { throw ("Err " + response.status); }
    })
    .then(function (data) {
      console.log(data);

      operation.value.a = data.a;
      operation.value.b = data.b;
      operation.value.result = data.result;

    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchOperation();

const compteur = ref(0);

const interval = setInterval(() => {
  compteur.value += 1;
}, 1000)


</script>

<template>
  <div id="question">
    <p id="temps">{{ compteur }} sec</p>
    <p id="operation">{{ operation.a }} &times; {{ operation.b }}</p>
    <input id="display" :value="numInput" disabled :class="{ juste: resultatJuste, faux: resultatFaux }">
    <p id="resultat">Moyenne: {{ parseFloat(moyenne).toFixed(2) }} sec , Précision:{{ parseFloat(presicion).toFixed(0)
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
