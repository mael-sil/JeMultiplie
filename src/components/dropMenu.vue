<template>
  <div class="burger-menu card">
    <div class="button-container">
      <router-link to="/game" class="link-button"><button>Jouer</button></router-link>
      <router-link to="/stats" class="link-button"><button>Statistique</button></router-link>
    </div>
    <font-awesome-icon @click="$emit('closeMenu')" class="icon" :icon="['fas', 'xmark']" />
  </div>
</template>
<style lang="css" scoped>
@import '@/assets/button.css';

.burger-menu {
  position: absolute;
  top: 0px;
  right: 52px;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: row;
}

.icon {
  position: relative;
  top: -6px;
  left: 6px;
  width: fit-content;
}
</style>
