<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMoon, faCalculator, faSun } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ref } from "vue";

library.add(faMoon);
library.add(faCalculator)
library.add(faSun)

const whiteMode = ref(true);

function listenWhite() {
  whiteMode.value = false
  document.body.classList.add('dark')

}

function listenDark() {
  whiteMode.value = true
  document.body.classList.remove('dark')
}

</script>

<template>

  <div id="logo">
    <font-awesome-icon :icon="['fas', 'calculator']" size="lg" />
  </div>

  <h1>JeMultiplie</h1>



  <button v-if="whiteMode" @click="listenWhite"><font-awesome-icon :icon="['fas', 'moon']" /></button>
  <button v-else @click="listenDark"><font-awesome-icon :icon="['fas', 'sun']" /></button>




</template>

<style scoped>
#logo {
  display: flex;
  justify-content: center;
  color: rgb(146, 90, 197);
}


button {
  justify-self: end;

  margin-left: auto;
  width: 2.5rem;
  height: 2.5rem;

  border-radius: 50%;
  border: 0.05rem solid lightgrey;
}
</style>
