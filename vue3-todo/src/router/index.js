import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'
import TodoView from '@/views/TodoView.vue'
import HomeView from '@/views/HomeView.vue'
import useUserStore from '@/stores/users'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/todos',
    name: 'todo',
    component: TodoView,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home'}
  }
  
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next()
    return
  }
  const store = useUserStore()

  if (store.token) {
    next()
  } else {
    next({ name: 'home' })
  }
})

export default router
