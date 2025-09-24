<script setup lang="ts">
import type { CardInfoContent } from '../model/CardInfoContent'

const props = defineProps<{
  content: CardInfoContent
  color?: string
}>()
</script>
<template>
  <div class="card card-info">
    <img :src="props.content.img" />
    <h3>{{ props.content.title }}</h3>
    <p>{{ props.content.text }}</p>
  </div>
</template>
<style lang="css">
.card-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 2rem 1rem;
}

.card-info img {
  width: 40px;
  height: 40px;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.5);
}

.card-info h3 {
  margin-bottom: 0;
}

.card-info p {
  margin-bottom: 0;
}
</style>
