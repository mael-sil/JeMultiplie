<script setup lang="ts">
import headerTemplate from '@/components/headerTemplate.vue';
import resultRowTemplate from '@/components/resultRowTemplate.vue';
import resultTopRow from '@/components/resultTopRow.vue';
import { getSave } from '@/composables/save';
import type { Result } from '@/models/result';
import { ref } from 'vue';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from 'vue-router';
import statByOp from '@/components/statByOp.vue';

const resultHistory = ref<Result[]>(getSave())

const router = useRouter();

library.add(faXmark);

function listenQuit() {
  router.push("/")
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
        <resultRowTemplate v-for="elt in [...resultHistory].reverse()" :result="elt" />
      </div>

      <div id="statByOp">
        <h2>Statistique des opérations</h2>
        <statByOp />
      </div>
    </div>

  </main>
</template>




<style>
#resultTab h2 {
  grid-column: span 5;
  text-align: center;
}

#statByOp h2 {
  grid-column: span 4;
  text-align: center;
}

#resultTab {
  display: grid;
  grid-template-columns: repeat(5, auto);

  align-items: stretch;
  justify-items: stretch;
}


#resultTab p,
#statByOp div {
  margin: 0;
  padding: 0.5rem 1rem;
  border-right: 0.12rem solid lightgrey;
  border-bottom: 0.12rem solid lightgrey;
  text-align: center;
}

#resultTab p:nth-child(5n+1),
#statByOp div:nth-child(4n+1) {
  border-right: none;
}

#resultTab p:nth-last-child(-n+5),
#statByOp div:nth-last-child(-n+4) {
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
