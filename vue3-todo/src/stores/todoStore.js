import { defineStore } from "pinia";
import axios from "axios";
import useUserStore from "./users";

export default defineStore('todo', {
    state: () => ({
        todos: [],
    }),

    actions: {
        async fetchTodos() {
            const authStore = useUserStore();

            const response = await axios.get('/get-todos/', {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            });

            this.todos = response.data;
            
        },

        async addTodo(todoText) {
            const authStore = useUserStore()

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
            const authStore = useUserStore();

            await axios.delete(`/delete-todo/${id}/`, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                }
            }),
            this.todos = this.todos.filter((todo) => todo.id !== id);
        },

        async toggleTodoCompletion(id, isComplete) {
            const authStore = useUserStore()

            const response = await axios.patch(
                `/update-todo/${id}`,
                { is_complete: !isComplete },
                {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    }
                }
            )

            const updatedTodo = response.data;
            const index = this.todos.findIndex((todo) => todo.id === id);

            if (index !== -1) {
                this.todos[index].is_complete = updatedTodo.is_complete
            }
        }
    }
})