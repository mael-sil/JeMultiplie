<script setup lang="ts">
import { ref } from 'vue';


const numInput = ref('');

function listenNumPad(event: Event): void {

  const target = event.target as HTMLElement;

  if (target.tagName.toLowerCase() !== "button") {
    return;
  }

  const stringEvent = target.textContent ?? '';

  console.log(stringEvent)

  if (stringEvent === "←") {
    console.log('test')
    numInput.value = numInput.value.slice(0, -1);
    return;
  }





  numInput.value = numInput.value + stringEvent;


}

</script>

<template>
  <div id="question">
    <p id="temps">12 sec</p>
    <p id="operation">2 &times; 5</p>
    <input id="display" :value="numInput" disabled>
    <p id="resultat">MOY: 12 sec , Précision:80%</p>
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
