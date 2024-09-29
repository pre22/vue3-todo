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
            // console.log(response.data.message)
            this.todos = response.data.message;
            localStorage.setItem('todo', JSON.stringify(response.data.message));
        },

        async addTodo(todoText) {
            const authStore = useUserStore()

            await axios.post(
                '/add-todos/',
                { todo: todoText },
                {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    }
                }
            );
            await this.fetchTodos();
        },

        async deleteTodo(id) {
            const authStore = useUserStore();

            await axios.delete(`/delete-todo/${id}/`, {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                }
            }),
            await this.fetchTodos();
        },

        async toggleTodoCompletion(id, isComplete) {
            const authStore = useUserStore()

            const response = await axios.patch(
                `/update-todos/${id}/${!isComplete}/`,
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
        },

        loadTodos() {
            console.log('getting called')
            const storedTodos = localStorage.getItem('todo');
            
            if (storedTodos) {
              this.todos = JSON.parse(storedTodos);
            }
        },
    }
})