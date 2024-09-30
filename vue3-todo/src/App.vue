<template>
  <app-header />
  <div class="container" style="width: 80%; margin: auto">
    <router-view></router-view>
  </div>
</template>

<script setup>
// import { onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
// import useUserStore from './stores/users'

// const authStore = useUserStore()
// const router = useRouter()

// onMounted(() => {
//   console.log(authStore.token)
//   const token = localStorage.getItem('token')

//   if (!token) {
//     router.push('/login')
//   }
// })
</script>
