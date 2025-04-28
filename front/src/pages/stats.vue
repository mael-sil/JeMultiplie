<script setup lang="ts">
import headerTemplate from '@/components/headerTemplate.vue';
import resultRowTemplate from '@/components/resultRowTemplate.vue';
import resultTopRow from '@/components/resultTopRow.vue';
import { getSave } from '@/composables/save';
import type { Result } from '@/models/result';
import { computed, ref } from 'vue';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from 'vue-router';
import statByOp from '@/components/statByOp.vue';
import { dateFormating } from '@/composables/date';

const resultHistory = ref<Result[]>(getSave())

const router = useRouter();

library.add(faXmark);

function listenQuit() {
  router.push("/")
}

const selected = ref(resultHistory.value[0]);

const dateSelected = computed(() => {
  if (!selected.value) return '';
  return dateFormating(new Date(selected.value.date));
});

function listenSelected(result: Result) {
  selected.value = result;
}

</script>
<template>

  <header>
    <headerTemplate />
  </header>
  <main>
    <div id="stat">
      <div title="Fermer" @click="listenQuit" id="cross">
        <font-awesome-icon :icon="['fas', 'xmark']" size="lg" />
      </div>

      <div id="resultTab">
        <h2>Historique</h2>
        <resultTopRow />
        <resultRowTemplate v-for="elt in [...resultHistory].reverse()" :result="elt" :selected="elt === selected"
          @is-selected="listenSelected" />
      </div>

      <div id="statByOp">
        <h2>Temps moyen par operations</h2>
        <h3>Pour la session du {{ dateSelected }}</h3>
        <statByOp :result="selected" />
      </div>

    </div>

  </main>
</template>




<style>
#resultTab h2 {
  grid-column: span 5;
  text-align: center;
}

#statByOp h2,
#statByOp h3 {
  grid-column: span 4;
  text-align: center;
}

#resultTab {
  display: flex;
  flex-direction: column;

  align-items: stretch;
  justify-items: stretch;
}


#resultTab p,
#statByOp>div {
  margin: 0;
  padding: 0.5rem 1rem;

  text-align: center;
}

#statByOp>div {
  border-right: 0.12rem solid lightgrey;
}

#resultTab div,
#statByOp>div {
  border-bottom: 0.12rem solid lightgrey;
}

#resultTab p:nth-child(5n),
#statByOp>div:nth-child(4n+2) {
  border-right: none;
}


#statByOp>div:nth-last-child(-n+4),
#resultTab div:last-child {
  border-bottom: none;
}

#cross {
  align-self: end;
  margin-bottom: 1rem;
}

#statByOp {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  align-items: stretch;
  justify-items: stretch;
}
</style>
