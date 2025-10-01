<template>
  <div>

    <form @submit.prevent="sendTodo"> 

    <input v-model="todo"> </input>

    <button type="submit">Submit</button>

    </form>

  </div>
</template>

<script setup>

const emit = defineEmits(["sendTodo"]);

const todo = ref("");

const sendTodo = () => {
  emit("sendTodo", todo.value);
};

</script>