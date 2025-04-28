<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  time: number;
}

const { time } = defineProps<Props>();

const width = computed(() => {
  const w = (100 * time) / 15;
  return w > 100 ? 100 : w;
});

const color = computed(() => {
  if (time < 5) return 'limegreen'; // rapide
  if (time < 10) return 'dodgerblue'; // moyen
  return 'orangered'; // lent
});
</script>


<template>
  <div v-if="width > 0" class="progress progress-blue">
    <span :style="{ width: width + '%', backgroundColor: color }"></span>
  </div>
  <span v-else> </span>
  

</template>


<style scoped>
.progress {
  width: 6rem;
  height: 1rem;
  border-radius: 1rem;
  padding: 0;
  border: 1px solid lightgray;
  overflow: hidden;
  position: relative;
}

.progress span {
  height: 100%;
  display: block;
  color: rgb(255, 251, 251);
  line-height: 30px;
  position: absolute;
  text-align: end;
  padding-right: 5px;
}


.progress-blue span {
  background-color: blue;
}

span {
  width: 6rem;
}
</style>
