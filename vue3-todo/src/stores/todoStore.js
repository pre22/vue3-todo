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
            
            await axios.post(`/delete-todo/${id}/`, {} ,  
                {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    }
                }
            );
            
            await this.fetchTodos();
        },

        async toggleTodoCompletion(id, isComplete) {
            const authStore = useUserStore()
            let _status;

            if (isComplete === true) {
                _status = "Completed"
            } else if (isComplete === false) {
                _status = "Not-Completed"
            }
            console.log(id, isComplete, _status)
            
            await axios.put(
                `/update-todos/${id}/${_status}/`, {} ,
                {
                    headers: {
                        Authorization: `Bearer ${authStore.token}`,
                    }
                }
            )
            await this.fetchTodos();
           
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