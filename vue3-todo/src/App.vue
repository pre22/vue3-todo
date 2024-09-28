<template>
  <div class="container">
    <div class="row ">
      <h1>Vue 3 Todo List</h1>
    </div>

    <div class="row ">
      <div class="col">

        <div class="input-group mb-3">
          <input class="form-control" type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new task">
        </div>
      </div>
    </div>

    <div class="row ">
      <div class="col">

        <ul class="list-group">
          <li class="list-group-item" v-for="(todo, index) in todos" :key="index">
            <div class="d-flex justify-content-between">
  
              <span :class="{ done: todo.completed }" @click="toggleCompletion(index)">
                {{ todo.text }}
              </span>
              <button type="button" class="btn btn-danger btn-sm ps-2" @click="deleteTodo(index)">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Step 4: Reactive State
const newTodo = ref('');
const todos = ref([
  { text: 'Learn Vue 3', completed: false },
  { text: 'Build a Todo List', completed: false },
]);


// Step 5: Adding the new Todo
const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    todos.value.push({ text: newTodo.value, completed: false })
    newTodo.value = ''; // Clear the input
  }
}

const deleteTodo = (index) => {
  todos.value.splice(index, 1)
}

// Step 7: Toggling completion status
const toggleCompletion = (index) => {
  todos.value[index].completed = !todos.value[index].completed;
}


</script>

<style scoped>
  .done {
    text-decoration: line-through;
  }

</style>