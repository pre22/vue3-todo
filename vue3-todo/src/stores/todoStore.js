import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./users";

export const useTodoStore =  defineStore('todo', {
    state: () => ({
        todos: [],
    }),

    actions: {
        async fetchTodos() {
            const authStore = useAuthStore();

            const response = await axios.get('/get-todos/', {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            });

            this.todos = response.data;
            
        },

        async addTodo(todoText) {
            const authStore = useAuthStore()

            const response = await axios.post(
                '/add-todo/',
                { text: todoText },
                {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    }
                }
            );

            this.todos.push(response.data);
        },

        async deleteTodo(id) {
            const authStore = useAuthStore();

            await axios.delete(`/delete-todo/${id}/`, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                }
            }),
            this.todos = this.todos.filter((todo) => todo.id !== id);
        }
    }
})