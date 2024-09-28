<template>
  <app-header />
  <div class="container" style="width: 80%; margin: auto">
    <router-view></router-view>
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
