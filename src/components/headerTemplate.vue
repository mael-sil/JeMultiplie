<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { onMounted, ref } from 'vue'
import DropMenu from './dropMenu.vue'

const themeStore = useThemeStore()

function changeTheme() {
  themeStore.toggleTheme()
}
onMounted(() => {
  // Initialiser le thème depuis le store
  themeStore.initTheme()
})

const isMenuOpen = ref(false)
</script>

<template>
  <div class="left">
    <div id="logo-wrapper">
      <font-awesome-icon :icon="['fas', 'calculator']" size="lg" id="logo" />
    </div>
    <h1>JeMultiplie</h1>
  </div>

  <div class="right">
    <button class="menu-button" @click="isMenuOpen = true">
      <font-awesome-icon :icon="['fas', 'bars']" />
    </button>
    <router-link to="/game" class="link-button"><button>Jouer</button></router-link>
    <router-link to="/stats" class="link-button"><button>Statistique</button></router-link>
    <button class="dark-mode-button" v-if="themeStore.isDarkMode" @click="changeTheme">
      <font-awesome-icon :icon="['fas', 'moon']" />
    </button>
    <button class="dark-mode-button" v-else @click="changeTheme">
      <font-awesome-icon :icon="['fas', 'sun']" />
    </button>
  </div>

  <DropMenu class="drop-menu" v-show="isMenuOpen" @closeMenu="isMenuOpen = false" />
</template>

<style scoped>
@import '@/assets/button.css';

.left,
.right,
.link-button-container {
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

@media (max-width: 800px) {
  .link-button {
    display: none;
  }
}

@media (min-width: 800px) {
  .menu-button,
  .drop-menu {
    display: none;
  }
}
</style>
