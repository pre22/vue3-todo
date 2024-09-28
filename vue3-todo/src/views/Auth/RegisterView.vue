<template>
  <div class="">
    <div>
      <h1 class="text-success">Create an Account</h1>
    </div>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          v-model="email"
          class="form-control"
          id="register-email"
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
        <button type="submit" class="btn btn-primary">Submit</button>
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

const authStore = useUserStore()
const router = useRouter()

const register = async () => {
  try {
    await authStore.register(email.value, password.value)
    router.push('/login')
  } catch (error) {
    console.log(error)
  }
}
</script>
