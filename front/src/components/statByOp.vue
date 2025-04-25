<template>


  <div v-for="n in 8">
    <p v-for="k in 9 - n">

      {{ n + 1 }} x {{ n + k }}
    </p>
  </div>

</template>
