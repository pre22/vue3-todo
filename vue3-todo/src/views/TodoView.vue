<template>
  <div class="row">
    <h1>Vue 3 Todo List</h1>
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
      <ul class="list-group">
        <li class="list-group-item" v-for="(todo, index) in todos" :key="index">
          <div class="d-flex justify-content-between">
            <span :class="{ done: todo.is_complete }" @change="toggleTodo(todo)">
              {{ todo.text }}
            </span>
            <button type="button" class="btn btn-danger btn-sm ps-2" @click="deleteTodo(index)">
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

onMounted(() => {
  todoStore.fetchTodos()
})

const addTodo = () => {
  todoStore.addTodo(newTodo.value)
  newTodo.value = ''
}

const toggleTodo = (todo) => {
  todoStore.toggleTodoCompletion(todo.id, todo.is_complete)
}

const deleteTodo = (id) => {
  todoStore.deleteTodo(id)
}
</script>
