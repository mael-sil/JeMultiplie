<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { onMounted } from 'vue'

const themeStore = useThemeStore()

function changeTheme() {
  themeStore.toggleTheme()
}
onMounted(() => {
  // Initialiser le thème depuis le store
  themeStore.initTheme()
})
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
    <button class="dark-mode-button" v-if="themeStore.isDarkMode" @click="changeTheme">
      <font-awesome-icon :icon="['fas', 'moon']" />
    </button>
    <button class="dark-mode-button" v-else @click="changeTheme">
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
