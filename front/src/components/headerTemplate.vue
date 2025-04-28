<script setup lang="ts">
import { idText } from "typescript";
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
