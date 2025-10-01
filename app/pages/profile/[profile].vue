<template>
  <h1>Hallo {{ profile }}</h1>

  <p>Du bist {{ filteredStudents[0].age }} Jahre alt</p>

  <p>{{ number }}</p>

  <button @click="increaseNumber">+</button>
</template>

<script setup>
const route = useRoute();

const profile = ref(route.params.profile);

const number = ref(0);

const increaseNumber = () => {
  if (number.value < 5) {
    number.value++;
  }
};

const students = reactive([
  { name: "nick", age: 29 },
  { name: "nina", age: 22 },
  { name: "joel", age: 21 },
]);

const filteredStudents = computed(() => {
  return students.filter((student) => student.name === profile.value);
});

console.log(filteredStudents.value[0].age);
</script>
