<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMoon, faCalculator } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faMoon);
library.add(faCalculator)
</script>

<template>
  <div id="headerTemplate">
    <div id="logo">
      <font-awesome-icon :icon="['fas', 'calculator']" size="lg" />
    </div>

    <h1>JeMultiplie</h1>



    <button><font-awesome-icon :icon="['fas', 'moon']" /></button>

  </div>


</template>

<style scoped>
h1 {
  display: inline;

  font-size: 1.4rem;
  font-weight: normal;

  text-align: center;
  vertical-align: middle;
}


#headerTemplate {
  display: flex;
  flex-direction: row;

  align-items: center;
  gap: 0.5rem;

  padding: 0rem 1rem;

  background-color: white;

}

#logo {
  display: flex;
  justify-content: center;
}

#logo {
  color: rgb(146, 90, 197);
}


button {
  justify-self: end;

  margin-left: auto;
  width: 2.5rem;
  height: 2.5rem;

  border-radius: 50%;

  background-color: white;

  border: 0.05rem solid lightgrey;
}

button:hover {
  border: 0.1rem solid rgb(146, 90, 197);
}
</style>
