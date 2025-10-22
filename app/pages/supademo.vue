<script setup>
const newTask = ref("");
const editingId = ref(null);
const editingText = ref("");

const {
  todos,
  loading,
  error,
  fetchTodos,
  addTodo,
  toggleDone,
  updateText,
  removeTodo,
} = useTodos();

// const todoStuff = useTodos();
// Then you'd have to use: todoStuff.todos, todoStuff.addTodo(), etc.

onMounted(fetchTodos);

async function onAdd() {
  const task = newTask.value.trim();
  if (!task) return;
  await addTodo(task);
  newTask.value = "";
}

function startEdit(t) {
  editingId.value = t.id;
  editingText.value = t.task;
}

async function saveEdit(id) {
  const text = editingText.value.trim();
  if (!text) return;
  await updateText(id, text);
  editingId.value = null;
  editingText.value = "";
}
</script>

<template>
  <div class="max-w-xl mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-semibold">Supabase CRUD Demo (Nuxt 4)</h1>

    <form @submit.prevent="onAdd" class="flex gap-2">
      <input
        v-model="newTask"
        type="text"
        placeholder="New task…"
        class="flex-1 border rounded px-3 py-2"
      />
      <button class="border rounded px-4 py-2">Add</button>
    </form>

    <div v-if="loading">Loading…</div>
    <div v-else-if="error" class="text-red-600">Error: {{ error }}</div>

    <ul class="space-y-2" v-else>
      <li
        v-for="t in todos"
        :key="t.id"
        class="flex items-center gap-3 border rounded px-3 py-2"
      >
        <input
          type="checkbox"
          :checked="t.done"
          @change="toggleDone(t.id, !t.done)"
        />
        <div class="flex-1">
          <template v-if="editingId === t.id">
            <input
              v-model="editingText"
              class="w-full border rounded px-2 py-1"
            />
          </template>
          <template v-else>
            <div :class="t.done ? 'line-through text-gray-500' : ''">
              {{ t.task }}
            </div>
            <div class="text-xs text-gray-500">
              {{ new Date(t.created_at).toLocaleString() }}
            </div>
          </template>
        </div>
        <template v-if="editingId === t.id">
          <button class="text-sm" @click="saveEdit(t.id)">Save</button>
          <button class="text-sm" @click="editingId = null">Cancel</button>
        </template>
        <template v-else>
          <button class="text-sm" @click="startEdit(t)">Edit</button>
          <button class="text-sm text-red-600" @click="removeTodo(t.id)">
            Delete
          </button>
        </template>
      </li>
    </ul>
  </div>
</template>
