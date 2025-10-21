export function useTodos() {
  const todos = useState("todos", () => []);
  const loading = ref(false);
  const error = ref(null);

  async function fetchTodos() {
    loading.value = true;
    error.value = null;
    try {
      todos.value = await $fetch("/api/todos");
    } catch (e) {
      error.value = e?.data?.message || e.message;
    } finally {
      loading.value = false;
    }
  }

  async function addTodo(task) {
    const created = await $fetch("/api/todos", {
      method: "POST",
      body: { task },
    });
    todos.value.unshift(created);
    return created;
  }

  async function toggleDone(id, done) {
    const updated = await $fetch(`/api/todos/${id}`, {
      method: "PATCH",
      body: { done },
    });
    const i = todos.value.findIndex((t) => t.id === id);
    if (i !== -1) todos.value[i] = updated;
    return updated;
  }

  async function updateText(id, task) {
    const updated = await $fetch(`/api/todos/${id}`, {
      method: "PATCH",
      body: { task },
    });
    const i = todos.value.findIndex((t) => t.id === id);
    if (i !== -1) todos.value[i] = updated;
    return updated;
  }

  async function removeTodo(id) {
    await $fetch(`/api/todos/${id}`, { method: "DELETE" });
    const i = todos.value.findIndex((t) => t.id === id);
    if (i !== -1) todos.value.splice(i, 1);
  }

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    toggleDone,
    updateText,
    removeTodo,
  };
}
