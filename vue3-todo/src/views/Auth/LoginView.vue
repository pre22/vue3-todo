<template>
  <div class="">
    <div>
      <h1 class="text-success">Login your Account</h1>
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

    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          v-model="email"
          class="form-control"
          id="login-email"
          aria-describedby="emailHelp"
          placeholder="example@example.com"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          id="login-password"
          placeholder="************"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>

      <div class="row">
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useUserStore from '../../stores/users'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const authStore = useUserStore()
const router = useRouter()

const login = async () => {
  try {
    await authStore.login(email.value, password.value)
    router.push('/todos')
  } catch (error) {
    errorMessage.value = error.response.data.error
  }
}

const clearErrorMessage = () => {
  errorMessage.value = ''
}
</script>
