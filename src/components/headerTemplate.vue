<script setup lang="ts">
import { ref } from 'vue'

const whiteMode = ref(false)
document.body.classList.add('dark')

const savedMode = localStorage.getItem('whiteMode')

if (savedMode) {
  whiteMode.value = savedMode === 'true'
  if (whiteMode.value == false) {
    document.body.classList.add('dark')
  }
}

function listenWhite() {
  whiteMode.value = false
  document.body.classList.add('dark')

  localStorage.setItem('whiteMode', 'false')
}

function listenDark() {
  whiteMode.value = true
  document.body.classList.remove('dark')
  localStorage.setItem('whiteMode', 'true')
}
</script>

<template>
  <div class="left">
    <div id="logo-wrapper">
      <font-awesome-icon :icon="['fas', 'calculator']" size="lg" id="logo" />
    </div>
    <h1>JeMultiplie</h1>
  </div>

  <div class="right">
    <router-link to="/game"><button>Jouer</button></router-link>
    <!-- Hide statistique page for now as it is not finished -->
    <router-link to="/stats" style="display: none"><button>Statistique</button></router-link>
    <button class="dark-mode-button" v-if="whiteMode" @click="listenWhite">
      <font-awesome-icon :icon="['fas', 'moon']" />
    </button>
    <button class="dark-mode-button" v-else @click="listenDark">
      <font-awesome-icon :icon="['fas', 'sun']" />
    </button>
  </div>
</template>

<style scoped>
.left,
.right {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
}

#logo-wrapper {
  display: flex;
  justify-content: center;
}

#logo {
  width: 26px;
  height: 26px;
}

button {
  background: rgb(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
  border: 0.14rem solid rgb(0, 0, 0, 0);
  border-radius: 40px;
  padding: 0.5rem 1rem;
}

.dark button {
  color: white;
  background: rgb(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.dark-mode-button {
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border-radius: 50%;
}

button:hover {
  border: 0.1rem solid #1a1a2e !important;
}

.dark button:hover {
  border-color: #f3c4d8 !important;
}
</style>
