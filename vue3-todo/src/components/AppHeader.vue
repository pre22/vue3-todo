<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand h4 text-primary" href="#">Todo App</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/login" v-if="!authStore.isAuthenticated"
              >Login</router-link
            >
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/register" v-if="!authStore.isAuthenticated"
              >Register</router-link
            >
          </li>

          <li class="nav-item" v-if="authStore.isAuthenticated">
            <router-link class="nav-link" to="/todos">My Todos</router-link>
          </li>

          <li class="nav-item" v-if="authStore.isAuthenticated">
            <button @click="logout" class="btn btn-primary">
              <router-link to="/logout" class="text-white">Logout</router-link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import useUserStore from '../stores/users'

const authStore = useUserStore()

const logout = () => {
  authStore.logout()
}
</script>

<style lang="scss" scoped></style>
