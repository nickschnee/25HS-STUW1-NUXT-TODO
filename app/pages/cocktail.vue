<script setup>
const {
  data: cocktail,
  loading,
  error,
  refresh,
} = useFetchJson("https://www.thecocktaildb.com/api/json/v1/1/random.php");
</script>

<template>
  <button @click="refresh" :disabled="loading">New Cocktail</button>
  <p v-if="loading">Loading…</p>
  <p v-else-if="error">Error: {{ error.message }}</p>
  <pre v-else>{{ cocktail?.drinks?.[0]?.strDrink }}</pre>
</template>
