<template>
  <div>
    <h1>Page Content</h1>

    <TodoForm @sendTodo="addTodo" />

    <p :class="{ blue: countTodos > 0 }">
      Du hast momentan {{ countTodos }} Todo
      <span v-if="countTodos !== 1">s</span>
    </p>

    <TodoList :items="todos" />
  </div>
</template>

<script setup>
const todos = reactive([]);

const addTodo = (todo) => {
  todos.push(todo);
  console.log("todos:", todos);
};

const countTodos = computed(() => {
  return todos.length;
});
</script>

<style>
.blue {
  color: blue;
}
</style>
