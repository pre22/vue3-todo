import { defineStore } from "pinia";
import axios from "axios";

export default defineStore("auth", {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),

    actions: {
        async login(email, password) {
            const response = await axios.post('/users/login/', { email, password });
            this.token = response.data.message.access_token;
            this.user = response.data.message.user;
            localStorage.setItem('token', this.token);
            return response;
           
        },

        async register(email, password) {
            const response = await axios.post('/users/register/', { email, password });
            return response;
           
        },

        async logout() {
            await axios.post('/users/logout/', null, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });

            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
           
        },

        getters: {
            isAuthenticated: (state) => !!state.token,
        }
    }
})
