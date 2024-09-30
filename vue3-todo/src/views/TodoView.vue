<template>
  <div class="row">
    <h1>Vue 3 Todo List</h1>
  </div>

  <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="errorMessage">
    <i class="fa-solid fa-triangle-exclamation"></i>
    {{ errorMessage }}
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
      @click="clearErrorMessage"
    ></button>
  </div>

  <div class="row">
    <div class="col">
      <div class="input-group mb-3">
        <input
          class="form-control"
          type="text"
          v-model="newTodo"
          @keyup.enter="addTodo"
          placeholder="Add a new task"
        />
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <ul class="list-group" v-if="todoStore.todos">
        <li class="list-group-item" v-for="(todo, index) in todoStore.todos" :key="index">
          <div class="d-flex justify-content-between">
            <span :class="{ done: todo.status === 'Completed' }" @click="handleSpanClick(todo)">
              {{ todo.todo }}
            </span>
            <button type="button" class="btn btn-danger btn-sm ps-2" @click="deleteTodo(todo.id)">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useTodoStore from '../stores/todoStore'

const newTodo = ref('')
const todoStore = useTodoStore()
const errorMessage = ref('')

let isComplete = false

onMounted(async () => {
  await todoStore.fetchTodos()
  // todos.value.push(...todoStore.todos)
})

const addTodo = () => {
  todoStore.addTodo(newTodo.value)
  newTodo.value = ''
}

const toggleTodo = (todo, is_complete) => {
  console.log('toggle')
  todoStore.toggleTodoCompletion(todo.id, is_complete)
}

const deleteTodo = async (id) => {
  try {
    await todoStore.deleteTodo(id)
  } catch (error) {
    errorMessage.value = error.response.data.error
  }
}

const clearErrorMessage = () => {
  errorMessage.value = ''
}

const handleSpanClick = (todo) => {
  toggleTodo(todo, !isComplete)
  isComplete = !isComplete
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
