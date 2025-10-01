<template>
  <div>
    <ul v-if="items.length > 0">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>

    <p v-else>Es sind noch keine Todos erfasst 🥺</p>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>
