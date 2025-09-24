<template>
  <button><slot></slot></button>
</template>

<style lang="css" scoped>
button {
  font-size: 1.2rem;
  padding: 0.5rem 2rem;
  border-radius: 40px;
  background: rgb(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 0.1rem solid rgba(255, 255, 255, 0.5);
}

.dark button {
  color: white;
}

@media (max-width: 860px) {
  button {
    font-size: 1rem;
  }
}
</style>
