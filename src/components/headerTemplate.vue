<script setup lang="ts">
import { ref } from "vue";

const whiteMode = ref(true);

const savedMode = localStorage.getItem("whiteMode");

if (savedMode) {
  whiteMode.value = (savedMode === "true");
}

function listenWhite() {
  whiteMode.value = false
  document.body.classList.add('dark')

  localStorage.setItem("whiteMode", "false")
}

function listenDark() {
  whiteMode.value = true
  document.body.classList.remove('dark')
  localStorage.setItem("whiteMode", "true")
}

</script>

<template>

  <div id="logo-wrapper">
    <font-awesome-icon :icon="['fas', 'calculator']" size="lg" id="logo" />
  </div>

  <h1>JeMultiplie</h1>



  <button v-if="whiteMode" @click="listenWhite"><font-awesome-icon :icon="['fas', 'moon']" /></button>
  <button v-else @click="listenDark"><font-awesome-icon :icon="['fas', 'sun']" /></button>




</template>

<style scoped>
#logo-wrapper {
  display: flex;
  justify-content: center;
}

#logo {
  width: 26px;
  height: 26px;
}


button {
  justify-self: end;

  margin-left: auto;
  width: 2.5rem;
  height: 2.5rem;

  border-radius: 50%;
}
</style>
